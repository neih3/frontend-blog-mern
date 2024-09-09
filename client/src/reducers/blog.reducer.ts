import { createAction, createReducer } from "@reduxjs/toolkit";

interface BlogState {
  genres: unknown[];
}

const initailState: BlogState = {
  genres: [],
};

export const addGenres = createAction<unknown[]>("blog/addGenres");

const blogReducer = createReducer(initailState, (build) => {
  build.addCase(addGenres, (state, action) => {
    state.genres = action.payload;
  });
});
export default blogReducer;
