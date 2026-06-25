// features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// قراءة الثيم من localStorage أو الافتراضي light
const savedTheme = localStorage.getItem("theme") || "light";

const initialState = {
  mode: savedTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  
  },
});

export const { toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
