export type RelationType = {
  id: string;
  label: string;
  color: string;
  icon: string;
};

export type Relation = {
  source: string;
  target: string;
  type: string;
  label: string;
};

// 関係タイプ定義
export const RELATION_TYPES: RelationType[] = [
    { id: "all", label: "すべて", color: "#F0E6D2", icon: "🔗" },
    { id: "family", label: "家族", color: "#E88AED", icon: "👨‍👩‍👧" },
    { id: "lover", label: "恋人", color: "#FF69B4", icon: "💕" },
    { id: "ally", label: "仲間", color: "#0AC8B9", icon: "🤝" },
    { id: "mentor", label: "師弟", color: "#C89B3C", icon: "📖" },
    { id: "rival", label: "ライバル", color: "#FF8C00", icon: "⚡" },
    { id: "enemy", label: "敵対", color: "#FF4655", icon: "⚔️" },
    { id: "organization", label: "組織", color: "#8B5CF6", icon: "🏛️" },
];

// 関係性データ（双方向：sourceとtargetの順は問わない）
export const RELATIONS: Relation[] = [
    // ── アイオニア ──
    { source: "Yasuo", target: "Yone", type: "family", label: "兄弟" },
    { source: "Yasuo", target: "Taliyah", type: "mentor", label: "師弟" },
    { source: "Yasuo", target: "Riven", type: "rival", label: "因縁" },
    { source: "Yone", target: "Ahri", type: "ally", label: "旅の仲間" },
    { source: "Shen", target: "Zed", type: "rival", label: "宿敵" },
    { source: "Shen", target: "Akali", type: "mentor", label: "元師弟" },
    { source: "Shen", target: "Kennen", type: "organization", label: "均衡の守人" },
    { source: "Zed", target: "Kayn", type: "mentor", label: "師弟" },
    { source: "Zed", target: "Jhin", type: "enemy", label: "捕縛した敵" },
    { source: "Shen", target: "Jhin", type: "enemy", label: "追跡対象" },
    { source: "Irelia", target: "Shen", type: "ally", label: "アイオニアの守護者" },
    { source: "Xayah", target: "Rakan", type: "lover", label: "恋人" },
    { source: "LeeSin", target: "Udyr", type: "ally", label: "修行仲間" },
    { source: "MasterYi", target: "MonkeyKing", type: "mentor", label: "師弟" },
    { source: "MasterYi", target: "Yasuo", type: "organization", label: "ウージュー" },
    { source: "Ahri", target: "Yasuo", type: "ally", label: "旅の仲間" },
    { source: "Lillia", target: "Ivern", type: "ally", label: "自然の友" },
    { source: "Hwei", target: "Jhin", type: "enemy", label: "追跡" },
    { source: "Sett", target: "Irelia", type: "rival", label: "対立" },
    { source: "Syndra", target: "Irelia", type: "rival", label: "対立" },
    { source: "Varus", target: "Kayn", type: "organization", label: "ダーキン" },

    // ── デマーシア ──
    { source: "Garen", target: "Lux", type: "family", label: "姉弟" },
    { source: "Garen", target: "Katarina", type: "rival", label: "因縁の敵" },
    { source: "Garen", target: "Darius", type: "enemy", label: "宿敵" },
    { source: "Garen", target: "JarvanIV", type: "ally", label: "忠誠" },
    { source: "Lux", target: "Ezreal", type: "ally", label: "知人" },
    { source: "Lux", target: "Morgana", type: "ally", label: "秘密の接触" },
    { source: "Lux", target: "Sylas", type: "rival", label: "複雑な関係" },
    { source: "Kayle", target: "Morgana", type: "family", label: "双子の姉妹" },
    { source: "Lucian", target: "Senna", type: "lover", label: "夫婦" },
    { source: "Lucian", target: "Thresh", type: "enemy", label: "復讐の対象" },
    { source: "Fiora", target: "JarvanIV", type: "organization", label: "デマーシア貴族" },
    { source: "Vayne", target: "Evelynn", type: "enemy", label: "追跡対象" },
    { source: "Shyvana", target: "JarvanIV", type: "ally", label: "忠誠・信頼" },
    { source: "Quinn", target: "Garen", type: "organization", label: "デマーシア軍" },
    { source: "XinZhao", target: "JarvanIV", type: "ally", label: "近衛兵" },
    { source: "Poppy", target: "Garen", type: "ally", label: "デマーシアの守護" },

    // ── ノクサス ──
    { source: "Darius", target: "Draven", type: "family", label: "兄弟" },
    { source: "Darius", target: "Swain", type: "organization", label: "トリファリアン" },
    { source: "Katarina", target: "Talon", type: "family", label: "義姉弟" },
    { source: "Katarina", target: "Cassiopeia", type: "family", label: "姉妹" },
    { source: "Swain", target: "Leblanc", type: "rival", label: "政治的対立" },
    { source: "Mordekaiser", target: "Sion", type: "enemy", label: "支配" },
    { source: "Riven", target: "Draven", type: "enemy", label: "闘技場" },
    { source: "Samira", target: "Darius", type: "organization", label: "ノクサス軍" },
    { source: "Rell", target: "Leblanc", type: "enemy", label: "復讐" },
    { source: "Briar", target: "Leblanc", type: "enemy", label: "黒薔薇の実験体" },
    { source: "Elise", target: "Leblanc", type: "organization", label: "黒薔薇団" },

    // ── フレヨルド ──
    { source: "Ashe", target: "Tryndamere", type: "lover", label: "政略結婚" },
    { source: "Ashe", target: "Sejuani", type: "rival", label: "対立する戦母" },
    { source: "Ashe", target: "Lissandra", type: "enemy", label: "古代からの宿敵" },
    { source: "Braum", target: "Ashe", type: "ally", label: "守護者" },
    { source: "Volibear", target: "Ornn", type: "family", label: "兄弟（半神）" },
    { source: "Volibear", target: "Anivia", type: "rival", label: "半神同士" },
    { source: "Nunu", target: "Braum", type: "ally", label: "友人" },
    { source: "Olaf", target: "Sejuani", type: "ally", label: "用心棒" },
    { source: "Gnar", target: "Anivia", type: "ally", label: "古代の存在" },
    { source: "Gragas", target: "Braum", type: "ally", label: "飲み仲間" },
    { source: "Lissandra", target: "Sejuani", type: "enemy", label: "操り" },

    // ── ピルトーヴァー＆ゾウン ──
    { source: "Caitlyn", target: "Vi", type: "ally", label: "パートナー" },
    { source: "Caitlyn", target: "Jinx", type: "enemy", label: "追跡対象" },
    { source: "Vi", target: "Jinx", type: "family", label: "姉妹" },
    { source: "Jayce", target: "Viktor", type: "rival", label: "元同僚・対立" },
    { source: "Jayce", target: "Camille", type: "organization", label: "ピルトーヴァー" },
    { source: "Ekko", target: "Jinx", type: "rival", label: "幼馴染・対立" },
    { source: "Ekko", target: "Heimerdinger", type: "mentor", label: "科学の師" },
    { source: "Warwick", target: "Singed", type: "enemy", label: "実験体と創造者" },
    { source: "Warwick", target: "Vi", type: "ally", label: "過去の縁" },
    { source: "Blitzcrank", target: "Viktor", type: "ally", label: "創造主" },
    { source: "Orianna", target: "Viktor", type: "ally", label: "技術的関係" },
    { source: "Seraphine", target: "Sona", type: "ally", label: "音楽の絆" },
    { source: "Renata", target: "Camille", type: "rival", label: "権力闘争" },
    { source: "DrMundo", target: "Ekko", type: "enemy", label: "脅威" },
    { source: "Ziggs", target: "Heimerdinger", type: "ally", label: "発明仲間" },
    { source: "Ziggs", target: "Jinx", type: "ally", label: "爆発仲間" },

    // ── シュリーマ ──
    { source: "Azir", target: "Xerath", type: "enemy", label: "裏切り" },
    { source: "Azir", target: "Nasus", type: "ally", label: "忠臣" },
    { source: "Azir", target: "Sivir", type: "family", label: "血縁（遠縁）" },
    { source: "Nasus", target: "Renekton", type: "family", label: "兄弟" },
    { source: "Renekton", target: "Xerath", type: "enemy", label: "幽閉の元凶" },
    { source: "Taliyah", target: "Azir", type: "rival", label: "故郷の複雑な想い" },
    { source: "KSante", target: "Nasus", type: "ally", label: "同郷の戦士" },

    // ── ターゴン ──
    { source: "Diana", target: "Leona", type: "rival", label: "宿命の対立" },
    { source: "Pantheon", target: "AurelionSol", type: "enemy", label: "神への反逆" },
    { source: "Aphelios", target: "Diana", type: "organization", label: "ルナリ" },
    { source: "Leona", target: "Pantheon", type: "organization", label: "ソラリ" },
    { source: "Zoe", target: "AurelionSol", type: "ally", label: "宇宙の友" },
    { source: "Taric", target: "Leona", type: "organization", label: "ターゴン" },
    { source: "Soraka", target: "Zoe", type: "rival", label: "対立する神髄" },

    // ── シャドウアイル ──
    { source: "Thresh", target: "Senna", type: "enemy", label: "捕縛・解放" },
    { source: "Thresh", target: "Viego", type: "organization", label: "シャドウアイル" },
    { source: "Viego", target: "Gwen", type: "enemy", label: "元妻の遺物" },
    { source: "Viego", target: "Kalista", type: "family", label: "親族" },
    { source: "Hecarim", target: "Kalista", type: "enemy", label: "裏切り" },
    { source: "Yorick", target: "Maokai", type: "ally", label: "浄化の同志" },
    { source: "Karthus", target: "Thresh", type: "organization", label: "不死の存在" },

    // ── ビルジウォーター ──
    { source: "Gangplank", target: "MissFortune", type: "enemy", label: "復讐" },
    { source: "Graves", target: "TwistedFate", type: "ally", label: "相棒" },
    { source: "Pyke", target: "Nautilus", type: "rival", label: "海の怨念" },
    { source: "Illaoi", target: "Gangplank", type: "rival", label: "元恋人" },
    { source: "Nilah", target: "Gangplank", type: "enemy", label: "対立" },
    { source: "TahmKench", target: "MissFortune", type: "enemy", label: "取引" },

    // ── ヴォイド ──
    { source: "Khazix", target: "Rengar", type: "rival", label: "究極のライバル" },
    { source: "Kassadin", target: "Malzahar", type: "enemy", label: "復讐" },
    { source: "Belveth", target: "Kaisa", type: "enemy", label: "ヴォイドの脅威" },
    { source: "KogMaw", target: "Malzahar", type: "organization", label: "ヴォイド" },
    { source: "RekSai", target: "Belveth", type: "rival", label: "ヴォイドの覇権" },
    { source: "Kassadin", target: "Kaisa", type: "family", label: "親子" },

    // ── イクスタル ──
    { source: "Qiyana", target: "Milio", type: "organization", label: "イクスタル" },
    { source: "Rengar", target: "Nidalee", type: "rival", label: "ジャングルの狩人" },
    { source: "Neeko", target: "Nidalee", type: "ally", label: "保護者" },

    // ── バンドルシティ ──
    { source: "Lulu", target: "Veigar", type: "rival", label: "いたずら" },
    { source: "Teemo", target: "Tristana", type: "ally", label: "仲間" },
    { source: "Rumble", target: "Tristana", type: "lover", label: "片思い" },

    // ── ルーンテラ（クロスリージョン） ──
    { source: "Aatrox", target: "Pantheon", type: "enemy", label: "神殺し" },
    { source: "Aatrox", target: "Varus", type: "organization", label: "ダーキン" },
    { source: "Aatrox", target: "Kayn", type: "organization", label: "ダーキン" },
    { source: "Aatrox", target: "Naafiri", type: "organization", label: "ダーキン" },
    { source: "Fiddlesticks", target: "Nocturne", type: "organization", label: "古の恐怖" },
    { source: "Kindred", target: "Kalista", type: "rival", label: "死の概念" },
    { source: "Ryze", target: "Brand", type: "enemy", label: "ワールドルーン" },
    { source: "Jax", target: "Kassadin", type: "ally", label: "イカシアの戦士" },
];
