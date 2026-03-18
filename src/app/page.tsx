"use client";

import { useState, useMemo, useEffect } from "react";
import { champions, REGIONS, Champion } from "@/data/champions";
import ChampionCard from "@/components/ChampionCard";
import RelationModal from "@/components/RelationModal";
import Comments from "@/components/Comments";
import ChangeLog from "@/components/ChangeLog";

export default function HomePage() {
  const [activeRegion, setActiveRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChampId, setSelectedChampId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 五十音順ソート関数
  const sortByJapanese = (a: Champion, b: Champion) => a.name.localeCompare(b.name, "ja");

  const filteredChampions = useMemo(() => {
    let filtered = [...champions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      );
    }
    if (activeRegion !== "all") {
      filtered = filtered.filter((c) => c.region === activeRegion);
    }
    return filtered;
  }, [searchQuery, activeRegion]);

  const renderContent = () => {
    if (filteredChampions.length === 0) {
      return (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <div className="no-results-text">チャンピオンが見つかりませんでした</div>
          <div className="no-results-hint">別のキーワードや地域で検索してみてください</div>
        </div>
      );
    }

    if (activeRegion === "all" && !searchQuery) {
      // 地域ごとにグループ化
      const groups: Record<string, Champion[]> = {};
      filteredChampions.forEach((c) => {
        if (!groups[c.region]) groups[c.region] = [];
        groups[c.region].push(c);
      });

      return REGIONS.filter((r) => r.id !== "all" && groups[r.id]).map((region, idx) => {
        const sorted = groups[region.id].sort(sortByJapanese);
        return (
          <section key={region.id} className="region-section" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="region-header">
              <span className="region-header-icon">{region.icon}</span>
              <h2 className="region-header-title">
                {region.name} <span className="region-header-count">({sorted.length})</span>
              </h2>
              <div className="region-header-line"></div>
            </div>
            <div className="champion-grid">
              {sorted.map((c) => (
                <ChampionCard key={c.id} champ={c} onClick={setSelectedChampId} />
              ))}
            </div>
          </section>
        );
      });
    }

    // 検索時または特定地域選択時はフラットに表示
    const sorted = [...filteredChampions].sort(sortByJapanese);
    const title = activeRegion !== "all" ? REGIONS.find((r) => r.id === activeRegion) : null;

    return (
      <section className="region-section" style={{ animationDelay: "0s" }}>
        <div className="region-header">
          <span className="region-header-icon">{searchQuery ? "🔍" : title?.icon}</span>
          <h2 className="region-header-title">
            {searchQuery ? "検索結果" : title?.name} <span className="region-header-count">({sorted.length})</span>
          </h2>
          <div className="region-header-line"></div>
        </div>
        <div className="champion-grid">
          {sorted.map((c) => (
            <ChampionCard key={c.id} champ={c} onClick={setSelectedChampId} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">⚔️</div>
            <div className="logo-text">
              <span className="logo-title">Universe Navigator</span>
              <span className="logo-subtitle">League of Legends</span>
            </div>
          </div>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="チャンピオン名を検索..."
            />
            {searchQuery && (
              <button className="search-clear visible" onClick={() => setSearchQuery("")}>✕</button>
            )}
          </div>
          <div className="stats-bar">
            <span className="stats-badge">{filteredChampions.length} Champions</span>
          </div>
        </div>
      </header>

      {/* Region Navigation */}
      <nav className="region-nav">
        <div className="region-nav-inner">
          {REGIONS.map((r) => {
            const count = r.id === "all" ? champions.length : champions.filter((c) => c.region === r.id).length;
            if (r.id !== "all" && count === 0) return null;
            return (
              <button
                key={r.id}
                className={`region-btn ${r.id === activeRegion ? "active" : ""}`}
                onClick={() => setActiveRegion(r.id)}
              >
                <span className="region-btn-icon">{r.icon}</span>
                <span>{r.name}</span>
                <span className="region-btn-count">{count}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Free Ad Slot (Ninja AdMax placeholder) */}
      <div className="ad-slot-wrapper">
        <div className="ad-slot">
          <span className="ad-label">スポンサーリンク</span>
          <div className="ad-content">
            <div className="ad-placeholder">広告枠（無料広告サービス設定用に準備中）</div>
          </div>
        </div>
      </div>

      <div className="main-layout">
        {/* Main Content */}
        <main className="main-content">
          <div id="championsContainer">{renderContent()}</div>
          <ChangeLog />
        </main>

        {/* Comment Sidebar (PC) / Drawer (Mobile) */}
        <aside className={`comment-sidebar ${isDrawerOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3 className="sidebar-title">💬 掲示板</h3>
          </div>
          <div className="giscus-container">
            <Comments />
          </div>
        </aside>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="comment-drawer-overlay open" onClick={() => setIsDrawerOpen(false)}></div>
      )}
      <button className="comment-drawer-toggle" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        💬
      </button>

      {/* Footer */}
      <footer className="footer">
        <p>
          LoL Universe Navigator — 公式情報は{" "}
          <a href="https://universe.leagueoflegends.com/ja_JP/" target="_blank" rel="noopener noreferrer">
            League of Legends Universe
          </a>{" "}
          をご覧ください。
        </p>
        <p style={{ marginTop: "4px", opacity: 0.6 }}>
          本サイトは個人利用を目的としたファンツールです。Riot Games とは直接的な関係はありません。
        </p>
      </footer>

      {/* Relation Modal */}
      {selectedChampId && (
        <RelationModal
          champId={selectedChampId}
          onClose={() => setSelectedChampId(null)}
          onNavigate={setSelectedChampId}
        />
      )}
    </>
  );
}
