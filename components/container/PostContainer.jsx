'use client';
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Comments from "@/components/container/Comments";
import { useState } from "react";
import PostImageCarousel from "@/components/container/PostImageCarousel";

export default function PostContainer ({ data }) {
    const username = data.author;
    const title = data.title;
    const content = data.selftext;
    const commentCount = data.num_comments;
    const commentsUrl = `https://www.reddit.com/${data.permalink}`;
    const media = data.media_metadata
        ? Object.values(data.media_metadata).map(media => media.s.u.replace(/&amp;/g, '&'))
        : [];
    const votes = data.ups;
    const postCreated = data.created_utc;
    const diff = Date.now() / 1000 - postCreated;
    const timeAgo =
        diff < 60
            ? `${Math.floor(diff)} second${Math.floor(diff) !== 1 ? 's' : ''} ago`
            : diff < 3600
                ? `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`
                : diff < 86400
                    ? `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`
                    : `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;


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
                        <h1 className="text-white font-semibold text-[2rem] mb-1 leading-snug">{ title }</h1>
                        <PostImageCarousel images={ media } />
                        { content && (
                            <p className="text-[#818384] text-sm mb-2">{ content }</p>
                        ) }
                    </div>
                    {/* Footer */ }
                    <div className="flex items-center justify-between pr-4 pb-2">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback>{ username[0] }</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white font-medium">{ username }</span>
                        </div>
                        <div className="flex items-center gap-2"><span className="text-xs text-[#818384]">{ timeAgo }</span></div>
                        <div className="flex items-center gap-1 text-[#818384] cursor-pointer" onClick={ () => setOpenComments(!openComments) }>
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">{ commentCount }</span>
                        </div>
                    </div>
                    {/* Comments Section */ }
                    { openComments &&
                        <div className="pr-4 pb-4 mt-2">
                            <Comments open={ commentsUrl } />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
