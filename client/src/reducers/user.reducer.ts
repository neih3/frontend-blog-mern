import { createAction, createReducer } from "@reduxjs/toolkit";
import { clearLocalStorage, getAccessTokenFromLocal } from "../api/auth";
import User from "../types/user.type";

interface UserState {
  isAuthenticated: boolean;
  user: User;
}

const initailState: UserState = {
  isAuthenticated: Boolean(getAccessTokenFromLocal()),

  user: JSON.parse(localStorage.getItem("user") || "{}"),
};

export const checkIsAuthenticated = createAction<boolean>(
  "user/checkIsAuthenticated"
);

export const setAccessToken = createAction<string>("user/setAccessToken");

export const addUser = createAction<User>("user/addUser");

export const logout = createAction("user/logout");

const userReducer = createReducer(initailState, (build) => {
  build
    .addCase(checkIsAuthenticated, (state, action) => {
      state.isAuthenticated = action.payload;
    })
    .addCase(addUser, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    })
    .addCase(logout, (state) => {
      state.isAuthenticated = false;

      clearLocalStorage();
    });
});
export default userReducer;
