export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { findMessageById } from "@/src/server/repositories/message.repository";
import { CreateResponseForm } from "@/src/components/response/create-response-form";
import { ReportForm } from "@/src/components/message/report-form";

export default async function MessagePage({ params }: { params: Promise<{ id:string }> }) {
  const {id}=await params; const message=await findMessageById(id);
  if(!message || message.status!=="published" || new Date(message.expires_at)<=new Date()) notFound();
  return <main className="container"><header className="hero"><a href="/">← 返回</a><h1>{message.item_name}</h1><p>{message.category} · {message.supply_type}</p></header><section className="grid section"><article className="panel"><h2>需求详情</h2><p className="prewrap">{message.content}</p><small>有效期至：{new Date(message.expires_at).toLocaleString("zh-CN")}</small><div style={{marginTop:16}}><ReportForm messageId={message.id}/></div></article><div><h2>提交响应</h2><CreateResponseForm messageId={message.id}/></div></section></main>;
}
