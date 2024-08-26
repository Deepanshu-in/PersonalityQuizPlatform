import { createSlice } from "@reduxjs/toolkit";

export const studentInfoSlice = createSlice({
  name: "studentInfo",
  initialState: {
    name: "",
    email: "",
    phone: "",
    age: 0,
    state: "",
  },
  reducers: {
    updateStudentInfo: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearStudentInfo: (state) => {
      state.age = "";
      state.state = "";
      state.phone = "";
    },
  },
});

export const { updateStudentInfo, clearStudentInfo } = studentInfoSlice.actions;

export default studentInfoSlice.reducer;
