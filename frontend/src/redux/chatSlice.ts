import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    id: "",
  },
  reducers: {
    selectChat: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    unselectChat: (state) => {
      state.id = "";
    },
  },
});

export const { selectChat, unselectChat } = chatSlice.actions;
export default chatSlice.reducer;
