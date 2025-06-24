'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Navbar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      toast.success(`Searching for: ${search}`);
    } else {
      toast.error("Please enter a search term");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#161617] border-b border-[#222] h-12 flex items-center">
      <div className="w-full flex items-center justify-between max-w-screen-2xl mx-auto px-4">
        {/* Logo and Title - Left aligned */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <Image src="/reddit.svg" alt="Reddit Logo" width={24} height={24} className="mr-1" />
          <span className="text-white font-bold text-lg tracking-tight">Reddit Clone</span>
        </div>
        {/* Search Bar - Centered */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search"
              className="pl-3 pr-8 h-8 bg-[#161617] border border-[#343536] text-sm text-white placeholder:text-[#818384] rounded-md focus-visible:ring-0 focus:border-[#818384]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#818384] w-4 h-4 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 