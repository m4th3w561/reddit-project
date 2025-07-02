'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import SubredditsContainer from "./SubredditsContainer";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.mobile-sidebar') && !e.target.closest('.sidebar-toggle')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="sidebar-toggle lg:hidden fixed top-2 left-4 z-50 text-white hover:bg-[#232324]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        mobile-sidebar fixed top-0 left-0 h-full w-80 bg-[#161617] border-r border-[#222] z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <Image src="/reddit.svg" alt="Reddit Logo" width={24} height={24} />
            <span className="text-white font-bold text-lg tracking-tight">Reddit Clone</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#232324] h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 py-4">
          <div className="w-full">
            <SubredditsContainer isMobile={true} />
          </div>
        </div>
      </div>
    </>
  );
} 