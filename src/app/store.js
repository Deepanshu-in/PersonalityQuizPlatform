import { configureStore } from "@reduxjs/toolkit";
import categoryMarksReducer from "../features/IqMarksSlice";
import studentInfoReducer from "../features/studentInfoSlice";
import raisecMarksReducer from "../features/raisecMarksSlice";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    categoryMarks: categoryMarksReducer,
    studentInfo: studentInfoReducer,
    raisecMarks: raisecMarksReducer,
    auth: authReducer,
  },
});

export default store;
