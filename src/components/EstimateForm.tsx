"use client";

import { useState } from "react";
import {
  EstimateInput,
  EstimateResult,
  WorkCondition,
  Area,
  AcType,
  LightType,
  FurnType,
  FloorType,
  calculateEstimate,
} from "@/lib/estimateData";
import PdfUploader from "./PdfUploader";
import EstimateResultView from "./EstimateResultView";

const DEFAULT_INPUT: EstimateInput = {
  tsubo: 20,
  ceilingHeight: 2.4,
  condition: "スケルトン",
  area: "東京都（郊外）",
  seats: 4,
  hasDemolition: false,
  floor: "フロアタイル",
  wallCeiling: "クロス",
  lighting: "標準",
  furniture: "標準",
  ac: "業務用マルチ",
  signage: false,
};

export default function EstimateForm() {
  const [input, setInput] = useState<EstimateInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [storeName, setStoreName] = useState("");

  const handleChange = (field: keyof EstimateInput, value: unknown) => {
    setInput((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const handleAnalysisComplete = (partial: Partial<EstimateInput>) => {
    setInput((prev) => ({ ...prev, ...partial }));
    setResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = calculateEstimate(input);
    setResult(r);
    setTimeout(() => {
      document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">内装工事 概算見積もり</h1>
        <p className="text-gray-500 text-sm">条件を入力すると、過去の施工事例から概算金額を算出します</p>
      </div>

      <PdfUploader onAnalysisComplete={handleAnalysisComplete} />

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">見積書情報</h2>

        {/* 顧客名・店舗名 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">顧客名</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="例：山田 太郎"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">店舗名</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="例：カフェ〇〇"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">基本情報</h2>

        {/* 坪数・天井高 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              坪数 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="5"
                max="200"
                step="0.5"
                value={input.tsubo}
                onChange={(e) => handleChange("tsubo", parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">坪</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">天井高</label>
            <div className="relative">
              <input
                type="number"
                min="2.0"
                max="5.0"
                step="0.1"
                value={input.ceilingHeight}
                onChange={(e) => handleChange("ceilingHeight", parseFloat(e.target.value) || 2.4)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">m</span>
            </div>
          </div>
        </div>

        {/* 工事条件 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">工事条件</label>
          <div className="grid grid-cols-3 gap-2">
            {(["スケルトン", "居抜き（大規模改修）", "居抜き（軽微改修）"] as WorkCondition[]).map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => handleChange("condition", cond)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  input.condition === cond
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* エリア */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">エリア</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["東京都（都心）", "東京都（郊外）", "神奈川・埼玉・千葉", "その他"] as Area[]).map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleChange("area", area)}
                className={`px-2 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  input.area === area
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* セット面数・解体 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">セット面数</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="30"
                value={input.seats}
                onChange={(e) => handleChange("seats", parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">面</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">解体工事</label>
            <div className="flex gap-2 mt-1">
              {[{ label: "あり", value: true }, { label: "なし", value: false }].map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleChange("hasDemolition", value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    input.hasDemolition === value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 pt-2">仕上げ・設備</h2>

        {/* 床仕上げ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">床仕上げ</label>
          <div className="flex gap-2">
            {(["フロアタイル", "磁器タイル", "その他"] as FloorType[]).map((floor) => (
              <button
                key={floor}
                type="button"
                onClick={() => handleChange("floor", floor)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  input.floor === floor
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        {/* 壁天井仕上げ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">壁・天井仕上げ</label>
          <select
            value={input.wallCeiling}
            onChange={(e) => handleChange("wallCeiling", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="クロス">クロス（壁紙）</option>
            <option value="塗装">塗装仕上げ</option>
            <option value="モルタル">モルタル・左官</option>
            <option value="木材">木材・板張り</option>
          </select>
        </div>

        {/* 照明・造作家具 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">照明</label>
            <div className="flex gap-2">
              {(["演出照明", "標準"] as LightType[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => handleChange("lighting", l)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    input.lighting === l
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">造作家具</label>
            <div className="flex gap-2">
              {(["多め", "標準", "少なめ"] as FurnType[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleChange("furniture", f)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    input.furniture === f
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 空調・看板 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">空調</label>
            <div className="flex flex-col gap-1">
              {(["業務用マルチ", "家庭用複数台", "既存流用"] as AcType[]).map((ac) => (
                <button
                  key={ac}
                  type="button"
                  onClick={() => handleChange("ac", ac)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    input.ac === ac
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {ac}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">看板工事</label>
            <div className="flex gap-2 mt-1">
              {[{ label: "あり", value: true }, { label: "なし", value: false }].map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleChange("signage", value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    input.signage === value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-2"
        >
          概算見積もりを計算する
        </button>
      </form>

      {result && (
        <div id="result-section">
          <EstimateResultView result={result} input={input} customerName={customerName} storeName={storeName} />
        </div>
      )}
    </div>
  );
}
