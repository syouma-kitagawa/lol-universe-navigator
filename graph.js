// =============================================
//  LoL Universe Navigator - Relation Graph
//  D3.js Force Graph による相関図描画
// =============================================

(function () {
    'use strict';

    // ── State ──
    let currentChampId = null;
    let activeFilterTypes = new Set(); // empty = show all
    let simulation = null;

    // ── DOM refs (created in openRelationModal) ──
    const modal = document.getElementById('relationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalChampIcon = document.getElementById('modalChampIcon');
    const modalChampName = document.getElementById('modalChampName');
    const modalChampRegion = document.getElementById('modalChampRegion');
    const modalStoryLink = document.getElementById('modalStoryLink');
    const graphContainer = document.getElementById('graphContainer');
    const filterBar = document.getElementById('relationFilterBar');

    // ── Helpers ──

    function getChampById(id) {
        return champions.find(c => c.id === id);
    }

    function getRelationsForChamp(champId) {
        return RELATIONS.filter(r => r.source === champId || r.target === champId);
    }

    function getRelatedChampIds(champId) {
        const rels = getRelationsForChamp(champId);
        const ids = new Set();
        rels.forEach(r => {
            ids.add(r.source === champId ? r.target : r.source);
        });
        return ids;
    }

    // ── Modal Open/Close ──

    window.openRelationModal = function (champId) {
        const champ = getChampById(champId);
        if (!champ) return;

        currentChampId = champId;
        activeFilterTypes.clear();

        // Update modal header
        modalChampIcon.src = champ.iconUrl;
        modalChampIcon.alt = champ.name;
        modalChampName.textContent = champ.name;
        modalChampRegion.textContent = champ.region;
        modalStoryLink.href = champ.storyUrl;

        // Show modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Render filter bar
        renderFilterBar(champId);

        // Render graph
        setTimeout(() => renderForceGraph(champId), 50);
    };

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (simulation) {
            simulation.stop();
            simulation = null;
        }
        graphContainer.innerHTML = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // ── Filter Bar ──

    function renderFilterBar(champId) {
        const rels = getRelationsForChamp(champId);
        const usedTypes = new Set(rels.map(r => r.type));

        filterBar.innerHTML = RELATION_TYPES
            .filter(t => t.id === 'all' || usedTypes.has(t.id))
            .map(t => `
        <button
          class="rel-filter-btn ${t.id === 'all' ? 'active' : ''}"
          data-type="${t.id}"
          style="--btn-color: ${t.color}"
        >
          <span class="rel-filter-icon">${t.icon}</span>
          <span>${t.label}</span>
        </button>
      `).join('');

        filterBar.querySelectorAll('.rel-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                if (type === 'all') {
                    activeFilterTypes.clear();
                    filterBar.querySelectorAll('.rel-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                } else {
                    filterBar.querySelector('[data-type="all"]').classList.remove('active');
                    btn.classList.toggle('active');
                    if (btn.classList.contains('active')) {
                        activeFilterTypes.add(type);
                    } else {
                        activeFilterTypes.delete(type);
                    }
                    if (activeFilterTypes.size === 0) {
                        filterBar.querySelector('[data-type="all"]').classList.add('active');
                    }
                }
                renderForceGraph(currentChampId);
            });
        });
    }

    // ── D3.js Force Graph ──

    function renderForceGraph(champId) {
        graphContainer.innerHTML = '';
        if (simulation) simulation.stop();

        const containerRect = graphContainer.getBoundingClientRect();
        const width = containerRect.width || 700;
        const height = containerRect.height || 500;

        // Get filtered relations
        let rels = getRelationsForChamp(champId);
        if (activeFilterTypes.size > 0) {
            rels = rels.filter(r => activeFilterTypes.has(r.type));
        }

        // Build nodes & links
        const nodeIds = new Set([champId]);
        rels.forEach(r => {
            nodeIds.add(r.source);
            nodeIds.add(r.target);
        });

        const nodes = Array.from(nodeIds).map(id => {
            const c = getChampById(id);
            return {
                id,
                name: c ? c.name : id,
                iconUrl: c ? c.iconUrl : '',
                region: c ? c.region : '',
                isCenter: id === champId
            };
        });

        const links = rels.map(r => ({
            source: r.source,
            target: r.target,
            type: r.type,
            label: r.label,
            color: (RELATION_TYPES.find(t => t.id === r.type) || {}).color || '#A09B8C'
        }));

        // SVG
        const svg = d3.select(graphContainer)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);

        // Defs - clip paths and glow
        const defs = svg.append('defs');

        // Glow filter
        const filter = defs.append('filter').attr('id', 'glow');
        filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        // Clip paths for each node
        nodes.forEach(n => {
            defs.append('clipPath')
                .attr('id', `clip-${n.id}`)
                .append('circle')
                .attr('r', n.isCenter ? 32 : 22);
        });

        // Arrow markers
        const usedColors = [...new Set(links.map(l => l.color))];
        usedColors.forEach(color => {
            defs.append('marker')
                .attr('id', `arrow-${color.replace('#', '')}`)
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 30)
                .attr('refY', 0)
                .attr('markerWidth', 6)
                .attr('markerHeight', 6)
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', color)
                .attr('opacity', 0.6);
        });

        // Simulation
        simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(140))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => d.isCenter ? 45 : 35));

        // Links
        const linkGroup = svg.append('g').attr('class', 'links');
        const link = linkGroup.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', d => d.color)
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.6);

        // Link labels
        const linkLabelGroup = svg.append('g').attr('class', 'link-labels');
        const linkLabel = linkLabelGroup.selectAll('text')
            .data(links)
            .enter()
            .append('text')
            .attr('class', 'link-label')
            .attr('text-anchor', 'middle')
            .attr('dy', -8)
            .attr('fill', d => d.color)
            .attr('font-size', '11px')
            .attr('font-family', "'Noto Sans JP', sans-serif")
            .attr('font-weight', '500')
            .attr('paint-order', 'stroke')
            .attr('stroke', '#010A13')
            .attr('stroke-width', '3px')
            .text(d => d.label);

        // Node groups
        const nodeGroup = svg.append('g').attr('class', 'nodes');
        const node = nodeGroup.selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', d => `node ${d.isCenter ? 'node-center' : 'node-related'}`)
            .style('cursor', d => d.isCenter ? 'default' : 'pointer')
            .on('click', (event, d) => {
                if (!d.isCenter) {
                    openRelationModal(d.id);
                }
            })
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Node circle background
        node.append('circle')
            .attr('r', d => d.isCenter ? 34 : 24)
            .attr('fill', '#091428')
            .attr('stroke', d => d.isCenter ? '#C89B3C' : '#1E2328')
            .attr('stroke-width', d => d.isCenter ? 3 : 2)
            .attr('filter', d => d.isCenter ? 'url(#glow)' : null);

        // Node images
        node.append('image')
            .attr('xlink:href', d => d.iconUrl)
            .attr('width', d => d.isCenter ? 64 : 44)
            .attr('height', d => d.isCenter ? 64 : 44)
            .attr('x', d => d.isCenter ? -32 : -22)
            .attr('y', d => d.isCenter ? -32 : -22)
            .attr('clip-path', d => `url(#clip-${d.id})`);

        // Node hover ring
        node.append('circle')
            .attr('r', d => d.isCenter ? 36 : 26)
            .attr('fill', 'none')
            .attr('stroke', '#C89B3C')
            .attr('stroke-width', 2)
            .attr('opacity', 0)
            .attr('class', 'hover-ring');

        // Node labels
        node.append('text')
            .attr('dy', d => d.isCenter ? 48 : 36)
            .attr('text-anchor', 'middle')
            .attr('fill', d => d.isCenter ? '#C89B3C' : '#F0E6D2')
            .attr('font-size', d => d.isCenter ? '14px' : '11px')
            .attr('font-weight', d => d.isCenter ? '700' : '500')
            .attr('font-family', "'Noto Sans JP', sans-serif")
            .attr('paint-order', 'stroke')
            .attr('stroke', '#010A13')
            .attr('stroke-width', '3px')
            .text(d => d.name);

        // Hover effects
        node.on('mouseenter', function (event, d) {
            if (!d.isCenter) {
                d3.select(this).select('.hover-ring').attr('opacity', 1);
            }
        }).on('mouseleave', function (event, d) {
            d3.select(this).select('.hover-ring').attr('opacity', 0);
        });

        // Tick
        simulation.on('tick', () => {
            // Keep nodes within bounds
            nodes.forEach(d => {
                d.x = Math.max(40, Math.min(width - 40, d.x));
                d.y = Math.max(40, Math.min(height - 40, d.y));
            });

            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            linkLabel
                .attr('x', d => (d.source.x + d.target.x) / 2)
                .attr('y', d => (d.source.y + d.target.y) / 2);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // No relations message
        if (rels.length === 0) {
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height / 2)
                .attr('text-anchor', 'middle')
                .attr('fill', '#A09B8C')
                .attr('font-size', '16px')
                .attr('font-family', "'Noto Sans JP', sans-serif")
                .text('関係性データがありません');
        }
    }

})();
