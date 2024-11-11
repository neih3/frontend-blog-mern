import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";

import { setupListeners } from "@reduxjs/toolkit/query";
import blogReducer from "./reducers/blog.reducer";
import dialogReducer from "./reducers/dialog.reducer";
export const store = configureStore({
  reducer: {
    user: userReducer,

    blog: blogReducer,

    dialog: dialogReducer,
  },
  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
