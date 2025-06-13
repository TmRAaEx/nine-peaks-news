import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/main.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = {
  title: "NinePeaksNews",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head /> */}
      <body /* className="flex flex-col min-h-[100vh]" */>
        <Header />
        <main /* className="flex justify-center items-center flex-1" */>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
