import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loadPostsBySubreddit = createAsyncThunk(
    "posts/loadPostsBySubreddit",
    async (subreddit) => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const posts = data.data.children;
        return posts;
    }
);

const initialState = {
    items: [], 
    status: "idle",
    error: null,
};

export const postsSlice = (createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPostsBySubreddit.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadPostsBySubreddit.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload; // <--- Store the posts here
            })
            .addCase(loadPostsBySubreddit.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
}));

// export const { upVote } = postsSlice.actions;
export default postsSlice.reducer;

export const postsData = (state) => state.posts.items;
export const postsStatus = (state) => state.posts.status;
export const postsError = (state) => state.posts.error;


// json.data.children.forEach((post) => {
//   const postData = post.data;
//   const postId = postData.id;
// const subreddit = postData.subreddit;
// const postAuthor = postData.author;
//  const postTitle = postData.title;
// const postContent = postData.selftext;
//  const postCommentCount = postData.num_comments;
//  const postCommentsUrl = `https://www.reddit.com/${postData.permalink}`;
//  const postMedia = Object.values(postData.media_metadata).map(media => {return media.s.u.replace(/&amp;/g, '&');})
//  const postVotes = postData.ups;
//  const postCreated = postData.created_utc;
// const diff = Date.now() / 1000 - postCreated;
// const timeAgo =
//   diff < 60
//     ? `${Math.floor(diff)} second${Math.floor(diff) !== 1 ? 's' : ''} ago`
//     : diff < 3600
//     ? `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`
//     : diff < 86400
//     ? `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`
//     : `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;


