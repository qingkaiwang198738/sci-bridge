import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "科研供需桥 · Sci-Bridge",
  description: "无需注册、短期有效、保护双方隐私的科研物资临时供需匹配平台。",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
