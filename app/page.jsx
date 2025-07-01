"use client";
import PostContainer from "@/components/container/PostContainer";
import SubredditsContainer from "@/components/container/SubredditsContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPostsBySubreddit } from "@/lib/features/post/postSlice";

export default function Home () {
  // Example of using a selector, if needed
  // const someState = useSelector((state) => state.someSlice);
  // You can replace 'someSlice' with your actual slice name
  // and use the state as needed in your component.
  // const { someState } = useSelector((state) => state.someSlice);
  // This is just a placeholder; you can remove it if not needed.
  // const posts = useSelector();
  // Add a sample posts object to simulate data
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostsBySubreddit());
  }, [dispatch]);

  
  const posts = {
    "1": {
      id: "1",
      title: "Sample Post Title",
      votes: "100",
      username: "SampleUser",
      time: "2 hours ago",
      comments: 10,
      image: "https://via.placeholder.com/150"
    },
    "2": {
      id: "2",
      title: "Another Post Title",
      votes: "200",
      username: "AnotherUser",
      time: "1 hour ago",
      comments: 20,
      image: "https://via.placeholder.com/150"
    }
  };
  return (
    <div className="min-h-screen px-8">
      <div className="flex w-full max-w-6xl mx-auto gap-8">
        {/* Posts/Main Content */}
        <main className="flex-1 gap-4 flex flex-col py-2">
          {Object.values(posts).map((post) => (
            <PostContainer key={post.id} posts={post} />
          ))}
        </main>
        {/* Subreddits Sidebar */}
        <SubredditsContainer />
      </div>
    </div>
  );
}
