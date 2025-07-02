'use client';
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Comments from "@/components/container/Comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostImageCarousel from "@/components/container/PostImageCarousel";
import { upVote, downVote } from "@/lib/features/post/postSlice";
import { upVote as upVoteSearch, downVote as downVoteSearch } from "@/lib/features/search/searchSlice";

export default function PostContainer ({ data, fromSearch = false }) {
    const postId = data.id;
    const username = data.author;
    const title = data.title;
    const content = data.selftext;
    const commentCount = data.num_comments;
    const commentsUrl = data.permalink;
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


    const isImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
    };
    const isVideoUrl = (url) => {
        return /\.(mp4|webm|ogg|mov|avi)$/i.test(url) || url?.includes("v.redd.it");
    };

    let media = [];
    if (data.media_metadata) {
        media = Object.values(data.media_metadata).map(media => media.s.u.replace(/&amp;/g, '&'));
    } else if (data.media && data.media.reddit_video && data.media.reddit_video.fallback_url) {
        media = [data.media.reddit_video.fallback_url];
    } else if (isImageUrl(data.url)) {
        media = [data.url];
    } else if (isVideoUrl(data.url)) {
        media = [data.url];
    } else {
        media = [];
    }

    const [openComments, setOpenComments] = useState(false);
    const dispatch = useDispatch();

    const handleUpVote = () => {
        if (fromSearch) {
            dispatch(upVoteSearch(postId));
        } else {
            dispatch(upVote(postId));
        }
    };
    const handleDownVote = () => {
        if (fromSearch) {
            dispatch(downVoteSearch(postId));
        } else {
            dispatch(downVote(postId));
        }
    };

    return (
        <div className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full mx-auto shadow">
            <div className="flex items-start">
                {/* Upvote/Downvote */}
                <div className="flex flex-col items-center px-1 sm:px-2 pt-4 select-none shrink-0">
                    <Button variant="ghost" size="icon" className="text-[#818384] hover:text-white cursor-pointer h-6 w-6 sm:h-8 sm:w-8" onClick={handleUpVote}>▲</Button>
                    <span className="text-xs text-[#818384] font-semibold py-1">{votes}</span>
                    <Button variant="ghost" size="icon" className="text-[#818384] hover:text-white cursor-pointer h-6 w-6 sm:h-8 sm:w-8" onClick={handleDownVote}>▼</Button>
                </div>
                {/* Post Content */}
                <div className="flex-1 min-w-0">
                    <div className="pt-4 pr-2 sm:pr-4">
                        <h1 className="text-white font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-1 leading-tight break-words">{title}</h1>
                        {media.length > 0 && <PostImageCarousel images={media} />}
                        {content && (
                            <p className="text-[#818384] text-sm mb-2 break-words">{content}</p>
                        )}
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pr-2 sm:pr-4 pb-2 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0">
                                <AvatarFallback>{username[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white font-medium truncate">{username}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-[#818384] hidden sm:block">{timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#818384] cursor-pointer shrink-0" onClick={() => setOpenComments(!openComments)}>
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs">{commentCount}</span>
                        </div>
                    </div>
                    {/* Comments Section */}
                    {openComments &&
                        <div className="pr-2 sm:pr-4 pb-4 mt-2">
                            <Comments open={openComments} url={commentsUrl} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
