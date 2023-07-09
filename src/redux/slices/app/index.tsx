import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";

const initialState = {
  nav: {
    activeLink: "boards",
  },
  alert: {
    active: undefined,
  },
  themes: {
    "default-dark": {
      name: "Default Dark",
      type: "preset",
      background: {
        color: "#222",
      },
    },
    "default-light": {
      name: "Default Light",
      type: "preset",
      background: {
        color: "linear-gradient(109.6deg, rgb(245, 239, 249) 30.1%, rgb(207, 211, 236) 100.2%)",
      },
    },
    rainforest: {
      name: "Rainforest",
      type: "preset",
      background: {
        url: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
      },
    },
    mountain: {
      name: "Mountains",
      type: "preset",
      background: {
        url: "https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg",
      },
    },
    stones: {
      name: "Stones",
      type: "preset",
      background: {
        url: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
      },
    },
  },
  activeTheme: "default-dark",
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNavPage: (state, action) => {
      state.nav.activeLink = action.payload;
    },
    updateAppTheme: (state, action) => {
      const { themeId } = action.payload;
      state.activeTheme = themeId;
    },
    resetAppState: (state) => {
      state = initialState;
    },
    setAlert: (state, action) => {
      state.alert.active = action.payload;
    },
  },
});

export const { setNavPage, updateAppTheme, resetAppState, setAlert } = slice.actions;

export default slice.reducer;
