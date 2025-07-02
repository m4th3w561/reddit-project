import { useSelector, useDispatch } from "react-redux";
import { commentsData, commentsStatus, commentsError } from "@/lib/features/comments/commentsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import Comment from "./Comment";
import { loadCommentsByPost } from "@/lib/features/comments/commentsSlice";

export default function Comments ({ open, url }) {
    const data = useSelector(commentsData);
    const status = useSelector(commentsStatus);
    const error = useSelector(commentsError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            dispatch(loadCommentsByPost(url));
        }
    }, [dispatch, open, url]);

    useEffect(() => {
        if (status === "failed" && error) {
            toast.error(`Failed to load comments: ${error}`);
        }
    }, [status, error]);

    const filteredComments = useMemo(() => {
        return data.filter(comment => comment && comment.data && comment.data.body);
    }, [data]);

    if (!open) return null;

    return (
        <div className="space-y-2 animate-fade-in">
            { status === "loading" ? (
                <>
                    { [...Array(4)].map((_, index) => (
                        <div key={ index } className="bg-[#232324] rounded-md p-2 sm:p-3">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
                                    <Skeleton className="h-3 w-16 sm:w-20" />
                                </div>
                                <Skeleton className="h-3 w-12 sm:w-16" />
                            </div>
                            <div className="pl-6 sm:pl-7">
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <div className="flex items-center px-2 pt-2 sm:pt-4">
                                <Skeleton className="h-6 w-6 mr-1" />
                                <Skeleton className="h-4 w-6 sm:w-8 mx-1" />
                                <Skeleton className="h-6 w-6 ml-1" />
                            </div>
                        </div>
                    )) }
                </>
            ) : filteredComments.length === 0 ? (
                <div className="text-center text-muted-foreground py-4 text-sm">No comments yet.</div>
            ) : (
                filteredComments.map((comment) => (
                    <Comment key={ comment.data.id } comment={ comment } />
                ))
            ) }
        </div>
    );
}
