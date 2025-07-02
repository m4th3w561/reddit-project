import { useSelector, useDispatch } from "react-redux";
import { commentsData, commentsStatus, commentsError } from "@/lib/features/comments/commentsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useEffect, memo } from "react";
import Comment from "./Comment";
import { loadCommentsByPost } from "@/lib/features/comments/commentsSlice";

const Comments = memo(function Comments({ open, url }) {
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

    console.log("Comments Data:", data);
    if (!open) return null;

    return (
        <div className="space-y-2">
            {status === "loading" ? (
                <>
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="bg-[#232324] rounded-md p-2 sm:p-3">
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
                            <div className="flex items-center px-1 sm:px-2 pt-3 sm:pt-4">
                                <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 mr-1" />
                                <Skeleton className="h-4 w-6 sm:w-8 mx-1" />
                                <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 ml-1" />
                            </div>
                        </div>
                    ))}
                </>
            ) : data.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm">No comments yet.</div>
            ) : (
                data
                  .filter(comment => comment && comment.data && comment.data.body)
                  .map((comment) => (
                    <Comment key={comment.data.id} comment={comment} />
                  ))
            )}
        </div>
    );
});

export default Comments;
