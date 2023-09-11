import { createSlice } from "@reduxjs/toolkit";

const Initialthemestate = {
  isDarkMode: JSON.parse(localStorage.getItem("darkmode")) || false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: Initialthemestate,
  reducers: {
    toggeltheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkmode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const toggelthemeAction = themeSlice.actions;

export default themeSlice.reducer;