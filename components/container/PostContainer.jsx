'use client';
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Comments from "@/components/container/Comments";
import { useState } from "react";

export default function PostContainer ({
    posts = {
        title: "A strong volunteer, cleaning up after the recent airstrike in Kyiv",
        votes: "16k",
        username: "Username",
        time: "5 hours ago",
        comments: 123,
        image: null,
    }
}) {
    const {
        title,
        votes,
        username,
        time,
        comments,
        image
    } = posts;

    const [openComments, setOpenComments] = useState(false);
    return (
        <div className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full max-w-4xl mx-auto shadow">
            <div className="flex items-start">
                {/* Upvote/Downvote */ }
                <div className="flex flex-col items-center px-2 pt-4 select-none">
                    <Button variant="ghost" size="icon" className="text-[#818384] hover:text-white cursor-pointer">▲</Button>
                    <span className="text-xs text-[#818384] font-semibold py-1">{ votes }</span>
                    <Button variant="ghost" size="icon" className="text-[#818384] hover:text-white cursor-pointer">▼</Button>
                </div>
                {/* Post Content */ }
                <div className="flex-1">
                    <div className="pt-4 pr-4">
                        <h2 className="text-white font-semibold text-base mb-2 leading-snug">{ title }</h2>
                        <AspectRatio ratio={ 16 / 9 } className="bg-[#232324] rounded-md w-full mb-4">
                            { image ? (
                                <img src={ image } alt="Post visual" className="object-cover w-full h-full rounded-md" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#444] text-sm">Image Placeholder</div>
                            ) }
                        </AspectRatio>
                    </div>
                    {/* Footer */ }
                    <div className="flex items-center justify-between pr-4 pb-2">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback>{ username[0] }</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white font-medium">{ username }</span>
                        </div>
                        <div className="flex items-center gap-2"><span className="text-xs text-[#818384]">{ time }</span></div>
                        <div className="flex items-center gap-1 text-[#818384] cursor-pointer" onClick={ () => setOpenComments(!openComments) }>
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">{ comments }</span>
                        </div>
                    </div>
                    <div className="pr-4 pb-4 mt-2">
                        <Comments open={ openComments } />
                    </div>
                </div>
            </div>
        </div>
    );
}
