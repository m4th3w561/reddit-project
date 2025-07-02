import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loadPostsBySearch = createAsyncThunk(
  "search/loadPostsBySearch",
  async (searchTerm) => {
    const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
    // const response = await fetch(`https://invalid-url-that-will-fail.com/${Search}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    const posts = data.data.children;
    return posts;
  }
);


export const searchSlice = (createSlice({
  name: 'search',
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
      .addCase(loadPostsBySearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
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

export const { upVote, downVote } = searchSlice.actions;
export default searchSlice.reducer;

// Selectors for the correct slice name in store.js
export const searchPostsData = (state) => state.search.items;
export const searchPostsStatus = (state) => state.search.status;
export const searchPostsError = (state) => state.search.error;
