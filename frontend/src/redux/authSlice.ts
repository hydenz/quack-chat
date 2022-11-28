import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const accessToken = localStorage.getItem("accessToken");

const initialState = {
  id: accessToken ? (jwtDecode(accessToken!) as any).id : "",
  accessToken: accessToken || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<typeof initialState>) => {
      state = action.payload;
    },
    logout: (state) => {
      state = { accessToken: "", id: "" };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
