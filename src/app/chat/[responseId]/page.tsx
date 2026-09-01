import { ChatAccess } from "@/src/components/chat/chat-access";
import { ChatBox } from "@/src/components/chat/chat-box";
import { getChatSession } from "@/src/lib/security/session";
export const dynamic="force-dynamic";
export default async function ChatPage({params,searchParams}:{params:Promise<{responseId:string}>,searchParams:Promise<{secret?:string}>}){const {responseId}=await params;const {secret}=await searchParams;const session=await getChatSession(responseId);if(secret||(session?.responseId!==responseId))return <main className="container"><header className="hero"><h1>进入安全沟通</h1></header><ChatAccess responseId={responseId} secret={secret}/></main>;return <main className="container"><header className="hero"><a href="/">← 首页</a><h1>一对一沟通</h1><p>会话凭证已转换为短期 HttpOnly 安全会话。</p></header><ChatBox responseId={responseId} role={session.role}/></main>}
