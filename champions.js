// LoL チャンピオンデータ
// Data Dragon v14.4.1 + 公式ユニバース情報ベース
// 新チャンピオン追加時はこの配列にオブジェクトを追加するだけでOK

const DDRAGON_VERSION = "14.4.1";
const DDRAGON_CDN = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

const champions = [
  // ── アイオニア ──
  { id: "Ahri", name: "アーリ", region: "アイオニア" },
  { id: "Akali", name: "アカリ", region: "アイオニア" },
  { id: "Irelia", name: "イレリア", region: "アイオニア" },
  { id: "Ivern", name: "アイバーン", region: "アイオニア" },
  { id: "Jhin", name: "ジン", region: "アイオニア" },
  { id: "Karma", name: "カルマ", region: "アイオニア" },
  { id: "Kayn", name: "ケイン", region: "アイオニア" },
  { id: "Kennen", name: "ケネン", region: "アイオニア" },
  { id: "LeeSin", name: "リー・シン", region: "アイオニア" },
  { id: "Lillia", name: "リリア", region: "アイオニア" },
  { id: "MasterYi", name: "マスター・イー", region: "アイオニア" },
  { id: "MonkeyKing", name: "ウーコン", region: "アイオニア" },
  { id: "Rakan", name: "ラカン", region: "アイオニア" },
  { id: "Sett", name: "セト", region: "アイオニア" },
  { id: "Shen", name: "シェン", region: "アイオニア" },
  { id: "Syndra", name: "シンドラ", region: "アイオニア" },
  { id: "Varus", name: "ヴァルス", region: "アイオニア" },
  { id: "Xayah", name: "ザヤ", region: "アイオニア" },
  { id: "Yasuo", name: "ヤスオ", region: "アイオニア" },
  { id: "Yone", name: "ヨネ", region: "アイオニア" },
  { id: "Zed", name: "ゼド", region: "アイオニア" },
  { id: "Hwei", name: "フェイ", region: "アイオニア" },

  // ── デマーシア ──
  { id: "Fiora", name: "フィオラ", region: "デマーシア" },
  { id: "Galio", name: "ガリオ", region: "デマーシア" },
  { id: "Garen", name: "ガレン", region: "デマーシア" },
  { id: "JarvanIV", name: "ジャーヴァンⅣ", region: "デマーシア" },
  { id: "Kayle", name: "ケイル", region: "デマーシア" },
  { id: "Lucian", name: "ルシアン", region: "デマーシア" },
  { id: "Lux", name: "ラックス", region: "デマーシア" },
  { id: "Morgana", name: "モルガナ", region: "デマーシア" },
  { id: "Poppy", name: "ポッピー", region: "デマーシア" },
  { id: "Quinn", name: "クイン", region: "デマーシア" },
  { id: "Senna", name: "セナ", region: "デマーシア" },
  { id: "Shyvana", name: "シヴァーナ", region: "デマーシア" },
  { id: "Sona", name: "ソナ", region: "デマーシア" },
  { id: "Vayne", name: "ヴェイン", region: "デマーシア" },
  { id: "XinZhao", name: "シン・ジャオ", region: "デマーシア" },

  // ── ノクサス ──
  { id: "Darius", name: "ダリウス", region: "ノクサス" },
  { id: "Draven", name: "ドレイヴン", region: "ノクサス" },
  { id: "Elise", name: "エリス", region: "ノクサス" },
  { id: "Katarina", name: "カタリナ", region: "ノクサス" },
  { id: "Kled", name: "クレッド", region: "ノクサス" },
  { id: "Leblanc", name: "ルブラン", region: "ノクサス" },
  { id: "Mordekaiser", name: "モルデカイザー", region: "ノクサス" },
  { id: "Rell", name: "レル", region: "ノクサス" },
  { id: "Riven", name: "リヴェン", region: "ノクサス" },
  { id: "Samira", name: "サミーラ", region: "ノクサス" },
  { id: "Sion", name: "サイオン", region: "ノクサス" },
  { id: "Swain", name: "スウェイン", region: "ノクサス" },
  { id: "Talon", name: "タロン", region: "ノクサス" },
  { id: "Briar", name: "ブライアー", region: "ノクサス" },
  { id: "Cassiopeia", name: "カシオペア", region: "ノクサス" },
  { id: "Annie", name: "アニー", region: "ノクサス" },
  { id: "Smolder", name: "スモルダー", region: "ノクサス" },

  // ── フレヨルド ──
  { id: "Anivia", name: "アニビア", region: "フレヨルド" },
  { id: "Ashe", name: "アッシュ", region: "フレヨルド" },
  { id: "Braum", name: "ブラウム", region: "フレヨルド" },
  { id: "Gnar", name: "ナー", region: "フレヨルド" },
  { id: "Gragas", name: "グラガス", region: "フレヨルド" },
  { id: "Lissandra", name: "リサンドラ", region: "フレヨルド" },
  { id: "Nunu", name: "ヌヌ＆ウィルンプ", region: "フレヨルド" },
  { id: "Olaf", name: "オラフ", region: "フレヨルド" },
  { id: "Ornn", name: "オーン", region: "フレヨルド" },
  { id: "Sejuani", name: "セジュアニ", region: "フレヨルド" },
  { id: "Trundle", name: "トランドル", region: "フレヨルド" },
  { id: "Tryndamere", name: "トリンダメア", region: "フレヨルド" },
  { id: "Udyr", name: "ウディア", region: "フレヨルド" },
  { id: "Volibear", name: "ボリベア", region: "フレヨルド" },

  // ── ピルトーヴァー ──
  { id: "Caitlyn", name: "ケイトリン", region: "ピルトーヴァー" },
  { id: "Camille", name: "カミール", region: "ピルトーヴァー" },
  { id: "Corki", name: "コーキ", region: "ピルトーヴァー" },
  { id: "Ezreal", name: "エズリアル", region: "ピルトーヴァー" },
  { id: "Heimerdinger", name: "ハイマーディンガー", region: "ピルトーヴァー" },
  { id: "Jayce", name: "ジェイス", region: "ピルトーヴァー" },
  { id: "Orianna", name: "オリアナ", region: "ピルトーヴァー" },
  { id: "Seraphine", name: "セラフィーン", region: "ピルトーヴァー" },
  { id: "Vi", name: "ヴァイ", region: "ピルトーヴァー" },

  // ── ゾウン ──
  { id: "Blitzcrank", name: "ブリッツクランク", region: "ゾウン" },
  { id: "DrMundo", name: "ドクター・ムンド", region: "ゾウン" },
  { id: "Ekko", name: "エコー", region: "ゾウン" },
  { id: "Janna", name: "ジャンナ", region: "ゾウン" },
  { id: "Jinx", name: "ジンクス", region: "ゾウン" },
  { id: "Renata", name: "レナータ・グラスク", region: "ゾウン" },
  { id: "Singed", name: "シンジド", region: "ゾウン" },
  { id: "Twitch", name: "トゥイッチ", region: "ゾウン" },
  { id: "Urgot", name: "アーゴット", region: "ゾウン" },
  { id: "Viktor", name: "ビクター", region: "ゾウン" },
  { id: "Warwick", name: "ワーウィック", region: "ゾウン" },
  { id: "Zac", name: "ザック", region: "ゾウン" },
  { id: "Ziggs", name: "ジグス", region: "ゾウン" },

  // ── シュリーマ ──
  { id: "Akshan", name: "アクシャン", region: "シュリーマ" },
  { id: "Amumu", name: "アムム", region: "シュリーマ" },
  { id: "Azir", name: "アジール", region: "シュリーマ" },
  { id: "KSante", name: "カ・サンテ", region: "シュリーマ" },
  { id: "Naafiri", name: "ナフィーリ", region: "シュリーマ" },
  { id: "Nasus", name: "ナサス", region: "シュリーマ" },
  { id: "Rammus", name: "ラムス", region: "シュリーマ" },
  { id: "Renekton", name: "レネクトン", region: "シュリーマ" },
  { id: "Sivir", name: "シヴィア", region: "シュリーマ" },
  { id: "Skarner", name: "スカーナー", region: "シュリーマ" },
  { id: "Taliyah", name: "タリヤ", region: "シュリーマ" },
  { id: "Xerath", name: "ゼラス", region: "シュリーマ" },

  // ── ターゴン ──
  { id: "Aphelios", name: "アフェリオス", region: "ターゴン" },
  { id: "AurelionSol", name: "オレリオン・ソル", region: "ターゴン" },
  { id: "Diana", name: "ダイアナ", region: "ターゴン" },
  { id: "Leona", name: "レオナ", region: "ターゴン" },
  { id: "Pantheon", name: "パンテオン", region: "ターゴン" },
  { id: "Soraka", name: "ソラカ", region: "ターゴン" },
  { id: "Taric", name: "タリック", region: "ターゴン" },
  { id: "Zoe", name: "ゾーイ", region: "ターゴン" },

  // ── シャドウアイル ──
  { id: "Gwen", name: "グウェン", region: "シャドウアイル" },
  { id: "Hecarim", name: "ヘカリム", region: "シャドウアイル" },
  { id: "Kalista", name: "カリスタ", region: "シャドウアイル" },
  { id: "Karthus", name: "カーサス", region: "シャドウアイル" },
  { id: "Maokai", name: "マオカイ", region: "シャドウアイル" },
  { id: "Thresh", name: "スレッシュ", region: "シャドウアイル" },
  { id: "Viego", name: "ヴィエゴ", region: "シャドウアイル" },
  { id: "Yorick", name: "ヨリック", region: "シャドウアイル" },

  // ── ビルジウォーター ──
  { id: "Fizz", name: "フィズ", region: "ビルジウォーター" },
  { id: "Gangplank", name: "ガングプランク", region: "ビルジウォーター" },
  { id: "Graves", name: "グレイブス", region: "ビルジウォーター" },
  { id: "Illaoi", name: "イラオイ", region: "ビルジウォーター" },
  { id: "MissFortune", name: "ミス・フォーチュン", region: "ビルジウォーター" },
  { id: "Nautilus", name: "ノーチラス", region: "ビルジウォーター" },
  { id: "Nilah", name: "ニーラ", region: "ビルジウォーター" },
  { id: "Pyke", name: "パイク", region: "ビルジウォーター" },
  { id: "TahmKench", name: "タム・ケンチ", region: "ビルジウォーター" },
  { id: "TwistedFate", name: "ツイステッド・フェイト", region: "ビルジウォーター" },

  // ── ヴォイド ──
  { id: "Belveth", name: "ベル＝ヴェス", region: "ヴォイド" },
  { id: "Chogath", name: "チョ＝ガス", region: "ヴォイド" },
  { id: "Kassadin", name: "カサディン", region: "ヴォイド" },
  { id: "Khazix", name: "カ＝ジックス", region: "ヴォイド" },
  { id: "KogMaw", name: "コグ＝マウ", region: "ヴォイド" },
  { id: "Malzahar", name: "マルザハール", region: "ヴォイド" },
  { id: "RekSai", name: "レク＝サイ", region: "ヴォイド" },
  { id: "Velkoz", name: "ヴェル＝コズ", region: "ヴォイド" },

  // ── イクスタル ──
  { id: "Malphite", name: "マルファイト", region: "イクスタル" },
  { id: "Milio", name: "ミリオ", region: "イクスタル" },
  { id: "Neeko", name: "ニーコ", region: "イクスタル" },
  { id: "Nidalee", name: "ニダリー", region: "イクスタル" },
  { id: "Qiyana", name: "キヤナ", region: "イクスタル" },
  { id: "Rengar", name: "レンガー", region: "イクスタル" },
  { id: "Zyra", name: "ザイラ", region: "イクスタル" },

  // ── バンドルシティ ──
  { id: "Lulu", name: "ルル", region: "バンドルシティ" },
  { id: "Rumble", name: "ランブル", region: "バンドルシティ" },
  { id: "Teemo", name: "ティーモ", region: "バンドルシティ" },
  { id: "Tristana", name: "トリスターナ", region: "バンドルシティ" },
  { id: "Veigar", name: "ベイガー", region: "バンドルシティ" },
  { id: "Yuumi", name: "ユーミ", region: "バンドルシティ" },

  // ── ルーンテラ（特定地域なし） ──
  { id: "Aatrox", name: "エイトロックス", region: "ルーンテラ" },
  { id: "Bard", name: "バード", region: "ルーンテラ" },
  { id: "Brand", name: "ブランド", region: "ルーンテラ" },
  { id: "Evelynn", name: "イブリン", region: "ルーンテラ" },
  { id: "Fiddlesticks", name: "フィドルスティックス", region: "ルーンテラ" },
  { id: "Jax", name: "ジャックス", region: "ルーンテラ" },
  { id: "Kaisa", name: "カイ＝サ", region: "ルーンテラ" },
  { id: "Kindred", name: "キンドレッド", region: "ルーンテラ" },
  { id: "Nocturne", name: "ノクターン", region: "ルーンテラ" },
  { id: "Nami", name: "ナミ", region: "ルーンテラ" },
  { id: "Ryze", name: "ライズ", region: "ルーンテラ" },
  { id: "Shaco", name: "シャコ", region: "ルーンテラ" },
  { id: "Alistar", name: "アリスター", region: "ルーンテラ" },
].map(c => {
  // Vel'Koz等の特殊文字をIDから安全除去
  const safeId = c.id.replace(/'/g, '');
  return {
    ...c,
    id: safeId,
    iconUrl: `${DDRAGON_CDN}/img/champion/${safeId}.png`,
    storyUrl: `https://universe.leagueoflegends.com/ja_JP/story/champion/${safeId.toLowerCase()}/`
  };
});

// 地域リスト（表示順）
const REGIONS = [
  { id: "all", name: "すべて", icon: "🌍" },
  { id: "アイオニア", name: "アイオニア", icon: "🌸" },
  { id: "デマーシア", name: "デマーシア", icon: "⚜️" },
  { id: "ノクサス", name: "ノクサス", icon: "🗡️" },
  { id: "フレヨルド", name: "フレヨルド", icon: "❄️" },
  { id: "ピルトーヴァー", name: "ピルトーヴァー", icon: "⚙️" },
  { id: "ゾウン", name: "ゾウン", icon: "☣️" },
  { id: "シュリーマ", name: "シュリーマ", icon: "☀️" },
  { id: "ターゴン", name: "ターゴン", icon: "⭐" },
  { id: "シャドウアイル", name: "シャドウアイル", icon: "👻" },
  { id: "ビルジウォーター", name: "ビルジウォーター", icon: "⚓" },
  { id: "ヴォイド", name: "ヴォイド", icon: "🕳️" },
  { id: "イクスタル", name: "イクスタル", icon: "🌿" },
  { id: "バンドルシティ", name: "バンドルシティ", icon: "🍄" },
  { id: "ルーンテラ", name: "ルーンテラ", icon: "🗺️" },
];
