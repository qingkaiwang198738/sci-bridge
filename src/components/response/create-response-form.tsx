"use client";
import { useState } from "react";
import { Turnstile } from "@/src/components/security/turnstile";

export function CreateResponseForm({ messageId }: { messageId: string }) {
  const [secret, setSecret] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  return <form className="panel form" onSubmit={async e => {
    e.preventDefault(); setLoading(true); setError(undefined); setSecret(undefined);
    const form = e.currentTarget; const content = new FormData(form).get("content"); const turnstileToken = String(new FormData(form).get("turnstileToken") ?? "");
    try {
      const r = await fetch("/api/v1/responses", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({messageId,content,turnstileToken}) });
      const j = await r.json();
      if (!r.ok) setError(j?.error?.message ?? "响应失败"); else setSecret(j.responderSecret);
    } catch { setError("网络错误"); } finally { setLoading(false); }
  }}>
    <label>回复内容<textarea name="content" rows={6} maxLength={5000} required /></label>
    <Turnstile enabled={process.env.NEXT_PUBLIC_TURNSTILE_ENABLED === "true"} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
    <button disabled={loading}>{loading ? "提交中…" : "提交响应"}</button>
    {secret && <div className="secret-box"><strong>响应凭证，请立即保存：</strong><code>{secret}</code><p>使用该凭证进入本次一对一沟通。</p></div>}
    {error && <p className="error">{error}</p>}
  </form>;
}
