import type { Metadata, Viewport } from "next";
import { Anton, Courier_Prime } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import SiteFooter from "@/components/SiteFooter";
import BagelBoys from "@/components/bagel-boys/BagelBoys";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.twomenbagels.com"),
  title: "Two Men Bagel House: Singapore bagels since 2014",
  description:
    "Two Men Bagel House has been baking bagels in Singapore since 2014. Order delivery or find us in Tanjong Pagar, Novena, Holland Village, Joo Chiat and Punggol.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-SG" className={`${anton.variable} ${courierPrime.variable}`}>
      <body className="pb-[calc(var(--bar-h)+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteChrome />
        <main id="main">{children}</main>
        <BagelBoys />
        <SiteFooter />
      </body>
    </html>
  );
}
