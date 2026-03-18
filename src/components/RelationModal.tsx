"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { champions, Champion } from "@/data/champions";
import { RELATIONS, RELATION_TYPES, Relation } from "@/data/relations";

interface RelationModalProps {
  champId: string;
  onClose: () => void;
  onNavigate: (champId: string) => void;
}

export default function RelationModal({ champId, onClose, onNavigate }: RelationModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const champ = champions.find((c) => c.id === champId);

  useEffect(() => {
    if (!champ || !containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = "";
    
    const width = container.offsetWidth || 700;
    const height = container.offsetHeight || 500;

    let rels = RELATIONS.filter((r) => r.source === champId || r.target === champId);
    if (activeFilters.size > 0) {
      rels = rels.filter((r) => activeFilters.has(r.type));
    }

    const nodeIds = new Set([champId]);
    rels.forEach((r) => {
      nodeIds.add(r.source);
      nodeIds.add(r.target);
    });

    const nodes = Array.from(nodeIds).map((id) => {
      const c = champions.find((ch) => ch.id === id);
      return {
        id,
        name: c?.name || id,
        iconUrl: c?.iconUrl || "",
        region: c?.region || "",
        isCenter: id === champId,
        x: width / 2 + (Math.random() - 0.5) * 100, // 初期位置のばらつき
        y: height / 2 + (Math.random() - 0.5) * 100,
        fx: id === champId ? width / 2 : null, // 中心ノードは固定
        fy: id === champId ? height / 2 : null,
      } as d3.SimulationNodeDatum & { id: string; name: string; iconUrl: string; region: string; isCenter: boolean };
    });

    const links = rels.map((r) => ({
      source: r.source,
      target: r.target,
      type: r.type,
      label: r.label,
      color: RELATION_TYPES.find((t) => t.id === r.type)?.color || "#A09B8C",
    }));

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");

    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    nodes.forEach((n) => {
      defs.append("clipPath")
        .attr("id", `clip-${n.id}`)
        .append("circle")
        .attr("r", n.isCenter ? 32 : 22);
    });

    const usedColors = Array.from(new Set(links.map((l) => l.color)));
    usedColors.forEach((color) => {
      defs.append("marker")
        .attr("id", `arrow-${color.replace("#", "")}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", color)
        .attr("opacity", 0.6);
    });

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(140))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => (d.isCenter ? 45 : 35)));

    const linkGroup = svg.append("g").attr("class", "links");
    const link = linkGroup.selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.6);

    const linkLabelGroup = svg.append("g").attr("class", "link-labels");
    const linkLabel = linkLabelGroup.selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("text-anchor", "middle")
      .attr("dy", -8)
      .attr("fill", (d) => d.color)
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .attr("paint-order", "stroke")
      .attr("stroke", "#010A13")
      .attr("stroke-width", "3px")
      .text((d) => d.label);

    const nodeGroup = svg.append("g").attr("class", "nodes");
    const node = nodeGroup.selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", (d) => `node ${d.isCenter ? "node-center" : "node-related"}`)
      .style("cursor", (d) => (d.isCenter ? "default" : "pointer"))
      .on("click", (event, d) => {
        if (!d.isCenter) onNavigate(d.id);
      })
      .call(
        d3.drag<any, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            if (!d.isCenter) {
              d.fx = null;
              d.fy = null;
            }
          })
      );

    node.append("circle")
      .attr("r", (d) => (d.isCenter ? 34 : 24))
      .attr("fill", "#091428")
      .attr("stroke", (d) => (d.isCenter ? "#C89B3C" : "#1E2328"))
      .attr("stroke-width", (d) => (d.isCenter ? 3 : 2))
      .attr("filter", (d) => (d.isCenter ? "url(#glow)" : null));

    node.append("image")
      .attr("xlink:href", (d) => d.iconUrl)
      .attr("width", (d) => (d.isCenter ? 64 : 44))
      .attr("height", (d) => (d.isCenter ? 64 : 44))
      .attr("x", (d) => (d.isCenter ? -32 : -22))
      .attr("y", (d) => (d.isCenter ? -32 : -22))
      .attr("clip-path", (d) => `url(#clip-${d.id})`);

    node.append("circle")
      .attr("r", (d) => (d.isCenter ? 36 : 26))
      .attr("fill", "none")
      .attr("stroke", "#C89B3C")
      .attr("stroke-width", 2)
      .attr("opacity", 0)
      .attr("class", "hover-ring");

    node.append("text")
      .attr("dy", (d) => (d.isCenter ? 48 : 36))
      .attr("text-anchor", "middle")
      .attr("fill", (d) => (d.isCenter ? "#C89B3C" : "#F0E6D2"))
      .attr("font-size", (d) => (d.isCenter ? "14px" : "11px"))
      .attr("font-weight", (d) => (d.isCenter ? "700" : "500"))
      .attr("paint-order", "stroke")
      .attr("stroke", "#010A13")
      .attr("stroke-width", "3px")
      .text((d) => d.name);

    node.on("mouseenter", function (event, d) {
      if (!d.isCenter) d3.select(this).select(".hover-ring").attr("opacity", 1);
    }).on("mouseleave", function (event, d) {
      d3.select(this).select(".hover-ring").attr("opacity", 0);
    });

    simulation.on("tick", () => {
      nodes.forEach((d) => {
        d.x = Math.max(40, Math.min(width - 40, d.x as number));
        d.y = Math.max(40, Math.min(height - 40, d.y as number));
      });

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    if (rels.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#A09B8C")
        .attr("font-size", "16px")
        .text("関係性データがありません");
    }

    return () => {
      simulation.stop();
    };
  }, [champId, activeFilters]);

  if (!champ) return null;

  const validTypes = Array.from(
    new Set(RELATIONS.filter((r) => r.source === champId || r.target === champId).map((r) => r.type))
  );
  const availableFilters = RELATION_TYPES.filter((t) => t.id === "all" || validTypes.includes(t.id));

  const handleFilterClick = (typeId: string) => {
    if (typeId === "all") {
      setActiveFilters(new Set());
    } else {
      const newFilters = new Set(activeFilters);
      if (newFilters.has(typeId)) {
        newFilters.delete(typeId);
      } else {
        newFilters.add(typeId);
      }
      setActiveFilters(newFilters);
    }
  };

  return (
    <div className="relation-modal open">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="閉じる">✕</button>
        <div className="modal-header">
          <div className="modal-champ-info">
            <div className="modal-icon-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="modal-champ-icon" src={champ.iconUrl} alt={champ.name} />
            </div>
            <div className="modal-champ-details">
              <h2 className="modal-champ-name">{champ.name}</h2>
              <span className="modal-champ-region">{champ.region}</span>
              <a className="modal-story-link" href={champ.storyUrl} target="_blank" rel="noopener noreferrer">
                🌐 ストーリーを読む
              </a>
            </div>
          </div>
        </div>
        
        <div className="relation-filter-bar">
          {availableFilters.map((t) => (
            <button
              key={t.id}
              onClick={() => handleFilterClick(t.id)}
              className={`rel-filter-btn ${activeFilters.size === 0 && t.id === "all" ? "active" : ""} ${activeFilters.has(t.id) ? "active" : ""}`}
              style={{ "--btn-color": t.color } as any}
            >
              <span className="rel-filter-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
        
        <div className="modal-graph-wrapper">
          <div ref={containerRef} className="graph-container"></div>
          <div className="graph-hint">💡 ノードをドラッグして動かせます。別のチャンピオンをクリックすると中心が切り替わります。</div>
        </div>
      </div>
    </div>
  );
}
