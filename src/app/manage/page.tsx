import { OwnerConsole } from "@/src/components/manage/owner-console";
export default function ManagePage(){return <main className="container"><header className="hero"><a href="/">← 首页</a><h1>发布者控制台</h1><p>输入需求 ID 与发布凭证，查看收到的独立响应并进入对应的一对一沟通。</p></header><section className="section"><OwnerConsole/></section></main>}
