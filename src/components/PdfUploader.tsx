"use client";

import { useState, useRef, useCallback } from "react";
import { EstimateInput } from "@/lib/estimateData";

interface AnalysisResult {
  tsubo: number | null;
  ceilingHeight: number | null;
  area: string | null;
  seats: number | null;
  hasDemolition: boolean | null;
  confidence: Record<string, string>;
  notes: string;
}

interface PdfUploaderProps {
  onAnalysisComplete: (data: Partial<EstimateInput>) => void;
}

const FIELD_LABELS: Record<string, string> = {
  tsubo: "坪数",
  ceilingHeight: "天井高",
  area: "エリア",
  seats: "セット面数",
  hasDemolition: "解体工事",
};

export default function PdfUploader({ onAnalysisComplete }: PdfUploaderProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) {
      setError("PDFファイルのみアップロード可能です");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("ファイルサイズは10MB以下にしてください");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/analyze-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfBase64: base64 }),
      });

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.error || "解析に失敗しました");
      }

      const data: AnalysisResult = json.data;
      setAnalysisResult(data);

      // Build partial input
      const partial: Partial<EstimateInput> = {};
      if (data.tsubo !== null) partial.tsubo = data.tsubo;
      if (data.ceilingHeight !== null) partial.ceilingHeight = data.ceilingHeight;
      if (data.area !== null) partial.area = data.area as EstimateInput["area"];
      if (data.seats !== null) partial.seats = data.seats;
      if (data.hasDemolition !== null) partial.hasDemolition = data.hasDemolition;

      onAnalysisComplete(partial);
    } catch (err) {
      setError(err instanceof Error ? err.message : "解析中にエラーが発生しました");
    } finally {
      setIsAnalyzing(false);
    }
  }, [onAnalysisComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case "high": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  const getConfidenceLabel = (conf: string) => {
    switch (conf) {
      case "high": return "確認済";
      case "medium": return "推定";
      case "low": return "不確か";
      default: return "-";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        図面をアップロードして自動入力
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        平面図PDFをアップロードすると、坪数・天井高・エリアなどを自動で読み取ります
      </p>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
          ${isAnalyzing ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {isAnalyzing ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-600 font-medium">図面を読み取り中...</p>
            <p className="text-xs text-gray-400">AIが図面を解析しています。しばらくお待ちください。</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600 font-medium">PDFをドラッグ&amp;ドロップ</p>
            <p className="text-sm text-gray-400">またはクリックしてファイルを選択</p>
            <p className="text-xs text-gray-300 mt-1">PDF形式・最大10MB</p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Analysis result */}
      {analysisResult && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-semibold text-green-800 mb-3">読み取り結果</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.entries(FIELD_LABELS).map(([key, label]) => {
              const rawValue = analysisResult[key as keyof AnalysisResult];
              const conf = analysisResult.confidence?.[key];
              const isExtracted = rawValue !== null && rawValue !== undefined;

              let displayValue = "−";
              if (isExtracted) {
                if (key === "hasDemolition") displayValue = rawValue ? "あり" : "なし";
                else if (key === "ceilingHeight") displayValue = `${rawValue}m`;
                else if (key === "tsubo") displayValue = `${rawValue}坪`;
                else if (key === "seats") displayValue = `${rawValue}面`;
                else displayValue = String(rawValue);
              }

              return (
                <div key={key} className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {isExtracted ? (
                      <span className="text-green-500 text-base">✓</span>
                    ) : (
                      <span className="text-gray-300 text-base">○</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">{label}</span>
                    <p className={`text-sm font-medium ${isExtracted ? "text-gray-800" : "text-gray-400"}`}>
                      {isExtracted ? displayValue : "手入力してください"}
                    </p>
                    {isExtracted && conf && (
                      <span className={`text-xs ${getConfidenceColor(conf)}`}>
                        {getConfidenceLabel(conf)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {analysisResult.notes && (
            <p className="mt-3 text-xs text-gray-500 border-t border-green-200 pt-2">
              {analysisResult.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
