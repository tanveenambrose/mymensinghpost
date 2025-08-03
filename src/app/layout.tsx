import type { Metadata } from "next";
import { Noto_Sans_Bengali, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const bengaliFont = Noto_Sans_Bengali({
  weight: ['400', '500', '700'],
  subsets: ["bengali"],
  variable: "--font-bengali",
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "MymensinghPost - Latest News, Breaking News, and Updates",
  description: "MymensinghPost is a leading news portal providing the latest news, breaking news, and updates from Bangladesh and around the world.",
  keywords: "news, bangladesh news, mymensingh news, breaking news, latest news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${bengaliFont.variable} ${roboto.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
