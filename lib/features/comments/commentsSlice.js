import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redditCache, CACHE_TYPES } from "@/lib/utils/cache";

export const loadCommentsByPost = createAsyncThunk(
    "comments/loadCommentsByPost",
    async (url) => {
        // Check cache first
        const cachedData = redditCache.get(CACHE_TYPES.COMMENTS, url);
        if (cachedData) {
            return cachedData;
        }

        // If no cache, fetch from API
        const response = await fetch(`https://www.reddit.com${url}.json`);
        // const response = await fetch(`https://invalid-url-that-will-fail.com/${subreddit}.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        const comments = data[1].data.children;
        
        // Cache the successful response
        redditCache.set(CACHE_TYPES.COMMENTS, url, comments);
        
        return comments;
    }
);

export const commentsSlice = (createSlice({
    name: 'comments',
    initialState: {
        items: [],
        status: "idle",
        error: null,
        currentPostUrl: null,
        cacheInfo: null,
    },
    reducers: {
        upVote: (state, action) => {
            const commentId = action.payload;
            const comment = state.items.find(comment => comment.data.id === commentId);
            comment ? comment.data.ups++ : null;
        },
        downVote: (state, action) => {
            const commentId = action.payload;
            const comment = state.items.find(comment => comment.data.id === commentId);
            comment ? comment.data.ups-- : null;
        },
        clearCache: (state, action) => {
            if (action.payload) {
                redditCache.remove(CACHE_TYPES.COMMENTS, action.payload);
            } else {
                redditCache.clearAll();
            }
        },
        setCacheInfo: (state) => {
            state.cacheInfo = redditCache.getInfo();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCommentsByPost.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
                state.currentPostUrl = action.meta.arg;
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

export const { upVote, downVote, clearCache, setCacheInfo } = commentsSlice.actions;
export default commentsSlice.reducer;

export const commentsData = (state) => state.comments.items;
export const commentsStatus = (state) => state.comments.status;
export const commentsError = (state) => state.comments.error;
export const commentsCurrentPostUrl = (state) => state.comments.currentPostUrl;
export const commentsCacheInfo = (state) => state.comments.cacheInfo;
