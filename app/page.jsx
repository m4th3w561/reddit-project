import Image from "next/image";
import PostContainer from "@/components/PostContainer";
import SubredditsContainer from "@/components/SubredditsContainer";

export default function Home () {
  return (
    <div className="min-h-screen px-8">
      <div className="flex w-full max-w-6xl mx-auto gap-8">
        {/* Posts/Main Content */}
        <main className="flex-1 gap-4 flex flex-col py-2">
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
        </main>
        {/* Subreddits Sidebar */}
        <SubredditsContainer />
      </div>
    </div>
  );
}
