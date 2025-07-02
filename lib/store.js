import { configureStore } from '@reduxjs/toolkit'
import postsBySubreddit from '@/lib/features/post/postSlice'
import commentsByPost from '@/lib/features/comments/commentsSlice'
import postsBySearch from '@/lib/features/search/searchSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsBySubreddit,
      comments: commentsByPost,
      search: postsBySearch
    }
  })
}

export const store = makeStore();