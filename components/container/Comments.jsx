import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Comments ({
    open = false,
    comments = [
        { id: 1, username: "User1", text: "This is a great post!", time: "2 hours ago" },
        { id: 2, username: "User2", text: "Thanks for sharing.", time: "1 hour ago" },
        { id: 3, username: "User3", text: "Stay safe out there.", time: "just now" },
    ],
    onClose, // for future logic
}) {
    if (!open) return null;
    return (
        <div className="space-y-2">
            { comments.length === 0 ? (
                <div className="text-center text-muted-foreground">No comments yet.</div>
            ) : (
                comments.map((comment) => (
                    <div key={ comment.id } className="bg-[#232324] rounded-md p-3">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-5 h-5">
                                    <AvatarFallback>{comment.username[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-white font-medium">{ comment.username }</span>
                            </div>
                            <span className="text-xs text-[#818384]">{ comment.time }</span>
                        </div>
                        <div className="text-[#b3b3b3] text-sm pl-7">{ comment.text }</div>
                    </div>
                ))
            ) }
        </div>
    );
}
