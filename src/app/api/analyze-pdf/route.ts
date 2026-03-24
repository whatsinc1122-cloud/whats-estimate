import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `あなたは内装工事の設計図面・平面図を解析する専門アシスタントです。
アップロードされたPDF図面から以下の情報を抽出してください。

抽出対象：
1. 坪数（平方メートルから坪への換算も可：1坪=3.305㎡）
2. 天井高（メートル単位）
3. エリア・所在地（都道府県・地域）
4. セット面数（美容室の場合）
5. 解体工事の必要性（既存内装の有無から判断）

出力形式（JSON）：
{
  "tsubo": 数値またはnull,
  "ceilingHeight": 数値またはnull,
  "area": "東京都（都心）" | "東京都（郊外）" | "神奈川・埼玉・千葉" | "その他" | null,
  "seats": 数値またはnull,
  "hasDemolition": true | false | null,
  "confidence": {
    "tsubo": "high" | "medium" | "low",
    "ceilingHeight": "high" | "medium" | "low",
    "area": "high" | "medium" | "low",
    "seats": "high" | "medium" | "low",
    "hasDemolition": "high" | "medium" | "low"
  },
  "notes": "抽出に関する補足コメント"
}

注意事項：
- 情報が見当たらない場合はnullを返す
- 坪数は図面に記載の面積（㎡）から計算する
- 天井高が複数ある場合は主室の高さを使用
- 住所や地名から適切なエリア区分を選択する
- 必ずJSONのみを返し、余分なテキストは含めない`;

export async function POST(request: NextRequest) {
  try {
    const { pdfBase64 } = await request.json();

    if (!pdfBase64) {
      return NextResponse.json({ error: "PDFデータが必要です" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: pdfBase64,
              },
            },
            {
              type: "text",
              text: "この図面から内装工事に必要な情報を抽出してください。JSONのみで回答してください。",
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "解析に失敗しました" }, { status: 500 });
    }

    let parsed;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("JSONが見つかりません");
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json({ error: "JSONの解析に失敗しました", raw: textBlock.text }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("PDF analysis error:", error);
    const message = error instanceof Error ? error.message : "不明なエラー";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
