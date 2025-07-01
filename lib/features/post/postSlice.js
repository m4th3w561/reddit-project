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
