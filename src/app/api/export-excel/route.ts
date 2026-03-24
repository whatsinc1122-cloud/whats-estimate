import { NextRequest, NextResponse } from "next/server";
import AdmZip from "adm-zip";
import path from "path";
import { readFileSync } from "fs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://whatsinc1122-cloud.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * 数値セルの書き込み
 * self-closing: <c r="D12" s="55"/>          → <c r="D12" s="55"><v>1234</v></c>
 * with content: <c r="L33" s="42" t="e">...</c> → <c r="L33" s="42"><v>1234</v></c>
 */
function setNumber(xml: string, addr: string, value: number): string {
  const escaped = String(Math.round(value));
  // self-closing pattern
  const reSelfClose = new RegExp(`<c r="${addr}"([^>]*?)\\s*/>`);
  if (reSelfClose.test(xml)) {
    return xml.replace(reSelfClose, (_, attrs) => {
      // strip t="..." attribute (keep s="...")
      const clean = attrs.replace(/\s+t="[^"]*"/, "");
      return `<c r="${addr}"${clean}><v>${escaped}</v></c>`;
    });
  }
  // cell with any existing content
  const reWithContent = new RegExp(`<c r="${addr}"([^>]*)>.*?</c>`, "s");
  if (reWithContent.test(xml)) {
    return xml.replace(reWithContent, (_, attrs) => {
      const clean = attrs.replace(/\s+t="[^"]*"/, "");
      return `<c r="${addr}"${clean}><v>${escaped}</v></c>`;
    });
  }
  return xml;
}

/**
 * 文字列セルの書き込み（inline string に変換）
 * <c r="C7" s="34" t="s"><v>46</v></c> → <c r="C7" s="34" t="inlineStr"><is><t>VALUE</t></is></c>
 */
function setString(xml: string, addr: string, value: string): string {
  const escaped = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const re = new RegExp(`<c r="${addr}"([^>]*)>.*?</c>`, "s");
  if (re.test(xml)) {
    return xml.replace(re, (_, attrs) => {
      // keep s="..." but set t="inlineStr"
      const sMatch = attrs.match(/\s+s="(\d+)"/);
      const sAttr = sMatch ? ` s="${sMatch[1]}"` : "";
      return `<c r="${addr}"${sAttr} t="inlineStr"><is><t>${escaped}</t></is></c>`;
    });
  }
  return xml;
}

export async function POST(req: NextRequest) {
  const data = await req.json() as {
    customerName: string;
    storeName: string;
    tsubo: number;
    items: Record<string, number>;
    totalExTax: number;
    tax: number;
    totalIncTax: number;
    designFee: number;
  };

  // テンプレートをZIPとして読み込む（drawing・画像・スタイルはそのまま保持）
  const templatePath = path.join(process.cwd(), "public", "template.xlsx");
  const templateBuf = readFileSync(templatePath);
  const zip = new AdmZip(templateBuf);

  // sheet1.xml だけ書き換える
  let sheetXml = zip.readAsText("xl/worksheets/sheet1.xml");

  // ── 顧客情報 ──
  sheetXml = setString(sheetXml, "C7", data.customerName || "　");
  sheetXml = setString(sheetXml, "C8", `店舗名：${data.storeName || "　"}`);

  // ── 金額サマリ ──
  sheetXml = setNumber(sheetXml, "D12", data.totalIncTax ?? 0);
  sheetXml = setNumber(sheetXml, "D13", data.totalExTax  ?? 0);
  sheetXml = setNumber(sheetXml, "D14", data.tax         ?? 0);
  sheetXml = setNumber(sheetXml, "D20", data.tsubo       ?? 0);

  // ── 工事項目金額（L列）──
  const items = data.items || {};
  const ITEM_MAP: Record<string, string> = {
    "L6":  "仮設",   "L7":  "解体",
    "L10": "軽鉄",   "L11": "塗装",   "L12": "タイル", "L13": "内装",
    "L14": "ガラス", "L15": "建具",   "L16": "看板",   "L17": "木工",
    "L18": "床下地", "L19": "衛生器具","L20": "給排水", "L21": "空調",
    "L22": "給排気", "L23": "電気",   "L24": "照明",   "L25": "ガス",
    "L26": "家具",   "L27": "自火報", "L28": "雑工事", "L29": "諸経費",
  };
  for (const [cell, key] of Object.entries(ITEM_MAP)) {
    sheetXml = setNumber(sheetXml, cell, items[key] ?? 0);
  }
  sheetXml = setNumber(sheetXml, "L33", data.designFee ?? 0);

  // ZIPを更新して返す（他のエントリはすべて原本のまま）
  zip.updateFile("xl/worksheets/sheet1.xml", Buffer.from(sheetXml, "utf-8"));

  // calcChain.xml を削除（古い計算キャッシュが壊れることがあるため）
  try { zip.deleteFile("xl/calcChain.xml"); } catch { /* not present */ }

  const outputBuf = zip.toBuffer();

  const today = new Date();
  const fileDate =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");
  const storeSafe = (data.storeName || "estimate").replace(/[\s/\\:*?"<>|]/g, "_");
  const filename = `見積書_${storeSafe}_${fileDate}.xlsx`;

  return new NextResponse(outputBuf, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
