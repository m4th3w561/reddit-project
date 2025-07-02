import { configureStore } from '@reduxjs/toolkit'
import postsBySubreddit from '@/lib/features/post/postSlice'
import commentsByPost from '@/lib/features/comments/commentsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsBySubreddit,
      comments: commentsByPost,
    }
  })
}

export const store = makeStore();