import type { PublicMessage } from "@/src/types/domain";
import { MessageCard } from "./message-card";

export function MessageList({ messages }: { messages: PublicMessage[] }) {
  if (!messages.length) return <div className="empty-state">目前还没有公开需求。</div>;
  return <div className="message-list">{messages.map(m => <MessageCard key={m.id} message={m} />)}</div>;
}
