import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "LoL ユニバース・ナビゲーター",
  description: "League of Legendsのチャンピオン関係図と世界観を探索する非公式ナビゲーター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
