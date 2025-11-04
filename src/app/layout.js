import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigate from "./components/Navigate";
import Link from "next/link";

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
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-100`}
          >
            <header className="border-b border-slate-800 bg-slate-900 text-white">
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">NFT</div>
                    <div>
                      <div className="text-lg font-semibold text-white">NFT Showcase</div>
                      <div className="text-xs text-slate-400">Mint & Demo</div>
                    </div>
                  </Link>
                </div>

                <div className="hidden md:flex md:items-center md:gap-6">
                  {/* Desktop nav (keeps existing component for mobile/expanded behavior) */}
                  <Navigate />
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/nft" className="hidden sm:inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Explore</Link>
                  <Link href="javascript:void(0)"><button className="px-3 py-2 border border-white-700 rounded-lg text-sm text-white">Connect Wallet</button></Link>
                </div>
              </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>

            <footer className="border-t border-slate-800 bg-slate-900 text-slate-300 mt-12">
              <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white">NFT Showcase</h4>
                  <p className="mt-2 text-sm text-slate-300">Present your NFT collection with confidence. Lightweight demo built with Next.js and Tailwind.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li><Link href="/" className="text-slate-300 hover:text-white">Home</Link></li>
                    <li><Link href="/nft" className="text-slate-300 hover:text-white">NFTs</Link></li>
                    <li><Link href="/auth/login" className="text-slate-300 hover:text-white">Login</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white">Contact</h4>
                  <p className="mt-2 text-sm text-slate-300">Questions? Email <a href="mailto:hello@example.com" className="text-indigo-400">hello@example.com</a></p>
                  <div className="mt-4 flex items-center gap-3">
                    <a href="#" aria-label="Twitter" className="text-slate-300 hover:text-white"> 
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.924c-.7.31-1.45.52-2.24.62.81-.5 1.44-1.29 1.73-2.23-.76.45-1.6.77-2.5.95C18.6 4.4 17.4 4 16.14 4c-1.9 0-3.44 1.56-3.44 3.48 0 .27.03.53.09.78-2.86-.14-5.4-1.53-7.1-3.64-.3.52-.48 1.12-.48 1.76 0 1.22.62 2.3 1.56 2.94-.58-.02-1.13-.18-1.61-.45v.04c0 1.7 1.22 3.12 2.83 3.45-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.06.46 1.45 1.8 2.5 3.39 2.53-1.24.98-2.8 1.57-4.5 1.57-.29 0-.57-.02-.85-.05C6.86 20.29 8.67 21 10.65 21c6.4 0 9.9-5.36 9.9-10.01v-.46c.68-.5 1.27-1.12 1.74-1.82-.63.28-1.3.48-1.99.57z"/></svg>
                    </a>
                    <a href="#" aria-label="GitHub" className="text-slate-300 hover:text-white">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.48-3.88-1.48-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.17 1.76 1.17 1.02 1.76 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.17-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.18.91-.25 1.88-.38 2.85-.38s1.94.13 2.85.38c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.73.81 1.17 1.84 1.17 3.1 0 4.42-2.7 5.4-5.27 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .31.21.66.79.55C20.71 21.38 24 17.08 24 12 24 5.65 18.35.5 12 .5z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t bg-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-slate-400 flex items-center justify-between">
                  <div>© {new Date().getFullYear()} NFT Showcase. All rights reserved.</div>
                  <div>
                    Built with <span className="text-indigo-400">Next.js</span> &amp; Tailwind
                  </div>
                </div>
              </div>
            </footer>
          </body>
        </html>
  );
}
