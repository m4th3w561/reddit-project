import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redditCache, CACHE_TYPES } from "@/lib/utils/cache";

export const loadPostsBySearch = createAsyncThunk(
  "search/loadPostsBySearch",
  async (searchTerm) => {
    // Check cache first
    const cachedData = redditCache.get(CACHE_TYPES.SEARCH_POSTS, searchTerm);
    if (cachedData) {
      return cachedData;
    }

    // If no cache, fetch from API
    const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
    // const response = await fetch(`https://invalid-url-that-will-fail.com/${Search}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    const posts = data.data.children;
    
    // Cache the successful response
    redditCache.set(CACHE_TYPES.SEARCH_POSTS, searchTerm, posts);
    
    return posts;
  }
);

export const searchSlice = (createSlice({
  name: 'search',
  initialState: {
    items: [],
    status: "idle",
    error: null,
    currentSearchTerm: null,
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
        redditCache.remove(CACHE_TYPES.SEARCH_POSTS, action.payload);
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
      .addCase(loadPostsBySearch.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.currentSearchTerm = action.meta.arg;
      })
      .addCase(loadPostsBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // <--- Store the posts here
      })
      .addCase(loadPostsBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
}));

export const { upVote, downVote, clearCache, setCacheInfo } = searchSlice.actions;
export default searchSlice.reducer;

// Selectors for the correct slice name in store.js
export const searchPostsData = (state) => state.search.items;
export const searchPostsStatus = (state) => state.search.status;
export const searchPostsError = (state) => state.search.error;
export const searchCurrentTerm = (state) => state.search.currentSearchTerm;
export const searchCacheInfo = (state) => state.search.cacheInfo;
