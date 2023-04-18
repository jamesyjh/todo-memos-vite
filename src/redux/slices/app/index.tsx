import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nav: {
    activeLink: "boards",
  },
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNavPage: (state, action) => {
      state.nav.activeLink = action.payload;
    },
  },
});

export const { setNavPage } = slice.actions;

export default slice.reducer;
