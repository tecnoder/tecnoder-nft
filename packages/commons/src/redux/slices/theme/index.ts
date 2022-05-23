import { createSlice } from '@reduxjs/toolkit';

interface ITheme {
  darkTheme: boolean;
}

const initialState: any = {
  darkTheme: true
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload;
    }
  }
});

export const { setDarkTheme } = themeSlice.actions;

export default themeSlice.reducer;