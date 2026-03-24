import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://whatsinc1122-cloud.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
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

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(
    path.join(process.cwd(), "public", "template.xlsx")
  );

  const ws = wb.getWorksheet("御見積書表紙_改");
  if (!ws) {
    return NextResponse.json({ error: "Sheet not found" }, { status: 500 });
  }

  // 値だけ書き込む（スタイルは一切触らない）
  ws.getCell("C7").value = data.customerName || "　";
  ws.getCell("C8").value = `店舗名：${data.storeName || "　"}`;
  ws.getCell("D12").value = data.totalIncTax;
  ws.getCell("D13").value = data.totalExTax;
  ws.getCell("D14").value = data.tax;
  ws.getCell("D20").value = data.tsubo;

  const items = data.items || {};
  ws.getCell("L6").value  = items["仮設"]   || 0;
  ws.getCell("L7").value  = items["解体"]   || 0;
  ws.getCell("L10").value = items["軽鉄"]   || 0;
  ws.getCell("L11").value = items["塗装"]   || 0;
  ws.getCell("L12").value = items["タイル"] || 0;
  ws.getCell("L13").value = items["内装"]   || 0;
  ws.getCell("L14").value = items["ガラス"] || 0;
  ws.getCell("L15").value = items["建具"]   || 0;
  ws.getCell("L16").value = items["看板"]   || 0;
  ws.getCell("L17").value = items["木工"]   || 0;
  ws.getCell("L18").value = items["床下地"] || 0;
  ws.getCell("L19").value = items["衛生器具"] || 0;
  ws.getCell("L20").value = items["給排水"] || 0;
  ws.getCell("L21").value = items["空調"]   || 0;
  ws.getCell("L22").value = items["給排気"] || 0;
  ws.getCell("L23").value = items["電気"]   || 0;
  ws.getCell("L24").value = items["照明"]   || 0;
  ws.getCell("L25").value = items["ガス"]   || 0;
  ws.getCell("L26").value = items["家具"]   || 0;
  ws.getCell("L27").value = items["自火報"] || 0;
  ws.getCell("L28").value = items["雑工事"] || 0;
  ws.getCell("L29").value = items["諸経費"] || 0;
  ws.getCell("L33").value = data.designFee || 0;

  const buffer = await wb.xlsx.writeBuffer();

  const today = new Date();
  const fileDate =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");
  const storeSafe = (data.storeName || "estimate").replace(/[\s/\\:*?"<>|]/g, "_");
  const filename = `見積書_${storeSafe}_${fileDate}.xlsx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
