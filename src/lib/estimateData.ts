export type WorkCondition = "スケルトン" | "居抜き（大規模改修）" | "居抜き（軽微改修）" | "部分改装";
export type Area = "東京都（都心）" | "東京都（郊外）" | "神奈川・埼玉・千葉" | "その他" | "群馬・その他";
export type BusinessType = "美容室" | "アイサロン・ネイルサロン" | "その他";
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
  businessType: BusinessType;
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
    id: "054", name: "masago（港区・30坪）", tsubo: 30, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 5, total: 21350000, design: 1250000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 22007, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 56667, 塗装: 42220, タイル: 62907,
      内装: 16237, ガラス: 19757, 建具: 6180, 看板: 2670, 木工: 21350, 床下地: 19563,
      衛生器具: 8610, 給排水: 39333, 空調: 120017, 給排気: 19343, 電気: 79050,
      照明: 35153, ガス: 3333, 家具: 117570, 自火報: 8200, 雑工事: 4447, 諸経費: 25333,
    },
  },
  {
    id: "004", name: "utuwa2号店（24坪）", tsubo: 24, cond: "スケルトン", area: "東京都（郊外）",
    businessType: "美容室", seats: 4, total: 9974060, design: 1010000,
    ac: "業務用マルチ", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 21062, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 34582, 塗装: 23800, タイル: 0,
      内装: 24104, ガラス: 0, 建具: 6433, 看板: 0, 木工: 24512, 床下地: 14075,
      衛生器具: 21442, 給排水: 25467, 空調: 47888, 給排気: 11579, 電気: 70767,
      照明: 26992, ガス: 0, 家具: 39967, 自火報: 0, 雑工事: 0, 諸経費: 22917,
    },
  },
  {
    id: "006", name: "Ursus松戸（居抜き・22坪）", tsubo: 22, cond: "居抜き（大規模改修）", area: "神奈川・埼玉・千葉",
    businessType: "美容室", seats: 4, total: 5435000, design: 380000,
    ac: "既存流用", light: "標準", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 18755, 解体: 15155, 左官: 0, 金物: 0, 軽鉄: 22300, 塗装: 14909, タイル: 0,
      内装: 38709, ガラス: 0, 建具: 0, 看板: 16918, 木工: 0, 床下地: 7605,
      衛生器具: 0, 給排水: 16005, 空調: 0, 給排気: 0, 電気: 42427,
      照明: 11973, ガス: 0, 家具: 37836, 自火報: 0, 雑工事: 0, 諸経費: 17500,
    },
  },
  {
    id: "013", name: "粉川様（24坪）", tsubo: 24, cond: "スケルトン", area: "東京都（郊外）",
    businessType: "美容室", seats: 4, total: 11738350, design: 1060000,
    ac: "家庭用複数台", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 23621, 解体: 2129, 左官: 0, 金物: 0, 軽鉄: 76381, 塗装: 31750, タイル: 11708,
      内装: 62621, ガラス: 0, 建具: 23617, 看板: 1946, 木工: 10267, 床下地: 15442,
      衛生器具: 6896, 給排水: 37783, 空調: 16179, 給排気: 6238, 電気: 33342,
      照明: 24783, ガス: 11112, 家具: 29817, 自火報: 11112, 雑工事: 23188, 諸経費: 29167,
    },
  },
  {
    id: "066", name: "Johnny MEN下北沢（14坪）", tsubo: 14, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 2, total: 11251900, design: 400000,
    ac: "業務用マルチ", light: "演出照明", furn: "少なめ", floor: "磁器タイル",
    items: {
      仮設: 37771, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 60407, タイル: 65207,
      内装: 0, ガラス: 28314, 建具: 0, 看板: 48307, 木工: 73279, 床下地: 0,
      衛生器具: 14779, 給排水: 55250, 空調: 70407, 給排気: 17957, 電気: 102557,
      照明: 40171, ガス: 5000, 家具: 28993, 自火報: 0, 雑工事: 21050, 諸経費: 31429,
    },
  },
  {
    id: "025", name: "HAREKE（居抜き・39坪）", tsubo: 39, cond: "居抜き（大規模改修）", area: "東京都（都心）",
    businessType: "美容室", seats: 8, total: 17575909, design: 1515000,
    ac: "家庭用複数台", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 12528, 解体: 27338, 左官: 0, 金物: 0, 軽鉄: 47306, 塗装: 29418, タイル: 7031,
      内装: 47351, ガラス: 11659, 建具: 0, 看板: 19905, 木工: 25774, 床下地: 0,
      衛生器具: 7254, 給排水: 28377, 空調: 10300, 給排気: 10900, 電気: 48162,
      照明: 34731, ガス: 0, 家具: 85249, 自火報: 6838, 雑工事: 11472, 諸経費: 16667,
    },
  },
  {
    id: "140", name: "MILK表参道（21.5坪）", tsubo: 21.5, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 5, total: 14997200, design: 960000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "磁器タイル",
    items: {
      仮設: 26542, 解体: 26396, 左官: 0, 金物: 0, 軽鉄: 33637, 塗装: 15409, タイル: 84707,
      内装: 16293, ガラス: 43502, 建具: 0, 看板: 16470, 木工: 24195, 床下地: 0,
      衛生器具: 17302, 給排水: 12512, 空調: 98474, 給排気: 0, 電気: 55247,
      照明: 77721, ガス: 0, 家具: 93107, 自火報: 0, 雑工事: 18014, 諸経費: 24186,
    },
  },
  {
    id: "056", name: "廣田様・船橋（8.9坪）", tsubo: 8.9, cond: "スケルトン", area: "神奈川・埼玉・千葉",
    businessType: "美容室", seats: 2, total: 4859545, design: 595000,
    ac: "既存流用", light: "標準", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 35572, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 26663, タイル: 19910,
      内装: 77730, ガラス: 17281, 建具: 0, 看板: 13888, 木工: 70182, 床下地: 0,
      衛生器具: 0, 給排水: 46348, 空調: 0, 給排気: 0, 電気: 56326,
      照明: 27730, ガス: 26438, 家具: 66888, 自火報: 0, 雑工事: 0, 諸経費: 50562,
    },
  },
  // ── 追加案件 ──────────────────────────────
  {
    id: "07-06-007", name: "SEPIA", tsubo: 21, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 4, total: 16834010, design: 940000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 25819, 解体: 0, 左官: 15876, 金物: 0, 軽鉄: 33820, 塗装: 31533, タイル: 0,
      内装: 30795, ガラス: 32005, 建具: 0, 看板: 20462, 木工: 17329, 床下地: 43395,
      衛生器具: 8205, 給排水: 38795, 空調: 126762, 給排気: 13438, 電気: 121671,
      照明: 44024, ガス: 25014, 家具: 121062, 自火報: 12700, 雑工事: 5581, 諸経費: 33333,
    },
  },
  {
    id: "07-06-024", name: "trésbeau桜ヶ丘", tsubo: 34, cond: "居抜き（大規模改修）", area: "神奈川・埼玉・千葉",
    businessType: "美容室", seats: 7, total: 27250000, design: 1750000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 20553, 解体: 32347, 左官: 982, 金物: 0, 軽鉄: 47784, 塗装: 42959, タイル: 18853,
      内装: 8985, ガラス: 27774, 建具: 7062, 看板: 22535, 木工: 49524, 床下地: 16724,
      衛生器具: 15591, 給排水: 23532, 空調: 196162, 給排気: 9971, 電気: 79653,
      照明: 42882, ガス: 0, 家具: 126574, 自火報: 0, 雑工事: 518, 諸経費: 30000,
    },
  },
  {
    id: "07-06-063", name: "STORIES", tsubo: 15, cond: "部分改装", area: "東京都（都心）",
    businessType: "美容室", seats: 3, total: 2265000, design: 65000,
    ac: "既存流用", light: "標準", furn: "少なめ", floor: "磁器タイル",
    items: {
      仮設: 31133, 解体: 12000, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 0, タイル: 37980,
      内装: 6200, ガラス: 10327, 建具: 0, 看板: 7067, 木工: 11200, 床下地: 0,
      衛生器具: 0, 給排水: 4533, 空調: 0, 給排気: 0, 電気: 15373,
      照明: 0, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 0, 諸経費: 15333,
    },
  },
  {
    id: "07-06-063VE", name: "STORIES（VE案）", tsubo: 15, cond: "部分改装", area: "東京都（都心）",
    businessType: "美容室", seats: 3, total: 1635000, design: 65000,
    ac: "既存流用", light: "標準", furn: "少なめ", floor: "磁器タイル",
    items: {
      仮設: 24267, 解体: 12000, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 0, タイル: 16647,
      内装: 6200, ガラス: 0, 建具: 0, 看板: 5733, 木工: 16360, 床下地: 0,
      衛生器具: 0, 給排水: 4533, 空調: 0, 給排気: 0, 電気: 11800,
      照明: 0, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 0, 諸経費: 15333,
    },
  },
  {
    id: "0209-kohi", name: "コヒー（青木様）", tsubo: 15, cond: "居抜き（大規模改修）", area: "東京都（郊外）",
    businessType: "美容室", seats: 3, total: 5806364, design: 830000,
    ac: "家庭用複数台", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 22800, 解体: 21333, 左官: 0, 金物: 0, 軽鉄: 58533, 塗装: 13473, タイル: 0,
      内装: 44127, ガラス: 0, 建具: 0, 看板: 6753, 木工: 28233, 床下地: 24573,
      衛生器具: 8507, 給排水: 50500, 空調: 13393, 給排気: 0, 電気: 38773,
      照明: 22967, ガス: 0, 家具: 20940, 自火報: 0, 雑工事: 0, 諸経費: 36133,
    },
  },
  {
    id: "0704002-dici", name: "d'ici", tsubo: 10, cond: "部分改装", area: "東京都（郊外）",
    businessType: "美容室", seats: 2, total: 2308800, design: 0,
    ac: "既存流用", light: "標準", furn: "標準", floor: "磁器タイル",
    items: {
      仮設: 2500, 解体: 28340, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 7160, タイル: 52200,
      内装: 11750, ガラス: 0, 建具: 0, 看板: 0, 木工: 35920, 床下地: 20560,
      衛生器具: 0, 給排水: 30730, 空調: 0, 給排気: 0, 電気: 15720,
      照明: 0, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 0, 諸経費: 26000,
    },
  },
  {
    id: "0704003-fujisoba", name: "富士そば秋津店（VE）", tsubo: 20, cond: "居抜き（大規模改修）", area: "東京都（郊外）",
    businessType: "その他", seats: 10, total: 7800000, design: 0,
    ac: "業務用マルチ", light: "標準", furn: "少なめ", floor: "フロアタイル",
    items: {
      仮設: 31155, 解体: 4880, 左官: 0, 金物: 540, 軽鉄: 0, 塗装: 34235, タイル: 0,
      内装: 0, ガラス: 6555, 建具: 0, 看板: 63870, 木工: 12420, 床下地: 0,
      衛生器具: 0, 給排水: 6040, 空調: 154040, 給排気: 13045, 電気: 8675,
      照明: 37505, ガス: 0, 家具: 8615, 自火報: 0, 雑工事: 0, 諸経費: 22000,
    },
  },
  {
    id: "0704009-haturo", name: "発露（大泉学園）", tsubo: 10, cond: "スケルトン", area: "神奈川・埼玉・千葉",
    businessType: "美容室", seats: 2, total: 5233700, design: 50000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 32000, 解体: 0, 左官: 33870, 金物: 0, 軽鉄: 0, 塗装: 27250, タイル: 0,
      内装: 11730, ガラス: 0, 建具: 0, 看板: 30770, 木工: 24640, 床下地: 7510,
      衛生器具: 0, 給排水: 53860, 空調: 110270, 給排気: 0, 電気: 81560,
      照明: 0, ガス: 12630, 家具: 97280, 自火報: 0, 雑工事: 0, 諸経費: 0,
    },
  },
  {
    id: "0704019-fiken", name: "FIK-en", tsubo: 16, cond: "スケルトン", area: "東京都（郊外）",
    businessType: "美容室", seats: 3, total: 7391818, design: 790000,
    ac: "家庭用複数台", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 19113, 解体: 29913, 左官: 10000, 金物: 0, 軽鉄: 0, 塗装: 22013, タイル: 14319,
      内装: 56888, ガラス: 8563, 建具: 0, 看板: 4169, 木工: 58338, 床下地: 0,
      衛生器具: 17931, 給排水: 54175, 空調: 33763, 給排気: 0, 電気: 84956,
      照明: 11747, ガス: 0, 家具: 53438, 自火報: 6669, 雑工事: 20206, 諸経費: 21875,
    },
  },
  {
    id: "0704021-groomers", name: "GROOMER/S CREDGE", tsubo: 18, cond: "スケルトン", area: "東京都（郊外）",
    businessType: "その他", seats: 4, total: 8440000, design: 820000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 17111, 解体: 18522, 左官: 7411, 金物: 0, 軽鉄: 0, 塗装: 19406, タイル: 61272,
      内装: 16178, ガラス: 17128, 建具: 0, 看板: 15567, 木工: 64944, 床下地: 0,
      衛生器具: 3039, 給排水: 24456, 空調: 17317, 給排気: 2989, 電気: 28183,
      照明: 48182, ガス: 26000, 家具: 119422, 自火報: 0, 雑工事: 11889, 諸経費: 27778,
    },
  },
  {
    id: "0704046-onoda", name: "小野田様", tsubo: 21, cond: "スケルトン", area: "東京都（郊外）",
    businessType: "美容室", seats: 4, total: 9882600, design: 932000,
    ac: "業務用マルチ", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 32576, 解体: 10571, 左官: 17143, 金物: 0, 軽鉄: 36524, 塗装: 15143, タイル: 0,
      内装: 53705, ガラス: 8024, 建具: 12790, 看板: 0, 木工: 32300, 床下地: 31648,
      衛生器具: 14819, 給排水: 27476, 空調: 0, 給排気: 0, 電気: 44195,
      照明: 13986, ガス: 24224, 家具: 47571, 自火報: 0, 雑工事: 6571, 諸経費: 41333,
    },
  },
  {
    id: "0705008-toniguy-gaiso", name: "TONI&GUY（外装工事）", tsubo: 20, cond: "部分改装", area: "東京都（都心）",
    businessType: "美容室", seats: 5, total: 8548000, design: 0,
    ac: "既存流用", light: "標準", furn: "少なめ", floor: "その他",
    items: {
      仮設: 0, 解体: 27468, 左官: 127020, 金物: 32561, 軽鉄: 223296, 塗装: 47250, タイル: 0,
      内装: 0, ガラス: 0, 建具: 0, 看板: 0, 木工: 0, 床下地: 0,
      衛生器具: 0, 給排水: 0, 空調: 0, 給排気: 0, 電気: 0,
      照明: 0, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 0, 諸経費: 0,
    },
  },
  {
    id: "0705009-toniguy-2f", name: "TONI&GUY 2F内装", tsubo: 21, cond: "部分改装", area: "東京都（都心）",
    businessType: "美容室", seats: 4, total: 4570000, design: 520000,
    ac: "既存流用", light: "標準", furn: "少なめ", floor: "磁器タイル",
    items: {
      仮設: 0, 解体: 9225, 左官: 56208, 金物: 14062, 軽鉄: 67267, 塗装: 25881, タイル: 46897,
      内装: 8991, ガラス: 10510, 建具: 0, 看板: 0, 木工: 0, 床下地: 0,
      衛生器具: 0, 給排水: 0, 空調: 0, 給排気: 0, 電気: 0,
      照明: 0, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 0, 諸経費: 0,
    },
  },
  {
    id: "0705010-misaki", name: "misaki様", tsubo: 23, cond: "スケルトン", area: "東京都（郊外）",
    businessType: "美容室", seats: 5, total: 14824100, design: 1020000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 22487, 解体: 0, 左官: 12630, 金物: 4357, 軽鉄: 69970, 塗装: 52074, タイル: 0,
      内装: 25748, ガラス: 20491, 建具: 0, 看板: 13926, 木工: 50057, 床下地: 0,
      衛生器具: 16717, 給排水: 62609, 空調: 59457, 給排気: 8870, 電気: 38874,
      照明: 32344, ガス: 8152, 家具: 63317, 自火報: 33735, 雑工事: 16974, 諸経費: 31739,
    },
  },
  {
    id: "0705016-sasaki-clinic", name: "ささき美容クリニック（VE）", tsubo: 14, cond: "スケルトン", area: "東京都（都心）",
    businessType: "その他", seats: 4, total: 8700000, design: 800000,
    ac: "業務用マルチ", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 23207, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 114076, 塗装: 39457, タイル: 0,
      内装: 44079, ガラス: 0, 建具: 22886, 看板: 10964, 木工: 5721, 床下地: 0,
      衛生器具: 52629, 給排水: 28579, 空調: 128521, 給排気: 15264, 電気: 59750,
      照明: 24236, ガス: 0, 家具: 52879, 自火報: 14286, 雑工事: 0, 諸経費: 58571,
    },
  },
  {
    id: "0705018-ginza-koteashi", name: "カットサロンGINZA小手指", tsubo: 16, cond: "部分改装", area: "東京都（郊外）",
    businessType: "美容室", seats: 3, total: 2859000, design: 0,
    ac: "既存流用", light: "標準", furn: "少なめ", floor: "フロアタイル",
    items: {
      仮設: 11931, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 5013, タイル: 0,
      内装: 65619, ガラス: 0, 建具: 0, 看板: 31694, 木工: 0, 床下地: 0,
      衛生器具: 0, 給排水: 0, 空調: 0, 給排気: 0, 電気: 35838,
      照明: 0, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 13338, 諸経費: 15313,
    },
  },
  {
    id: "0705021-geeks", name: "GEEKS", tsubo: 16, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 3, total: 11140000, design: 740000,
    ac: "業務用マルチ", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 28063, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 61533, 塗装: 28106, タイル: 0,
      内装: 40513, ガラス: 5006, 建具: 6763, 看板: 1506, 木工: 7500, 床下地: 20838,
      衛生器具: 74031, 給排水: 84175, 空調: 0, 給排気: 30138, 電気: 108375,
      照明: 47975, ガス: 10000, 家具: 75375, 自火報: 13338, 雑工事: 0, 諸経費: 53125,
    },
  },
  {
    id: "0705023-tokunaga", name: "徳永様", tsubo: 23, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 5, total: 17320000, design: 1220000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 25252, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 79963, 塗装: 64409, タイル: 10191,
      内装: 35678, ガラス: 10965, 建具: 7826, 看板: 8078, 木工: 1865, 床下地: 42122,
      衛生器具: 22952, 給排水: 55913, 空調: 103717, 給排気: 12070, 電気: 68978,
      照明: 46496, ガス: 12426, 家具: 68939, 自火報: 12426, 雑工事: 25857, 諸経費: 36957,
    },
  },
  {
    id: "0705024-elno", name: "elno", tsubo: 11, cond: "部分改装", area: "東京都（郊外）",
    businessType: "アイサロン・ネイルサロン", seats: 3, total: 1790000, design: 210000,
    ac: "既存流用", light: "標準", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 14518, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 28436, タイル: 4527,
      内装: 9300, ガラス: 5127, 建具: 0, 看板: 573, 木工: 18964, 床下地: 0,
      衛生器具: 0, 給排水: 0, 空調: 0, 給排気: 0, 電気: 9400,
      照明: 7309, ガス: 0, 家具: 17045, 自火報: 0, 雑工事: 30964, 諸経費: 18182,
    },
  },
  {
    id: "0707008-neolive-cino", name: "Neolive cino", tsubo: 16, cond: "スケルトン", area: "神奈川・埼玉・千葉",
    businessType: "美容室", seats: 3, total: 10010000, design: 690000,
    ac: "業務用マルチ", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 21214, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 89725, 塗装: 53356, タイル: 2244,
      内装: 77931, ガラス: 11650, 建具: 0, 看板: 18006, 木工: 36950, 床下地: 0,
      衛生器具: 23763, 給排水: 11681, 空調: 65925, 給排気: 17575, 電気: 65975,
      照明: 39056, ガス: 0, 家具: 34906, 自火報: 64150, 雑工事: 40313, 諸経費: 25000,
    },
  },
  {
    id: "0707010-sakaechodori-eyebrow", name: "Mode!? men's eyebrow salon", tsubo: 15, cond: "居抜き（大規模改修）", area: "神奈川・埼玉・千葉",
    businessType: "アイサロン・ネイルサロン", seats: 4, total: 6707273, design: 1020000,
    ac: "既存流用", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 55427, 解体: 23697, 左官: 0, 金物: 0, 軽鉄: 29088, 塗装: 0, タイル: 0,
      内装: 129511, ガラス: 0, 建具: 0, 看板: 12900, 木工: 0, 床下地: 24753,
      衛生器具: 0, 給排水: 21087, 空調: 0, 給排気: 0, 電気: 55633,
      照明: 0, ガス: 0, 家具: 70873, 自火報: 0, 雑工事: 44460, 諸経費: 0,
    },
  },
  {
    id: "0708011-salowin-takasaki", name: "SALOWIN高崎", tsubo: 22, cond: "スケルトン", area: "群馬・その他",
    businessType: "美容室", seats: 5, total: 15383890, design: 1030000,
    ac: "業務用マルチ", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 21649, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 68195, 塗装: 48977, タイル: 13909,
      内装: 52928, ガラス: 25259, 建具: 9100, 看板: 9091, 木工: 0, 床下地: 32427,
      衛生器具: 23964, 給排水: 27786, 空調: 100732, 給排気: 25968, 電気: 38427,
      照明: 34150, ガス: 5055, 家具: 90891, 自火報: 7577, 雑工事: 0, 諸経費: 63182,
    },
  },
  {
    id: "0708021-hair-sasaki", name: "hair SASAKI", tsubo: 12, cond: "居抜き（大規模改修）", area: "東京都（郊外）",
    businessType: "美容室", seats: 2, total: 4554545, design: 700000,
    ac: "家庭用複数台", light: "演出照明", furn: "多め", floor: "フロアタイル",
    items: {
      仮設: 37325, 解体: 10583, 左官: 0, 金物: 0, 軽鉄: 21342, 塗装: 13450, タイル: 5200,
      内装: 53742, ガラス: 4767, 建具: 0, 看板: 8975, 木工: 41625, 床下地: 0,
      衛生器具: 9875, 給排水: 39075, 空調: 0, 給排気: 7133, 電気: 30517,
      照明: 28140, ガス: 0, 家具: 51075, 自火報: 0, 雑工事: 500, 諸経費: 53333,
    },
  },
  {
    id: "0708022-fujimori", name: "藤森様", tsubo: 11, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 2, total: 6588800, design: 650000,
    ac: "業務用マルチ", light: "演出照明", furn: "標準", floor: "フロアタイル",
    items: {
      仮設: 27300, 解体: 10909, 左官: 0, 金物: 0, 軽鉄: 37073, 塗装: 18182, タイル: 11882,
      内装: 29636, ガラス: 12245, 建具: 0, 看板: 0, 木工: 24264, 床下地: 20236,
      衛生器具: 11491, 給排水: 39864, 空調: 81600, 給排気: 35409, 電気: 55773,
      照明: 40409, ガス: 0, 家具: 72273, 自火報: 12255, 雑工事: 0, 諸経費: 58182,
    },
  },
  {
    id: "0708041-reemotion", name: "ReEMOTION 神宮前", tsubo: 7, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 2, total: 5034545, design: 420000,
    ac: "業務用マルチ", light: "演出照明", furn: "少なめ", floor: "磁器タイル",
    items: {
      仮設: 29314, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 20971, タイル: 49529,
      内装: 0, ガラス: 87700, 建具: 0, 看板: 37171, 木工: 54014, 床下地: 35243,
      衛生器具: 40400, 給排水: 64800, 空調: 137329, 給排気: 20943, 電気: 0,
      照明: 13357, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 65957, 諸経費: 62857,
    },
  },
  {
    id: "0708041ve-reemotion", name: "ReEMOTION 神宮前（VE案）", tsubo: 7, cond: "スケルトン", area: "東京都（都心）",
    businessType: "美容室", seats: 2, total: 4125454, design: 420000,
    ac: "業務用マルチ", light: "演出照明", furn: "少なめ", floor: "磁器タイル",
    items: {
      仮設: 29314, 解体: 0, 左官: 0, 金物: 0, 軽鉄: 0, 塗装: 10486, タイル: 21000,
      内装: 0, ガラス: 73243, 建具: 0, 看板: 25743, 木工: 39714, 床下地: 35243,
      衛生器具: 21357, 給排水: 59086, 空調: 110371, 給排気: 20943, 電気: 26686,
      照明: 13357, ガス: 0, 家具: 0, 自火報: 0, 雑工事: 53357, 諸経費: 62857,
    },
  },
];

// 工事合計近似スコアリング用: 全案件の坪単価中央値
const _perTsubos = [...CASES].map(c => c.total / c.tsubo).sort((a, b) => a - b);
const MEDIAN_PER_TSUBO = _perTsubos[Math.floor(_perTsubos.length / 2)];

export interface EstimateInput {
  tsubo: number;
  ceilingHeight: number;
  condition: WorkCondition;
  area: Area;
  businessType: BusinessType;
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
  rangeMin: number;
  rangeMax: number;
  rangeAvg: number;
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
  subTotal: number;
  consumptionTax: number;
  totalWithTax: number;
  breakdown: ItemBreakdown[];
  similarCases: SimilarCase[];
  isCapped: boolean;
}

function scoreCase(c: ProjectCase, input: EstimateInput): number {
  let score = 0;
  // 業態一致 +30pt
  if (c.businessType === input.businessType) score += 30;
  // 工事条件一致 +25pt
  if (c.cond === input.condition) score += 25;
  // エリア一致 +20pt
  if (c.area === input.area) score += 20;
  // 坪数近似（±5坪以内）+15pt
  if (Math.abs(c.tsubo - input.tsubo) <= 5) score += 15;
  // 工事合計近似（坪単価が中央値±40%以内）+10pt
  if (Math.abs(c.total / c.tsubo - MEDIAN_PER_TSUBO) / MEDIAN_PER_TSUBO <= 0.4) score += 10;
  return score;
}

function getAreaMultiplier(area: Area): number {
  switch (area) {
    case "東京都（都心）": return 1.15;
    case "東京都（郊外）": return 1.0;
    case "神奈川・埼玉・千葉": return 0.92;
    case "群馬・その他": return 0.85;
    default: return 0.88;
  }
}

function getConditionMultiplier(cond: WorkCondition): number {
  switch (cond) {
    case "スケルトン": return 1.0;
    case "居抜き（大規模改修）": return 0.75;
    case "居抜き（軽微改修）": return 0.55;
    case "部分改装": return 0.45;
  }
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const scoredCases = CASES.map(c => ({ ...c, score: scoreCase(c, input) }))
    .sort((a, b) => b.score - a.score);

  const top4 = scoredCases.slice(0, 4);
  const totalScore = top4.reduce((s, c) => s + c.score, 0);

  const itemNames = Object.keys(CASES[0].items);
  // 中央値ベース: 各アイテムの坪単価をtop4でソートし、4件の中央値（2・3位平均）を使う
  const medianUnitPrices: Record<string, number> = {};
  for (const itemName of itemNames) {
    const vals = top4.map(c => c.items[itemName] ?? 0).sort((a, b) => a - b);
    medianUnitPrices[itemName] = (vals[1] + vals[2]) / 2;
  }

  const areaMultiplier = getAreaMultiplier(input.area);
  const condMultiplier = getConditionMultiplier(input.condition);
  const ceilingMod = input.ceilingHeight > 2.7 ? 1.08 : 1.0;
  const floorMod = input.floor === "磁器タイル" ? 1.12 : 1.0;
  const furnMod = input.furniture === "多め" ? 1.15 : input.furniture === "少なめ" ? 0.85 : 1.0;
  const acMod = input.ac === "業務用マルチ" ? 1.2 : input.ac === "家庭用複数台" ? 0.9 : 0.3;
  const lightMod = input.lighting === "演出照明" ? 1.25 : 1.0;
  // ②補正係数 0.93（中央値ベース単価を全体的に引き下げる）
  const CORRECTION = 0.93;

  const breakdown: ItemBreakdown[] = [];

  for (const itemName of itemNames) {
    let unitPrice = medianUnitPrices[itemName] * CORRECTION;

    if (itemName === "空調") unitPrice *= acMod;
    if (itemName === "照明") unitPrice *= lightMod;
    if (itemName === "家具") unitPrice *= furnMod;
    if (itemName === "タイル" || itemName === "床下地") unitPrice *= floorMod;
    if (itemName === "解体") {
      if (!input.hasDemolition) unitPrice = 0;
    }

    const amount = Math.round(unitPrice * input.tsubo * areaMultiplier * condMultiplier * ceilingMod);

    // ④実績レンジ: top4の総額（坪単価×入力坪数）から min/max/avg を算出
    const top4Amounts = top4.map(c => (c.items[itemName] ?? 0) * input.tsubo);
    const nonZero = top4Amounts.filter(v => v > 0);
    const rangeMin = nonZero.length > 0 ? Math.min(...nonZero) : 0;
    const rangeMax = nonZero.length > 0 ? Math.max(...nonZero) : 0;
    const rangeAvg = nonZero.length > 0 ? nonZero.reduce((s, v) => s + v, 0) / nonZero.length : 0;
    const dataRange = nonZero.length > 0
      ? `${Math.round(rangeMin / 10000)}〜${Math.round(rangeMax / 10000)}万円（平均${Math.round(rangeAvg / 10000)}万円）`
      : "データなし";

    breakdown.push({
      name: itemName,
      amount,
      ratio: 0,
      perTsubo: Math.round(amount / input.tsubo),
      dataRange,
      rangeMin,
      rangeMax,
      rangeAvg,
    });
  }

  let totalExTax = breakdown.reduce((s, b) => s + b.amount, 0);

  // ①坪単価キャップ 68万円/坪
  const CAP_PER_TSUBO = 680000;
  let isCapped = false;
  const rawPerTsubo = totalExTax / input.tsubo;
  if (rawPerTsubo > CAP_PER_TSUBO) {
    isCapped = true;
    const scale = (CAP_PER_TSUBO * input.tsubo) / totalExTax;
    for (const b of breakdown) {
      b.amount = Math.round(b.amount * scale);
      b.perTsubo = Math.round(b.amount / input.tsubo);
    }
    totalExTax = breakdown.reduce((s, b) => s + b.amount, 0);
  }

  for (const b of breakdown) {
    b.ratio = totalExTax > 0 ? Math.round((b.amount / totalExTax) * 1000) / 10 : 0;
  }

  const perTsubo = Math.round(totalExTax / input.tsubo);
  // ③設計デザイン費 = 工事合計の10%、税込総額 = (工事合計+設計費) × 1.1
  const designFee = Math.round(totalExTax * 0.10);
  const subTotal = totalExTax + designFee;
  const consumptionTax = Math.round(subTotal * 0.1);
  const totalWithTax = subTotal + consumptionTax;

  const similarCases: SimilarCase[] = top4.map(c => ({
    id: c.id,
    name: c.name,
    score: Math.round(c.score),
    total: c.total,
    tsubo: c.tsubo,
    perTsubo: Math.round(c.total / c.tsubo),
  }));

  return { totalExTax, perTsubo, designFee, subTotal, consumptionTax, totalWithTax, breakdown, similarCases, isCapped };
}
