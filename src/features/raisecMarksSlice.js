import { createSlice } from "@reduxjs/toolkit";

export const raisecMarksSlice = createSlice({
  name: "raisecMarks",
  initialState: {
    Realistic: 0,
    Investigative: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0,
    Artistic: 0,
    total: 0,
    isRais: false,
  },

  reducers: {
    incrementRaisecMark: (state, action) => {
      state[action.payload.category] += 1;
    },
    isRaisecTest: (state, action) => {
      state.isRais = action.payload;
    },
    totalMarksEq: (state) => {
      state.total += 1;
    },
  },
});

export const { incrementRaisecMark, isRaisecTest, totalMarksEq } =
  raisecMarksSlice.actions;

export default raisecMarksSlice.reducer;
