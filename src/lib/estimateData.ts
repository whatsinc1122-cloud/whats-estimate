export type WorkCondition = "スケルトン" | "居抜き（大規模改修）" | "居抜き（軽微改修）";
export type Area = "東京都（都心）" | "東京都（郊外）" | "神奈川・埼玉・千葉" | "その他";
export type AcType = "業務用マルチ" | "家庭用複数台" | "既存流用";
export type LightType = "演出照明" | "標準";
export type FurnType = "多め" | "標準" | "少なめ";
export type FloorType = "フロアタイル" | "磁器タイル" | "その他";

export interface ProjectCase {
  id: string;
  name: string;
  tsubo: number;
  cond: WorkCondition;
  area: Area;
  seats: number;
  total: number;
  design: number;
  ac: AcType;
  light: LightType;
  furn: FurnType;
  floor: FloorType;
  items: Record<string, number>;
}

export const CASES: ProjectCase[] = [
  {
    id: "054",
    name: "masago（港区・30坪）",
    tsubo: 30,
    cond: "スケルトン",
    area: "東京都（都心）",
    seats: 5,
    total: 21350000,
    design: 1250000,
    ac: "業務用マルチ",
    light: "演出照明",
    furn: "多め",
    floor: "フロアタイル",
    items: {
      仮設: 22007, 解体: 0, 軽鉄: 56667, 塗装: 42220, タイル: 62907,
      内装: 16237, ガラス: 19757, 建具: 6180, 看板: 2670, 木工: 21350,
      床下地: 19563, 衛生器具: 8610, 給排水: 39333, 空調: 120017,
      給排気: 19343, 電気: 79050, 照明: 35153, ガス: 3333, 家具: 117570,
      自火報: 8200, 雑工事: 4447, 諸経費: 25333,
    },
  },
  {
    id: "004",
    name: "utuwa2号店（24坪）",
    tsubo: 24,
    cond: "スケルトン",
    area: "東京都（郊外）",
    seats: 4,
    total: 9974060,
    design: 1010000,
    ac: "業務用マルチ",
    light: "演出照明",
    furn: "標準",
    floor: "フロアタイル",
    items: {
      仮設: 21062, 解体: 0, 軽鉄: 34582, 塗装: 23800, タイル: 0,
      内装: 24104, ガラス: 0, 建具: 6433, 看板: 0, 木工: 24512,
      床下地: 14075, 衛生器具: 21442, 給排水: 25467, 空調: 47888,
      給排気: 11579, 電気: 70767, 照明: 26992, ガス: 0, 家具: 39967,
      自火報: 0, 雑工事: 0, 諸経費: 22917,
    },
  },
  {
    id: "006",
    name: "Ursus松戸（居抜き・22坪）",
    tsubo: 22,
    cond: "居抜き（大規模改修）",
    area: "神奈川・埼玉・千葉",
    seats: 4,
    total: 5435000,
    design: 380000,
    ac: "既存流用",
    light: "標準",
    furn: "標準",
    floor: "フロアタイル",
    items: {
      仮設: 18755, 解体: 15155, 軽鉄: 22300, 塗装: 14909, タイル: 0,
      内装: 38709, ガラス: 0, 建具: 0, 看板: 16918, 木工: 0,
      床下地: 7605, 衛生器具: 0, 給排水: 16005, 空調: 0,
      給排気: 0, 電気: 42427, 照明: 11973, ガス: 0, 家具: 37836,
      自火報: 0, 雑工事: 0, 諸経費: 17500,
    },
  },
  {
    id: "013",
    name: "粉川様（24坪）",
    tsubo: 24,
    cond: "スケルトン",
    area: "東京都（郊外）",
    seats: 4,
    total: 11738350,
    design: 1060000,
    ac: "家庭用複数台",
    light: "演出照明",
    furn: "標準",
    floor: "フロアタイル",
    items: {
      仮設: 23621, 解体: 2129, 軽鉄: 76381, 塗装: 31750, タイル: 11708,
      内装: 62621, ガラス: 0, 建具: 23617, 看板: 1946, 木工: 10267,
      床下地: 15442, 衛生器具: 6896, 給排水: 37783, 空調: 16179,
      給排気: 6238, 電気: 33342, 照明: 24783, ガス: 11112, 家具: 29817,
      自火報: 11112, 雑工事: 23188, 諸経費: 29167,
    },
  },
  {
    id: "066",
    name: "Johnny MEN下北沢（14坪）",
    tsubo: 14,
    cond: "スケルトン",
    area: "東京都（都心）",
    seats: 2,
    total: 11251900,
    design: 400000,
    ac: "業務用マルチ",
    light: "演出照明",
    furn: "少なめ",
    floor: "磁器タイル",
    items: {
      仮設: 37771, 解体: 0, 軽鉄: 0, 塗装: 60407, タイル: 65207,
      内装: 0, ガラス: 28314, 建具: 0, 看板: 48307, 木工: 73279,
      床下地: 0, 衛生器具: 14779, 給排水: 55250, 空調: 70407,
      給排気: 17957, 電気: 102557, 照明: 40171, ガス: 5000, 家具: 28993,
      自火報: 0, 雑工事: 21050, 諸経費: 31429,
    },
  },
  {
    id: "025",
    name: "HAREKE（居抜き・39坪）",
    tsubo: 39,
    cond: "居抜き（大規模改修）",
    area: "東京都（都心）",
    seats: 8,
    total: 17575909,
    design: 1515000,
    ac: "家庭用複数台",
    light: "演出照明",
    furn: "多め",
    floor: "フロアタイル",
    items: {
      仮設: 12528, 解体: 27338, 軽鉄: 47306, 塗装: 29418, タイル: 7031,
      内装: 47351, ガラス: 11659, 建具: 0, 看板: 19905, 木工: 25774,
      床下地: 0, 衛生器具: 7254, 給排水: 28377, 空調: 10300,
      給排気: 10900, 電気: 48162, 照明: 34731, ガス: 0, 家具: 85249,
      自火報: 6838, 雑工事: 11472, 諸経費: 16667,
    },
  },
  {
    id: "140",
    name: "MILK表参道（21.5坪）",
    tsubo: 21.5,
    cond: "スケルトン",
    area: "東京都（都心）",
    seats: 5,
    total: 14997200,
    design: 960000,
    ac: "業務用マルチ",
    light: "演出照明",
    furn: "多め",
    floor: "磁器タイル",
    items: {
      仮設: 26542, 解体: 26396, 軽鉄: 33637, 塗装: 15409, タイル: 84707,
      内装: 16293, ガラス: 43502, 建具: 0, 看板: 16470, 木工: 24195,
      床下地: 0, 衛生器具: 17302, 給排水: 12512, 空調: 98474,
      給排気: 0, 電気: 55247, 照明: 77721, ガス: 0, 家具: 93107,
      自火報: 0, 雑工事: 18014, 諸経費: 24186,
    },
  },
  {
    id: "056",
    name: "廣田様・船橋（8.9坪）",
    tsubo: 8.9,
    cond: "スケルトン",
    area: "神奈川・埼玉・千葉",
    seats: 2,
    total: 4859545,
    design: 595000,
    ac: "既存流用",
    light: "標準",
    furn: "標準",
    floor: "フロアタイル",
    items: {
      仮設: 35572, 解体: 0, 軽鉄: 0, 塗装: 26663, タイル: 19910,
      内装: 77730, ガラス: 17281, 建具: 0, 看板: 13888, 木工: 70182,
      床下地: 0, 衛生器具: 0, 給排水: 46348, 空調: 0,
      給排気: 0, 電気: 56326, 照明: 27730, ガス: 26438, 家具: 66888,
      自火報: 0, 雑工事: 0, 諸経費: 50562,
    },
  },
];

export interface EstimateInput {
  tsubo: number;
  ceilingHeight: number;
  condition: WorkCondition;
  area: Area;
  seats: number;
  hasDemolition: boolean;
  floor: FloorType;
  wallCeiling: string;
  lighting: LightType;
  furniture: FurnType;
  ac: AcType;
  signage: boolean;
}

export interface ItemBreakdown {
  name: string;
  amount: number;
  ratio: number;
  perTsubo: number;
  dataRange: string;
}

export interface SimilarCase {
  id: string;
  name: string;
  score: number;
  total: number;
  tsubo: number;
  perTsubo: number;
}

export interface EstimateResult {
  totalExTax: number;
  perTsubo: number;
  designFee: number;
  totalWithTax: number;
  breakdown: ItemBreakdown[];
  similarCases: SimilarCase[];
}

function scoreCase(c: ProjectCase, input: EstimateInput): number {
  let score = 100;
  // 坪数の差
  const tsuboDiff = Math.abs(c.tsubo - input.tsubo) / input.tsubo;
  score -= tsuboDiff * 30;
  // 工事条件
  if (c.cond === input.condition) score += 25;
  // エリア
  if (c.area === input.area) score += 20;
  // 空調
  if (c.ac === input.ac) score += 10;
  // 照明
  if (c.light === input.lighting) score += 8;
  // 家具
  if (c.furn === input.furniture) score += 7;
  return Math.max(0, score);
}

function getAreaMultiplier(area: Area): number {
  switch (area) {
    case "東京都（都心）": return 1.15;
    case "東京都（郊外）": return 1.0;
    case "神奈川・埼玉・千葉": return 0.92;
    default: return 0.88;
  }
}

function getConditionMultiplier(cond: WorkCondition): number {
  switch (cond) {
    case "スケルトン": return 1.0;
    case "居抜き（大規模改修）": return 0.75;
    case "居抜き（軽微改修）": return 0.45;
  }
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  // Find similar cases and use weighted average of item unit prices
  const scoredCases = CASES.map(c => ({ ...c, score: scoreCase(c, input) }))
    .sort((a, b) => b.score - a.score);

  const top4 = scoredCases.slice(0, 4);
  const totalScore = top4.reduce((s, c) => s + c.score, 0);

  const itemNames = Object.keys(CASES[0].items);
  const weightedUnitPrices: Record<string, number> = {};

  for (const itemName of itemNames) {
    let wSum = 0;
    let wTotal = 0;
    for (const c of top4) {
      const w = c.score / totalScore;
      wSum += c.items[itemName] * w;
      wTotal += w;
    }
    weightedUnitPrices[itemName] = wSum / wTotal;
  }

  const areaMultiplier = getAreaMultiplier(input.area);
  const condMultiplier = getConditionMultiplier(input.condition);

  // Ceiling height modifier
  const ceilingMod = input.ceilingHeight > 2.7 ? 1.08 : 1.0;

  // Floor type modifier
  const floorMod = input.floor === "磁器タイル" ? 1.12 : 1.0;

  // Furniture modifier
  const furnMod = input.furniture === "多め" ? 1.15 : input.furniture === "少なめ" ? 0.85 : 1.0;

  // AC modifier
  const acMod = input.ac === "業務用マルチ" ? 1.2 : input.ac === "家庭用複数台" ? 0.9 : 0.3;

  // Lighting modifier
  const lightMod = input.lighting === "演出照明" ? 1.25 : 1.0;

  const breakdown: ItemBreakdown[] = [];

  for (const itemName of itemNames) {
    let unitPrice = weightedUnitPrices[itemName];

    // Apply item-specific modifiers
    if (itemName === "空調") unitPrice *= acMod;
    if (itemName === "照明") unitPrice *= lightMod;
    if (itemName === "家具") unitPrice *= furnMod;
    if (itemName === "タイル" || itemName === "床下地") unitPrice *= floorMod;
    if (itemName === "解体") {
      if (!input.hasDemolition) unitPrice = 0;
    }

    const amount = Math.round(unitPrice * input.tsubo * areaMultiplier * condMultiplier * ceilingMod);

    // Get data range from cases
    const caseValues = CASES.map(c => c.items[itemName]).filter(v => v > 0);
    const minVal = caseValues.length > 0 ? Math.min(...caseValues) : 0;
    const maxVal = caseValues.length > 0 ? Math.max(...caseValues) : 0;
    const dataRange = caseValues.length > 0
      ? `${Math.round(minVal).toLocaleString()}〜${Math.round(maxVal).toLocaleString()}円/坪`
      : "データなし";

    breakdown.push({
      name: itemName,
      amount,
      ratio: 0, // will calculate after sum
      perTsubo: Math.round(amount / input.tsubo),
      dataRange,
    });
  }

  const totalExTax = breakdown.reduce((s, b) => s + b.amount, 0);

  // Update ratios
  for (const b of breakdown) {
    b.ratio = totalExTax > 0 ? Math.round((b.amount / totalExTax) * 1000) / 10 : 0;
  }

  const perTsubo = Math.round(totalExTax / input.tsubo);
  const designFee = Math.round(totalExTax * 0.08);
  const totalWithTax = Math.round(totalExTax * 1.1);

  const similarCases: SimilarCase[] = top4.map(c => ({
    id: c.id,
    name: c.name,
    score: Math.round(c.score),
    total: c.total,
    tsubo: c.tsubo,
    perTsubo: Math.round(c.total / c.tsubo),
  }));

  return { totalExTax, perTsubo, designFee, totalWithTax, breakdown, similarCases };
}
