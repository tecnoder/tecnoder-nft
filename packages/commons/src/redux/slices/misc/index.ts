import { createSlice } from "@reduxjs/toolkit";

interface IMisc {
  justLoggedIn: boolean;
}

const initialState: any = {
  justLoggedIn: false,
};

const miscSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setJustLoggedIn: (state) => {
      state.justLoggedIn = true;
    },
  },
});

export const { setJustLoggedIn } = miscSlice.actions;

export default miscSlice.reducer;
