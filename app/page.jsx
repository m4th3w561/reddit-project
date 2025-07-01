"use client";
import PostContainer from "@/components/container/PostContainer";
import SubredditsContainer from "@/components/container/SubredditsContainer";
import { useSelector } from "react-redux";
import { postsData, postsStatus, postsError } from "@/lib/features/post/postSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Toaster } from "@/components/ui/sonner";


export default function Home () {
  // Example of using a selector, if needed
  // const someState = useSelector((state) => state.someSlice);
  // You can replace 'someSlice' with your actual slice name
  // and use the state as needed in your component.
  // const { someState } = useSelector((state) => state.someSlice);
  // This is just a placeholder; you can remove it if not needed.
  // const posts = useSelector();
  // Add a sample posts object to simulate data

  const posts = useSelector(postsData);

  if (postsStatus === "failed") {
    return <Toaster error={ postsError } />;
  }

  return (
    <div className="min-h-screen px-8">
      <div className="flex w-full max-w-6xl mx-auto gap-8">
        {/* Posts/Main Content */ }
        <main className="flex-1 gap-4 flex flex-col py-2">
          {
            postsStatus === "loading" && (
              <div className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full max-w-4xl mx-auto shadow">
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
            ) || postsStatus === "failed" && (
              <div className="bg-red-500 text-white p-4 rounded-lg"><p>Failed to load posts. Please try again later.</p></div>
            ) || Object.values(posts).length === 0 ? (
              <div className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full max-w-4xl mx-auto shadow">
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">No posts available. Please Select a Subreddit on the right.</p>
                </div>
              </div>
            ) : (
              posts.map((post, idx) => (
                <PostContainer key={ idx } data={ post.data } />
              ))
            )
          }
        </main>
        <SubredditsContainer />
      </div>
    </div>
  );
}
