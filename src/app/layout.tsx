import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OikkoGram | Neighborhood Social Platform",
  description: "A social media platform to connect, do activity and build community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              boxShadow: "0 0 2px 0",
              border: "none",
              minWidth: "250px",
            },
          }}
        />
      </body>
    </html>
  );
}
