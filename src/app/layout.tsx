import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import JotaiProvider from "@/components/utils/jotai-provider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Echo",
  description:
    "A next-gen social media app that blends WhatsApp's real-time messaging with Discord's community-driven servers, offering private chats, voice channels, and seamless group interactions—all in one place. 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased h-screen`}>
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
