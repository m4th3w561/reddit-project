'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loadPostsBySearch } from "@/lib/features/search/searchSlice";

export function Navbar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      const query = search.trim().replace(/\s+/g, "+");
      toast.success(`Searching for: ${search}`);
      dispatch(loadPostsBySearch(query));
      router.push(`/search/${query}`);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#161617] border-b border-[#222] h-12 sm:h-14 flex items-center">
      <div className="w-full flex items-center justify-between max-w-screen-2xl mx-auto px-2 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2 min-w-[100px] sm:min-w-[120px]">
          <Image src="/reddit.svg" alt="Reddit Logo" width={20} height={20} className="sm:w-6 sm:h-6 mr-1" priority />
          <span className="text-white font-bold text-sm sm:text-lg tracking-tight">Reddit Clone</span>
        </div>
        <div className="flex-1 flex justify-center max-w-md">
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search"
              className="pl-3 pr-8 h-8 sm:h-9 bg-[#161617] border border-[#343536] text-sm text-white placeholder:text-[#818384] rounded-md focus-visible:ring-0 focus:border-[#818384] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#818384] w-4 h-4 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 