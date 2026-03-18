export default function ChangeLog() {
  return (
    <section className="change-log" style={{ marginTop: "40px", padding: "20px", background: "var(--color-bg-card)", borderRadius: "8px", border: "1px solid #1E2328" }}>
      <h3 style={{ color: "var(--color-gold)", borderBottom: "1px solid #1E2328", paddingBottom: "10px", marginBottom: "15px" }}>
        📝 更新履歴
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        <li style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <span style={{ color: "var(--color-blue-accent)", fontWeight: "bold", minWidth: "80px" }}>2026.03.18</span>
          <div>
            <strong>Next.js 移行完了 & 新機能デプロイ</strong>
            <p style={{ margin: "4px 0 0", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              ・アーキテクチャを Next.js (App Router) に刷新。<br />
              ・GitHub Discussions連携を廃止し、Supabaseによるログイン不要のリアルタイム掲示板を新規実装。<br />
              ・ヴェル＝コズ (Vel&apos;Koz) などのキャラ画像が表示されない不具合を完全修正（IDサニタイズ処理導入）。
            </p>
          </div>
        </li>
        <li style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <span style={{ color: "var(--color-blue-accent)", fontWeight: "bold", minWidth: "80px" }}>2026.03.15</span>
          <div>
            <strong>相関図機能(β)追加 ＆ 検索UI実装</strong>
            <p style={{ margin: "4px 0 0", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              ・D3.jsを用いた力学モデルによるキャラクター相関図をモーダル表示。
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
