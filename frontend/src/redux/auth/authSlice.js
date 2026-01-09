import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  try {
    const data = localStorage.getItem("auth");
    return data
      ? JSON.parse(data)
      : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  ...loadAuthFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload,
        })
      );
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
