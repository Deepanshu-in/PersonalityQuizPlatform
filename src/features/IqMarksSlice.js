import { createSlice } from "@reduxjs/toolkit";

export const categoryMarksSlice = createSlice({
  name: "categoryMarks",
  initialState: {
    LogicalReasoning: 0,
    Verbal: 0,
    NumericalAbility: 0,
    Leadership: 0,
    DecisionMaking: 0,
    OrganizationalSkills: 0,
    DataInterpretation: 0,
    total: 0,
    isIq: false,
  },
  reducers: {
    incrementCategoryMark: (state, action) => {
      state[action.payload.category] += 1;
      state.isIq = true;
    },
    isIqTest: (state, action) => {
      state.isIq = action.payload;
    },
    totalMarksIq: (state) => {
      state.total += 1;
    },
  },
});

export const { incrementCategoryMark, isIqTest, totalMarksIq } =
  categoryMarksSlice.actions;

export default categoryMarksSlice.reducer;
