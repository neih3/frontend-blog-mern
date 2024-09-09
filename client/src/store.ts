import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import { blogApi } from "./reducers/blog.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import blogReducer from "./reducers/blog.reducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    blog: blogReducer,
  },
  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
