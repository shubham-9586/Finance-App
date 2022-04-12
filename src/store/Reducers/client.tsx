import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: [],
};

const cardSlice = createSlice({
  initialState,
  name: "CustomerList",
  reducers: {
    SetCustomer: (state: any, action: any) => {
      state.customer = action.payload;
    },
  },
});

export const { SetCustomer } = cardSlice.actions;

export default cardSlice.reducer;
