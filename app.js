// =============================================
//  LoL Universe Navigator - Application Logic
// =============================================

(function () {
    'use strict';

    // ── DOM Elements ──
    const regionNavEl = document.getElementById('regionNav');
    const containerEl = document.getElementById('championsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const champCountEl = document.getElementById('champCount');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // ── State ──
    let activeRegion = 'all';

    // ── Utilities ──

    /** 五十音順ソート */
    function sortByJapanese(a, b) {
        return a.name.localeCompare(b.name, 'ja');
    }

    /** 地域ごとにグループ化 */
    function groupByRegion(champs) {
        const groups = {};
        champs.forEach(c => {
            if (!groups[c.region]) groups[c.region] = [];
            groups[c.region].push(c);
        });
        // 各地域内で五十音順に
        Object.values(groups).forEach(arr => arr.sort(sortByJapanese));
        return groups;
    }

    /** 地域の表示順に並べて返す */
    function getOrderedRegions(groups) {
        return REGIONS
            .filter(r => r.id !== 'all' && groups[r.id])
            .map(r => ({ ...r, champions: groups[r.id] }));
    }

    // ── Region Navigation ──

    function renderRegionNav() {
        const grouped = groupByRegion(champions);

        regionNavEl.innerHTML = REGIONS.map(r => {
            const count = r.id === 'all'
                ? champions.length
                : (grouped[r.id] ? grouped[r.id].length : 0);
            if (r.id !== 'all' && count === 0) return '';

            return `
        <button
          class="region-btn ${r.id === activeRegion ? 'active' : ''}"
          data-region="${r.id}"
        >
          <span class="region-btn-icon">${r.icon}</span>
          <span>${r.name}</span>
          <span class="region-btn-count">${count}</span>
        </button>
      `;
        }).join('');

        // Event listeners
        regionNavEl.querySelectorAll('.region-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeRegion = btn.dataset.region;
                updateActiveRegionBtn();
                renderChampions();
            });
        });
    }

    function updateActiveRegionBtn() {
        regionNavEl.querySelectorAll('.region-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.region === activeRegion);
        });
    }

    // ── Champion Rendering ──

    function createChampionCard(champ) {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.title = `${champ.name} の相関図を表示`;
        card.addEventListener('click', () => {
            if (typeof openRelationModal === 'function') {
                openRelationModal(champ.id);
            } else {
                window.open(champ.storyUrl, '_blank');
            }
        });

        card.innerHTML = `
      <span class="external-icon">🔗</span>
      <div class="champion-icon-wrapper">
        <img
          class="champion-icon"
          src="${champ.iconUrl}"
          alt="${champ.name}"
          loading="lazy"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23091428%22 width=%22100%22 height=%22100%22/><text y=%22.65em%22 x=%2250%22 text-anchor=%22middle%22 font-size=%2240%22 fill=%22%23C89B3C%22>?</text></svg>'"
        >
      </div>
      <span class="champion-name">${champ.name}</span>
    `;

        return card;
    }


    function renderChampions() {
        const query = searchInput.value.trim().toLowerCase();
        let filtered = champions;

        // 検索フィルタ
        if (query) {
            filtered = champions.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.id.toLowerCase().includes(query) ||
                c.region.toLowerCase().includes(query)
            );
        }

        // 地域フィルタ
        if (activeRegion !== 'all') {
            filtered = filtered.filter(c => c.region === activeRegion);
        }

        // 表示数を更新
        champCountEl.textContent = `${filtered.length} Champions`;

        // 結果なし
        if (filtered.length === 0) {
            containerEl.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">チャンピオンが見つかりませんでした</div>
          <div class="no-results-hint">別のキーワードや地域で検索してみてください</div>
        </div>
      `;
            return;
        }

        // 地域別 or 全体
        if (activeRegion === 'all' && !query) {
            // 地域別にグループ表示
            const grouped = groupByRegion(filtered);
            const ordered = getOrderedRegions(grouped);

            containerEl.innerHTML = '';
            ordered.forEach((region, index) => {
                const section = document.createElement('section');
                section.className = 'region-section';
                section.id = `region-${region.id}`;
                section.style.animationDelay = `${index * 0.05}s`;

                const header = document.createElement('div');
                header.className = 'region-header';
                header.innerHTML = `
          <span class="region-header-icon">${region.icon}</span>
          <h2 class="region-header-title">
            ${region.name}
            <span class="region-header-count">(${region.champions.length})</span>
          </h2>
          <div class="region-header-line"></div>
        `;

                const grid = document.createElement('div');
                grid.className = 'champion-grid';
                region.champions.forEach(champ => {
                    grid.appendChild(createChampionCard(champ));
                });

                section.appendChild(header);
                section.appendChild(grid);
                containerEl.appendChild(section);
            });
        } else {
            // 検索結果 or 特定地域：フラットにソートして表示
            filtered.sort(sortByJapanese);

            const title = activeRegion !== 'all'
                ? REGIONS.find(r => r.id === activeRegion)
                : null;

            containerEl.innerHTML = '';

            if (title && !query) {
                const section = document.createElement('section');
                section.className = 'region-section';
                section.style.animationDelay = '0s';

                const header = document.createElement('div');
                header.className = 'region-header';
                header.innerHTML = `
          <span class="region-header-icon">${title.icon}</span>
          <h2 class="region-header-title">
            ${title.name}
            <span class="region-header-count">(${filtered.length})</span>
          </h2>
          <div class="region-header-line"></div>
        `;

                const grid = document.createElement('div');
                grid.className = 'champion-grid';
                filtered.forEach(champ => grid.appendChild(createChampionCard(champ)));

                section.appendChild(header);
                section.appendChild(grid);
                containerEl.appendChild(section);
            } else {
                // 検索結果
                const section = document.createElement('section');
                section.className = 'region-section';
                section.style.animationDelay = '0s';

                const header = document.createElement('div');
                header.className = 'region-header';
                header.innerHTML = `
          <span class="region-header-icon">🔍</span>
          <h2 class="region-header-title">
            検索結果
            <span class="region-header-count">(${filtered.length})</span>
          </h2>
          <div class="region-header-line"></div>
        `;

                const grid = document.createElement('div');
                grid.className = 'champion-grid';
                filtered.forEach(champ => grid.appendChild(createChampionCard(champ)));

                section.appendChild(header);
                section.appendChild(grid);
                containerEl.appendChild(section);
            }
        }
    }

    // ── Search ──

    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchClear.classList.toggle('visible', searchInput.value.length > 0);
        searchTimeout = setTimeout(() => {
            renderChampions();
        }, 200);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.remove('visible');
        renderChampions();
        searchInput.focus();
    });

    // ── Scroll to Top ──

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Comment Drawer (Mobile) ──

    const commentSidebar = document.getElementById('commentSidebar');
    const drawerToggle = document.getElementById('commentDrawerToggle');
    const drawerOverlay = document.getElementById('commentDrawerOverlay');

    function openDrawer() {
        if (commentSidebar) commentSidebar.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (commentSidebar) commentSidebar.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (drawerToggle) {
        drawerToggle.addEventListener('click', () => {
            if (commentSidebar && commentSidebar.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && commentSidebar && commentSidebar.classList.contains('open')) {
            closeDrawer();
        }
    });

    // ── Init ──

    function init() {
        renderRegionNav();
        renderChampions();
    }

    // ページ読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
