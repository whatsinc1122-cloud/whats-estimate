"use client";

import { useState } from "react";
import { EstimateResult, EstimateInput } from "@/lib/estimateData";

interface Props {
  result: EstimateResult;
  input: EstimateInput;
  customerName: string;
  storeName: string;
}

const fmt = (n: number) => n.toLocaleString("ja-JP");

export default function EstimateResultView({ result, input, customerName, storeName }: Props) {
  const { totalExTax, perTsubo, designFee, totalWithTax, breakdown, similarCases } = result;
  const [exporting, setExporting] = useState(false);

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      // Build items map: all breakdown items keyed by name
      const items: Record<string, number> = {};
      for (const item of breakdown) {
        items[item.name] = item.amount;
      }

      const tax = totalWithTax - totalExTax;

      const res = await fetch("/api/export-excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          storeName,
          tsubo: input.tsubo,
          items,
          totalExTax,
          tax,
          totalIncTax: totalWithTax,
          designFee,
        }),
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const today = new Date();
      const fileDate =
        today.getFullYear() +
        String(today.getMonth() + 1).padStart(2, "0") +
        String(today.getDate()).padStart(2, "0");
      const storeSafe = (storeName || "estimate").replace(/[\s/\\:*?"<>|]/g, "_");
      a.download = `見積書_${storeSafe}_${fileDate}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Excel出力に失敗しました。もう一度お試しください。");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-base font-medium opacity-90 mb-4">概算見積もり結果</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs opacity-75 mb-1">概算総額（税別）</p>
            <p className="text-2xl font-bold">¥{fmt(totalExTax)}</p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">坪単価</p>
            <p className="text-xl font-semibold">¥{fmt(perTsubo)}<span className="text-sm font-normal">/坪</span></p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">設計費目安</p>
            <p className="text-xl font-semibold">¥{fmt(designFee)}</p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">税込総額（10%）</p>
            <p className="text-xl font-semibold">¥{fmt(totalWithTax)}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-75 flex flex-wrap gap-3">
          <span>{input.tsubo}坪</span>
          <span>天井高 {input.ceilingHeight}m</span>
          <span>{input.condition}</span>
          <span>{input.area}</span>
          <span>空調: {input.ac}</span>
          <span>照明: {input.lighting}</span>
          <span>家具: {input.furniture}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">工事項目別内訳</h3>
          <p className="text-xs text-gray-500 mt-0.5">各項目の坪単価・構成比・実績データ幅を表示</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs">
                <th className="text-left px-4 py-2 font-medium">項目</th>
                <th className="text-right px-4 py-2 font-medium">金額</th>
                <th className="text-right px-4 py-2 font-medium">構成比</th>
                <th className="text-right px-4 py-2 font-medium">坪単価</th>
                <th className="text-right px-4 py-2 font-medium hidden sm:table-cell">実績幅</th>
              </tr>
            </thead>
            <tbody>
              {breakdown
                .filter((b) => b.amount > 0)
                .sort((a, b) => b.amount - a.amount)
                .map((item, i) => (
                  <tr key={item.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-2 text-gray-700 font-medium">{item.name}</td>
                    <td className="px-4 py-2 text-right text-gray-800">¥{fmt(item.amount)}</td>
                    <td className="px-4 py-2 text-right">
                      <span className="inline-flex items-center gap-1">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 hidden sm:block">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${Math.min(item.ratio * 2, 100)}%` }}
                          />
                        </div>
                        <span className="text-gray-600">{item.ratio}%</span>
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right text-gray-600">¥{fmt(item.perTsubo)}</td>
                    <td className="px-4 py-2 text-right text-gray-400 text-xs hidden sm:table-cell">
                      {item.dataRange}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-blue-50">
                <td className="px-4 py-3 font-bold text-gray-800">合計（税別）</td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">¥{fmt(totalExTax)}</td>
                <td className="px-4 py-3 text-right font-bold text-gray-700">100%</td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">¥{fmt(perTsubo)}</td>
                <td className="hidden sm:table-cell" />
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Excel Export Button */}
        <div className="px-6 pb-5 pt-3">
          <button
            onClick={handleExportExcel}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "#1D9E75" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
            {exporting ? "出力中..." : "見積書をExcelで出力"}
          </button>
        </div>
      </div>

      {/* Similar Cases */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-1">類似施工事例</h3>
        <p className="text-xs text-gray-500 mb-4">条件が近い事例トップ4（スコアが高いほど類似度が高い）</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {similarCases.map((c, i) => (
            <div key={c.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    #{i + 1} スコア {c.score}
                  </span>
                  <p className="text-sm font-medium text-gray-800 mt-1">{c.name}</p>
                </div>
                <span className="text-xs text-gray-400">{c.tsubo}坪</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-xs text-gray-400">総工事費</p>
                  <p className="text-sm font-semibold text-gray-800">¥{fmt(c.total)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">坪単価</p>
                  <p className="text-sm font-semibold text-gray-800">¥{fmt(c.perTsubo)}/坪</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-xs text-yellow-800 leading-relaxed">
          ※ この見積もりは過去の施工事例を参考にした概算です。実際の工事費用は現地調査・詳細設計により変動します。
          正確な見積もりは担当者にご相談ください。
        </p>
      </div>
    </div>
  );
}
