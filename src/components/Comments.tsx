"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Comment = {
  id: number;
  name: string;
  content: string;
  created_at: string;
};

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    
    // リアルタイム更新のサブスクリプション
    const channel = supabase
      .channel('public:comments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, (payload) => {
        setComments((prev) => [payload.new as Comment, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async () => {
    // データベース接続が存在しない場合のプレースホルダー処理
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined) {
      setComments([
        { id: 1, name: "システム", content: "Supabaseの環境変数が設定されていません。.env.local に URL と Anon Key を設定すると実際に投稿・保存ができるようになります。", created_at: new Date().toISOString() }
      ]);
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && !error) {
      setComments(data as Comment[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsLoading(true);

    if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined) {
      alert("データベースが未接続のため、コメントは投稿できません。");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert([{ name: name.trim(), content: content.trim() }]);

    if (error) {
      console.error("Error inserting comment:", error);
      alert("投稿に失敗しました。");
    } else {
      setContent("");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="comments-container" style={{ padding: "0 10px" }}>
      <form onSubmit={handleSubmit} className="comment-form" style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="お名前（任意・ログイン不要）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #1E2328", background: "#091428", color: "#F0E6D2" }}
          required
        />
        <textarea
          placeholder="コメントや考察を書き込もう！"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #1E2328", background: "#091428", color: "#F0E6D2", resize: "vertical" }}
          required
        ></textarea>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: "8px 16px", background: "var(--color-blue-dark)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          {isLoading ? "送信中..." : "投稿する"}
        </button>
      </form>

      <div className="comments-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item" style={{ background: "var(--color-bg-card)", padding: "12px", borderRadius: "6px", border: "1px solid #1E2328" }}>
            <div className="comment-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.9rem" }}>
              <strong style={{ color: "var(--color-gold)" }}>{comment.name}</strong>
              <span style={{ color: "var(--color-text-secondary)", fontSize: "0.8rem" }}>
                {new Date(comment.created_at).toLocaleString('ja-JP')}
              </span>
            </div>
            <div className="comment-body" style={{ color: "var(--color-text-primary)", whiteSpace: "pre-wrap", fontSize: "0.95rem", lineHeight: "1.4" }}>
              {comment.content}
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>最初のコメントを投稿してみましょう！</p>
        )}
      </div>
    </div>
  );
}
