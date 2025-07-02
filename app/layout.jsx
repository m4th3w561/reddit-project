import "./globals.css";
import { StoreProvider } from "./StoreProvider";

export const metadata = {
  title: "Reddit Clone",
  description: "A CodeCademy Portfolio Project",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://www.reddit.com" />
          <link rel="dns-prefetch" href="https://preview.redd.it" />
          <link rel="dns-prefetch" href="https://i.redd.it" />
          <link rel="dns-prefetch" href="https://i.imgur.com" />
        </head>
        <body className="antialiased pt-14 font-sans">
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
