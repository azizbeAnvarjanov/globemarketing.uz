import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";
//import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Globe Marketing",
  description: "Qurilish kompaniyalari uchun marketing va sotuv bo'limini 0 dan qurib beramiz",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <ScrollToTopButton />
          {/* <ChatWidget /> */}
        </LanguageProvider>
      </body>
    </html>
  );
}
