import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KnowledgeBase - 障害管理システム",
  description: "システム障害管理ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}>
        <header style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-background)' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: 'var(--primary-color)' }}>KnowledgeBase</h1>
            <div>
              <a href="/" style={{ marginRight: '1rem', color: 'var(--secondary-color)', textDecoration: 'none' }}>ダッシュボード</a>
              <a href="/incidents" style={{ marginRight: '1rem', color: 'var(--secondary-color)', textDecoration: 'none' }}>インシデント</a>
              <a href="/login" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>ログイン</a>
            </div>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
