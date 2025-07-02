"use client";
import { Navbar } from "@/components/container/Navbar";
import PostContainer from "@/components/container/PostContainer";
import SubredditsContainer from "@/components/container/SubredditsContainer";
import MobileSidebar from "@/components/container/MobileSidebar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { postsData, postsStatus, postsError } from "@/lib/features/post/postSlice";

export default function Home() {
  const posts = useSelector(postsData);
  const status = useSelector(postsStatus);
  const error = useSelector(postsError);
  const [visiblePosts, setVisiblePosts] = useState(3); // Start with only 3 posts for mobile
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(`Failed to load posts: ${error}`);
    }
  }, [status, error]);

  // Memoize posts to prevent unnecessary re-renders
  const memoizedPosts = useMemo(() => {
    return posts.slice(0, visiblePosts);
  }, [posts, visiblePosts]);

  // Intersection Observer for loading more posts
  const loadMorePosts = useCallback(() => {
    if (visiblePosts < posts.length) {
      setVisiblePosts(prev => Math.min(prev + 2, posts.length)); // Load 2 at a time for mobile
    }
  }, [visiblePosts, posts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visiblePosts < posts.length) {
          loadMorePosts();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before the element is visible
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMorePosts, visiblePosts, posts.length]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <Navbar />
      <MobileSidebar />
      <div className="flex w-full max-w-6xl mx-auto gap-4 lg:gap-8">
        {/* Posts/Main Content */}
        <main className="flex-1 gap-4 flex flex-col py-2 min-w-0">
          {status === "loading" ? (
            // Reduced skeleton items to improve performance
            [...Array(2)].map((_, index) => (
              <div key={index} className="bg-[#161617] border border-[#222] rounded-lg p-0 overflow-hidden w-full mx-auto shadow">
                <div className="flex items-start">
                  {/* Upvote/Downvote */}
                  <div className="flex flex-col items-center px-2 pt-4 select-none shrink-0">
                    <Skeleton className="h-6 w-6 mb-1" />
                    <Skeleton className="h-4 w-6 mb-1" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <div className="pt-4 pr-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <AspectRatio ratio={4 / 3} className="bg-[#232324] rounded-md w-full mb-4">
                        <Skeleton className="w-full h-full rounded-md" />
                      </AspectRatio>
                      <Skeleton className="h-4 w-1/2 mb-2" />
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pr-4 pb-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-4 w-10" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {memoizedPosts.map((post, idx) => (
                <PostContainer key={`${post.data.id}-${idx}`} data={post.data} />
              ))}
              {visiblePosts < posts.length && (
                <div 
                  ref={loadMoreRef}
                  className="flex justify-center py-4"
                >
                  <div className="loading-skeleton h-8 w-48 rounded-md"></div>
                </div>
              )}
            </>
          )}
        </main>
        <SubredditsContainer />
      </div>
      <Toaster />
    </div>
  );
}
