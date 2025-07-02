import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: "Reddit Clone",
  description: "A CodeCAdemy Portfolio Project",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  manifest: "/manifest.json",
  themeColor: "#161617",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Reddit Clone",
  },
};

export default function RootLayout ({ children }) {
  return (
    <StoreProvider>
      <html lang="en" className={`dark ${roboto.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#161617" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Reddit Clone" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://www.redditstatic.com" />
          <link rel="dns-prefetch" href="https://preview.redd.it" />
          <link rel="dns-prefetch" href="https://i.redd.it" />
        </head>
        <body className="antialiased pt-12 sm:pt-14">
          { children }
        </body>
      </html>
    </StoreProvider>
  );
}
