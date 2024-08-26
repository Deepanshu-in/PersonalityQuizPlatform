import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    // userLogin: (state) => {
    //   return true;
    // },
    // userLogout: (state) => {
    //   return false;
    // },
    // newUser: (state) => {
    //   return true;
    // },

    isUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { isUser } = authSlice.actions;
export default authSlice.reducer;
