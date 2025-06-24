import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Reddit Clone",
  description: "A CodeCAdemy Portfolio Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased pt-14">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
 