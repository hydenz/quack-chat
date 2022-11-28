import { configureStore } from "@reduxjs/toolkit";
// import jwtDecode from "jwt-decode";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    chat: chatSlice,
    auth: authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// const initialState: State = {
//   currentUser: {
//     id: localStorage.getItem("accessToken")
//       ? (jwtDecode(localStorage.getItem("accessToken")!) as any).id
//       : "",
//     accessToken: localStorage.getItem("accessToken") || "",
//   },
//   selectedContactId: "",
// };

// export enum ACTION_TYPES {
//   LOGGED_IN = "LOGGED_IN",
//   SELECT_CONTACT = "SELECT_CONTACT",
//   DESELECT_CONTACT = "DESELECT_CONTACT",
// }

// function reducer(state = initialState, action: Action) {
//   switch (action.type) {
//     case ACTION_TYPES.LOGGED_IN:
//       return {
//         ...state,
//         currentUser: {
//           accessToken: action.payload.accessToken,
//           id: action.payload.id,
//         },
//       };
//     case ACTION_TYPES.SELECT_CONTACT:
//       return { ...state, selectedContactId: action.payload.id };
//     case ACTION_TYPES.DESELECT_CONTACT:
//       return { ...state, selectedContactId: "" };
//     default:
//       return state;
//   }
// }

// store.subscribe(() => {
//   localStorage.setItem("accessToken", store.getState().currentUser.accessToken);
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

// interface Action {
//   type: ACTION_TYPES;
//   payload?: any;
// }

// interface State {
//   currentUser: { id: string; accessToken: string };
//   selectedContactId: string;
// }
