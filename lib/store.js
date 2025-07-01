import { configureStore } from '@reduxjs/toolkit'
import postsBySubreddit from '@/lib/features/post/postSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsBySubreddit
    }
  })
}

export const store = makeStore();