"use client";
import { Navbar } from "@/components/container/Navbar";
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
    <div className="min-h-screen px-2 sm:px-4 lg:px-8"> 
      <Navbar />
      <div className="flex w-full max-w-6xl mx-auto gap-2 sm:gap-4 lg:gap-8">
        {/* Posts/Main Content */ } 
        <main className="flex-1 gap-2 sm:gap-4 flex flex-col py-2">
          {
            status === "loading" ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full max-w-4xl mx-auto shadow">
                    <div className="flex items-start">
                      {/* Upvote/Downvote */ }
                      <div className="flex flex-col items-center px-1 sm:px-2 pt-2 sm:pt-4 select-none">
                        <Skeleton className="h-6 w-6 mb-1" />
                        <Skeleton className="h-4 w-6 mb-1" />
                        <Skeleton className="h-6 w-6" />
                      </div>
                      {/* Post Content */ }
                      <div className="flex-1">
                        <div className="pt-2 sm:pt-4 pr-2 sm:pr-4">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <AspectRatio ratio={ 16 / 9 } className="bg-[#232324] rounded-md w-full mb-4">
                            <Skeleton className="w-full h-full rounded-md" />
                          </AspectRatio>
                          <Skeleton className="h-5 w-3/4 mb-2" />
                        </div>
                        {/* Footer */ }
                        <div className="flex items-center justify-between pr-2 sm:pr-4 pb-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
                            <Skeleton className="h-4 w-16 sm:w-20" />
                          </div>
                          <Skeleton className="h-4 w-10 sm:w-12" />
                          <Skeleton className="h-4 w-8 sm:w-10" />
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
        {/* Hide subreddits container on mobile to save space and improve performance */}
        <div className="hidden lg:block">
          <SubredditsContainer />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
