import { createSlice } from "@reduxjs/toolkit";
import { authService } from "@/api/auth.service";

const initialState = {
  isAuth: false,
  data: {},
};

const resetState = () => {
  return initialState;
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: resetState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authService.endpoints.login.matchFulfilled,
        (state, action) => {
          state.isAuth = true;
          state.data = action.payload;
        }
      )
      .addMatcher(authService.endpoints.login.matchRejected, resetState);
  },
});

export const { logout } = authSlices.actions;

export default authSlices.reducer;
