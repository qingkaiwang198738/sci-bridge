export const dynamic = "force-dynamic";

import { CreateMessageForm } from "@/src/components/message/create-message-form";
import { MessageList } from "@/src/components/message/message-list";
import { findPublicMessages } from "@/src/server/repositories/message.repository";
import { Heatmap } from "@/src/components/metrics/heatmap";

export default async function HomePage() {
  const messages = await findPublicMessages();
  return <main className="container">
    <header className="hero"><a href="/manage">发布者控制台</a><h1>✦ 科研供需桥</h1>
      <p>无需注册、短期有效、保护双方隐私的科研物资临时供需匹配平台。</p></header>
    <section className="grid section">
      <div><h2>发布科研需求 / 供给</h2><CreateMessageForm /></div>
      <div><h2>最新供需</h2><MessageList messages={messages} /></div>
    </section>
    <section className="section"><h2>学科供需热度</h2><Heatmap /></section>
    <footer className="section muted"><p>科研供需桥 · 公益、非商业化的科研信息临时对接平台</p><p><a href="/privacy">隐私说明</a> · <a href="/terms">使用条款</a> · <a href="/api/health">服务状态</a></p></footer>
  </main>;
}
