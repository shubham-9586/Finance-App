import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: null,
};

const cardSlice = createSlice({
  initialState,
  name: "isAuth",
  reducers: {
    SetToken: (state: any, action: any) => {
      state.isAuth = action.payload;
    },
    RemoveToken: (state: any) => {
      state.isAuth = null;
    },
  },
});

export const { SetToken, RemoveToken } = cardSlice.actions;

export default cardSlice.reducer;
