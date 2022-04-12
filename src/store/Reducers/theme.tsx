import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const themeReducer = createSlice({
  initialState,
  name: "theme",
  reducers: {
    ChangeTheme: (state) => {
      return !state;
    },
  },
});

export const { ChangeTheme } = themeReducer.actions;

export default themeReducer.reducer;
