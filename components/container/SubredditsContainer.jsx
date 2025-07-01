'use client';
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { loadPostsBySubreddit } from "@/lib/features/post/postSlice";
import { useDispatch } from "react-redux";
import {useEffect} from "react";

const subreddits = [
  { name: "wallstreetbets", icon: "subredditsIcon/wallstreetbets.png", fallback: "W" },
  { name: "Alienware", icon: "subredditsIcon/Alienware.jpg", fallback: "A" },
  { name: "MadeMeSmile", icon: "subredditsIcon/MadeMeSmile.png", fallback: "M" },
  { name: "dogecoin", icon: "subredditsIcon/dogecoin.png", fallback: "D" },
  { name: "Steam", icon: "subredditsIcon/Steam.png", fallback: "S" },
  { name: "SomebodyMakeThis", icon: "subredditsIcon/SomebodyMakeThis.png", fallback: "S" },
  { name: "Business_Ideas", icon: "subredditsIcon/Business_Ideas.png", fallback: "B" },
  { name: "startups", icon: "subredditsIcon/startups.png", fallback: "S" },
  { name: "ycombinator", icon: 'subredditsIcon/ycombinator.png', fallback: "Y" },
];

export default function SubredditsContainer () {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

useEffect(() => {
  const subreddit = subreddits[selected].name;
  dispatch(loadPostsBySubreddit(subreddit));
}, [dispatch, selected]);
  
const handleSubredditClick = (index) => {
  setSelected(index); 
};
  
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <Card className="sticky top-16 bg-[#161617] border-[#222] p-4">
        <div className="px-2 pt-2">
          <h2 className="text-lg font-semibold text-white">Subreddits</h2>
        </div>
        <ul className="flex flex-col gap-2 px-2 pb-2">
          { subreddits.map((sub, idx) => (
            <li key={ idx } >
              <button
                className={ `w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors text-left cursor-pointer ${selected === idx
                  ? "bg-[#232324] text-white"
                  : "hover:bg-[#232324] text-[#e0e0e0]"
                  }` }
                onClick={ () => handleSubredditClick(idx) }
              >
                <Avatar>
                  <AvatarImage src={ sub.icon } alt={ sub.icon } />
                  <AvatarFallback>{ sub.fallback }</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm flex-1">{ sub.name }</span>
              </button>
            </li>
          )) }
        </ul>
      </Card>
    </aside>
  );
}
