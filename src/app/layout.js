import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigate from "./components/Navigate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NFT Mint & Smart Contract Demo",
  description: "A demo application for minting NFTs and interacting with smart contracts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navigate />
        </header>
        <div className="container">{children}</div>
        <h1 className="h1 bg-amber-600 p-10">Footer</h1>
      </body>
    </html>
  );
}
