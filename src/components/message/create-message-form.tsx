"use client";

import { useState } from "react";
import { Turnstile } from "@/src/components/security/turnstile";

export function CreateMessageForm() {
  const [result, setResult] = useState<{ ownerSecret?: string; error?: string }>();
  const [loading, setLoading] = useState(false);

  async function submit(form: HTMLFormElement) {
    setLoading(true); setResult(undefined);
    const data = new FormData(form);
    const payload = {
      category: String(data.get("category") ?? ""),
      supplyType: String(data.get("supplyType") ?? ""),
      itemName: String(data.get("itemName") ?? ""),
      content: String(data.get("content") ?? ""),
      email: String(data.get("email") ?? ""),
      turnstileToken: String(data.get("turnstileToken") ?? "")
    };
    try {
      const res = await fetch("/api/v1/messages", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) setResult({ error: json?.error?.message ?? "发布失败" });
      else { setResult({ ownerSecret: json.ownerSecret }); form.reset(); }
    } catch { setResult({ error: "网络错误" }); }
    finally { setLoading(false); }
  }

  return (
    <form className="panel form" onSubmit={e => { e.preventDefault(); void submit(e.currentTarget); }}>
      <label>学科板块<select name="category" defaultValue="生命科学">
        <option>物理</option><option>数学</option><option>化学</option><option>生命科学</option>
        <option>经济金融</option><option>人文社科</option><option>计算机与AI</option><option>工程与材料</option>
      </select></label>
      <label>类型<select name="supplyType" defaultValue="demand">
        <option value="demand">需求</option><option value="supply">供给</option><option value="cooperation">合作</option>
      </select></label>
      <label>物品 / 实验需求<input name="itemName" maxLength={200} required /></label>
      <label>详细描述<textarea name="content" maxLength={10000} required rows={6} /></label>
      <label>邮箱（选填）<input name="email" type="email" /></label>
      <Turnstile enabled={process.env.NEXT_PUBLIC_TURNSTILE_ENABLED === "true"} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
      <button disabled={loading}>{loading ? "发布中…" : "发布"}</button>
      {result?.ownerSecret && <div className="secret-box"><strong>请立即保存发布凭证：</strong>
        <code>{result.ownerSecret}</code><p>网站不会再次显示该凭证。</p></div>}
      {result?.error && <p className="error">{result.error}</p>}
    </form>
  );
}
