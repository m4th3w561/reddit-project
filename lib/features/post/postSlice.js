import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redditCache, CACHE_TYPES } from "@/lib/utils/cache";

export const loadPostsBySubreddit = createAsyncThunk(
    "posts/loadPostsBySubreddit",
    async (subreddit) => {
        // Check cache first
        const cachedData = redditCache.get(CACHE_TYPES.SUBREDDIT_POSTS, subreddit);
        if (cachedData) {
            return cachedData;
        }

        // If no cache, fetch from API
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        // const response = await fetch(`https://invalid-url-that-will-fail.com/${subreddit}.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const posts = data.data.children;
        
        // Cache the successful response
        redditCache.set(CACHE_TYPES.SUBREDDIT_POSTS, subreddit, posts);
        
        return posts;
    }
);

export const postsSlice = (createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: "idle",
        error: null,
        currentSubreddit: null,
        cacheInfo: null,
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
        },
        clearCache: (state, action) => {
            if (action.payload) {
                redditCache.remove(CACHE_TYPES.SUBREDDIT_POSTS, action.payload);
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
            .addCase(loadPostsBySubreddit.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
                state.currentSubreddit = action.meta.arg;
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

export const { upVote, downVote, clearCache, setCacheInfo } = postsSlice.actions;
export default postsSlice.reducer;

export const postsData = (state) => state.posts.items;
export const postsStatus = (state) => state.posts.status;
export const postsError = (state) => state.posts.error;
export const postsCurrentSubreddit = (state) => state.posts.currentSubreddit;
export const postsCacheInfo = (state) => state.posts.cacheInfo;
