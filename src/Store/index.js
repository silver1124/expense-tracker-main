import { createSlice, configureStore } from "@reduxjs/toolkit";
import MyExpenseSliceReducer from "./MyExpenseSlice";
import themeSliceReducer from "./themeSlice";

const initialToken = localStorage.getItem("token");

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: initialToken ? true : false,
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

//store
const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    expense: MyExpenseSliceReducer,
    theme: themeSliceReducer,
  },
});
//action
export const authAction = AuthSlice.actions;

export default store;