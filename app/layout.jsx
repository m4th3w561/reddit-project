import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import CacheManager from "@/components/container/CacheManager";

export const metadata = {
  title: "Reddit Clone",
  description: "A CodeCademy Portfolio Project",
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#161617",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en" className="dark">
        <head>
          {/* Preconnect to critical domains only */}
          <link rel="preconnect" href="https://www.reddit.com" />
          <link rel="dns-prefetch" href="https://preview.redd.it" />
          <link rel="dns-prefetch" href="https://i.redd.it" />
          <link rel="dns-prefetch" href="https://i.imgur.com" />
          {/* Preload critical resources */}
          <link rel="preload" href="/reddit.svg" as="image" type="image/svg+xml" />
        </head>
        <body className="antialiased pt-14">
          {children}
          <CacheManager />
        </body>
      </html>
    </StoreProvider>
  );
}
