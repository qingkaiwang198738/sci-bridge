import type { PublicMessage } from "@/src/types/domain";

export function MessageCard({ message }: { message: PublicMessage }) {
  const labels = { demand: "需求", supply: "供给", cooperation: "合作" } as const;
  return (
    <article className="message-card">
      <div className="message-card__meta">
        <span>{message.category}</span><span>{labels[message.supply_type]}</span>
        <time>{new Date(message.created_at).toLocaleString("zh-CN")}</time>
      </div>
      <h2><a href={`/messages/${message.id}`}>{message.item_name}</a></h2>
      <p>{message.content}</p>
      <span className="message-card__status">
        {message.status === "resolved" ? "已解决" : "开放响应"}
      </span>
    </article>
  );
}
