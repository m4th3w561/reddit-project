"use client";
import PostContainer from "@/components/container/PostContainer";
import SubredditsContainer from "@/components/container/SubredditsContainer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { postsData, postsStatus, postsError } from "@/lib/features/post/postSlice";


export default function Home () {
  const posts = useSelector(postsData);
  const status = useSelector(postsStatus);
  const error = useSelector(postsError);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(`Failed to load posts: ${error}`);
    }
  }, [status, error]);

  return (
    <div className="min-h-screen px-8">
      <div className="flex w-full max-w-6xl mx-auto gap-8">
        {/* Posts/Main Content */ } 
        <main className="flex-1 gap-4 flex flex-col py-2">
          {
            status === "loading" ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full max-w-4xl mx-auto shadow">
                    <div className="flex items-start">
                      {/* Upvote/Downvote */ }
                      <div className="flex flex-col items-center px-2 pt-4 select-none">
                        <Skeleton className="h-6 w-6 mb-1" />
                        <Skeleton className="h-4 w-6 mb-1" />
                        <Skeleton className="h-6 w-6" />
                      </div>
                      {/* Post Content */ }
                      <div className="flex-1">
                        <div className="pt-4 pr-4">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <AspectRatio ratio={ 16 / 9 } className="bg-[#232324] rounded-md w-full mb-4">
                            <Skeleton className="w-full h-full rounded-md" />
                          </AspectRatio>
                          <Skeleton className="h-5 w-3/4 mb-2" />
                        </div>
                        {/* Footer */ }
                        <div className="flex items-center justify-between pr-4 pb-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-10" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              posts.map((post, idx) => (
                <PostContainer key={ idx } data={ post.data } />
              ))
            )
          }
        </main>
        <SubredditsContainer />
      </div>
      <Toaster />
    </div>
  );
}
