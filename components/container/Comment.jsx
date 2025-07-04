import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { upVote, downVote } from "@/lib/features/comments/commentsSlice";
import { Button } from "@/components/ui/button";

export default function Comment ({ comment }) {
    const dispatch = useDispatch();
    const id = comment.data.id;
    console.log("Comment ID:", id);
    const username = comment.data.author;
    const comments = comment.data.body;
    const votes = comment.data.ups;
    const postCreated = comment.data.created_utc;

    const diff = Date.now() / 1000 - postCreated;
    const timeAgo =
        diff < 60
            ? `${Math.floor(diff)} second${Math.floor(diff) !== 1 ? 's' : ''} ago`
            : diff < 3600
                ? `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`
                : diff < 86400
                    ? `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`
                    : `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;

    const handleUpVote = () => {
        dispatch(upVote(id));
    };

    const handleDownVote = () => {
        dispatch(downVote(id));
    };

    return (
        <div className="bg-[#232324] rounded-md p-2 sm:p-3">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                        <AvatarFallback className="bg-[#3a3a3c] text-white text-xs">{username[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-white font-medium truncate">{username}</span>
                </div>
                <span className="text-xs text-[#818384] shrink-0 hidden sm:block">{timeAgo}</span>
            </div>
            <div className="text-[#b3b3b3] text-sm pl-6 sm:pl-7 break-words">{comments}</div>
            <div className="flex items-center px-1 sm:px-2 select-none">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#818384] hover:text-white cursor-pointer h-6 w-6 sm:h-8 sm:w-8"
                    onClick={e => {
                        e.stopPropagation();
                        handleUpVote();
                    }}
                >
                    ▲
                </Button>
                <span className="text-xs text-[#818384] font-semibold py-1">{votes}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#818384] hover:text-white cursor-pointer h-6 w-6 sm:h-8 sm:w-8"
                    onClick={e => {
                        e.stopPropagation();
                        handleDownVote();
                    }}
                >
                    ▼
                </Button>
            </div>
        </div>
    );
}