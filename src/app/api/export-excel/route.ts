import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";

// Maps app item names → L column row numbers (same as simple version)
const EXCEL_ROW_MAP: Record<string, number> = {
  仮設: 6,
  解体: 7,
  軽鉄: 8,
  木工: 9,
  造作: 10,
  内装: 11,
  タイル: 12,
  塗装: 13,
  左官: 14,
  建具: 15,
  ガラス: 16,
  床下地: 17,
  看板: 18,
  家具: 19,
  空調: 20,
  給排気: 21,
  電気: 22,
  照明: 23,
  衛生器具: 24,
  給排水: 25,
  ガス: 26,
  自火報: 27,
  雑工事: 28,
  諸経費: 29,
};

const EXCEL_ROW_LABELS: Record<number, string> = {
  6: "仮設工事",
  7: "解体工事",
  8: "軽鉄・ボード工事",
  9: "木工事",
  10: "造作工事",
  11: "内装工事（クロス等）",
  12: "タイル工事",
  13: "塗装工事",
  14: "左官工事",
  15: "建具工事",
  16: "ガラス工事",
  17: "床下地工事",
  18: "看板・サイン工事",
  19: "家具・什器工事",
  20: "空調設備工事",
  21: "給排気工事",
  22: "電気工事",
  23: "照明工事",
  24: "衛生器具工事",
  25: "給排水工事",
  26: "ガス工事",
  27: "自動火災報知設備",
  28: "雑工事",
  29: "諸経費",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    customerName,
    storeName,
    totalExTax,
    totalWithTax,
    taxAmount,
    designFee,
    tsubo,
    itemAmounts,
  }: {
    customerName: string;
    storeName: string;
    totalExTax: number;
    totalWithTax: number;
    taxAmount: number;
    designFee: number;
    tsubo: number;
    itemAmounts: Record<string, number>;
  } = body;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("御見積書表紙_改");

  // Helper to set a cell value
  const sc = (addr: string, val: string | number) => {
    sheet.getCell(addr).value = val;
  };

  // Header info
  sc("C7", customerName || "　");
  sc("C8", "店舗名：" + (storeName || "　"));

  // Summary amounts
  sc("D12", totalWithTax);
  sc("D13", totalExTax);
  sc("D14", taxAmount);
  sc("D20", tsubo);

  // Item breakdown rows (K = label, L = amount)
  for (const [rowStr, label] of Object.entries(EXCEL_ROW_LABELS)) {
    const row = parseInt(rowStr);
    sc("K" + row, label);
    const appKey = Object.entries(EXCEL_ROW_MAP).find(([, v]) => v === row)?.[0];
    const amount = appKey ? (itemAmounts[appKey] || 0) : 0;
    sc("L" + row, amount);
  }

  // Total formula and design fee
  sheet.getCell("L31").value = { formula: "SUM(L6:L29)", result: totalExTax };
  sc("L33", designFee);

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();

  const today = new Date();
  const fileDate =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");
  const storeSafe = (storeName || "estimate").replace(/[\s/\\:*?"<>|]/g, "_");
  const filename = `見積書_${storeSafe}_${fileDate}.xlsx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
