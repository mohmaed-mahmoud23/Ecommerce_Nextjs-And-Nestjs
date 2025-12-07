import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  details: "",
  phone: "",
  city: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    saveAddress: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveAddress } = addressSlice.actions;
export default addressSlice.reducer;
