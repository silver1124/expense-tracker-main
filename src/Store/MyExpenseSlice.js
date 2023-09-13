import { createSlice } from "@reduxjs/toolkit";
const initialExpenseState = {
  expense: [],
  totalAmount: 0,
  Premium: false,
  getdataAgain: false,
};

const MyExpenseSlice = createSlice({
  name: "myexp",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
      console.log(action.payload);
    },
    getExpense(state, action) {
      state.expense = action.payload.expense;
      state.totalAmount = action.payload.totalAmount;
    },
    askPremium(state, action) {
      if (action.payload > 10000) {
        state.Premium = true;
      }
    },
    getdataAgain(state) {
      state.getdataAgain = !state.getdataAgain;
    },
  },
});

export const MyExpenseAction = MyExpenseSlice.actions; // add axpense funtion and myexpense.js index.js, these for add expensef orm
export const getExpenseAction = MyExpenseSlice.actions;
export const PrimiumAction = MyExpenseSlice.actions; //getexpense table expense.js index.js for show data into table
export default MyExpenseSlice.reducer;