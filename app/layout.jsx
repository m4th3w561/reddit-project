import "./globals.css";
import { Navbar } from "@/components/container/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "./StoreProvider";

export const metadata = {
  title: "Reddit Clone",
  description: "A CodeCAdemy Portfolio Project",
};

export default function RootLayout ({ children }) {
  return (
    <StoreProvider>
      <html lang="en" className="dark">
        <body className="antialiased pt-14">
          <Navbar />
          { children }
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
