import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { title: "Item 1", image: "https://via.placeholder.com/150" },
    { title: "Item 2", image: "https://via.placeholder.com/150" },
    { title: "Item 3", image: "https://via.placeholder.com/150" },
    { title: "Item 4", image: "https://via.placeholder.com/150" },
    { title: "Item 5", image: "https://via.placeholder.com/150" },
    { title: "Item 6", image: "https://via.placeholder.com/150" },
  ],
};

export const slice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    getBoards: (state) => {
      state.items;
    },
  },
});

export const { getBoards } = slice.actions;

export default slice.reducer;
