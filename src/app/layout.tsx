import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./ReactQueryProvider";
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              boxShadow: "0 0 2px 0",
              border: "1px solid black",
              minWidth: "250px",
            },
          }}
        />
      </body>
    </html>
  );
}
