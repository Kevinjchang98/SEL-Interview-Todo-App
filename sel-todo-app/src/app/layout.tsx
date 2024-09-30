import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./nord.css";
import styles from "@/app/page.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SEL Todo App",
  description: "A simple todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
          <header className={styles.header}>
            <a href="/">Tasks</a>
            <a
              target="_blank"
              href="https://github.com/Kevinjchang98/SEL-Interview-Todo-App"
            >
              Source code
            </a>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
