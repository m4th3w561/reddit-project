'use client'
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const subreddits = [
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
  { name: "Subreddit", icon: "S" },
];

export default function SubredditsContainer() {
  const [selected, setSelected] = useState(0);

  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <Card className="sticky top-16 bg-[#161617] border-[#222] p-4">
        <div className="px-2 pt-2">
          <h2 className="text-lg font-semibold text-white">Subreddits</h2>
        </div>
        <ul className="flex flex-col gap-2 px-2 pb-2">
          {subreddits.map((sub, idx) => (
            <li key={idx} >
              <button
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors text-left cursor-pointer ${
                  selected === idx
                    ? "bg-[#232324] text-white"
                    : "hover:bg-[#232324] text-[#e0e0e0]"
                }`}
                onClick={() => setSelected(idx)}
              >
                <Avatar>
                  <AvatarFallback>{sub.icon}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm flex-1">{sub.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
