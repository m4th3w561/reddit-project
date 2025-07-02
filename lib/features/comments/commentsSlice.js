import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loadCommentsByPost = createAsyncThunk(
    "comments/loadCommentsByPost",
    async (url) => {
        const response = await fetch(`https://www.reddit.com${url}.json`);
        // const response = await fetch(`https://invalid-url-that-will-fail.com/${subreddit}.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        const comments = data[1].data.children;
        return comments;
    }
);

export const commentsSlice = (createSlice({
    name: 'comments',
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {
        upVote: (state, action) => {
            const postId = action.payload;
            const post = state.items.find(post => post.data.id === postId);
            post ? post.data.ups++ : null;
        },
        downVote: (state, action) => {
            const postId = action.payload;
            const post = state.items.find(post => post.data.id === postId);
            post ? post.data.ups-- : null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCommentsByPost.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadCommentsByPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload; // <--- Store the comments here
            })
            .addCase(loadCommentsByPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
}));

export const { upVote, downVote } = commentsSlice.actions;
export default commentsSlice.reducer;

export const commentsData = (state) => state.comments.items;
export const commentsStatus = (state) => state.comments.status;
export const commentsError = (state) => state.comments.error;
