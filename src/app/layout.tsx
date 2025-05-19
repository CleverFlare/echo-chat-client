import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echo",
  description:
    "A next-gen social media app that blends WhatsApp's real-time messaging with Discord's community-driven servers, offering private chats, voice channels, and seamless group interactions—all in one place. 🚀",
};

const font = Rubik({
  weight: ["300", "400", "700", "800", "900", "600", "500"],
  subsets: ["arabic", "latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased h-[100svh]`}>
        {children}
      </body>
    </html>
  );
}
