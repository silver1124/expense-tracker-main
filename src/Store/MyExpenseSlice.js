import { createSlice } from "@reduxjs/toolkit";
const initialExpenseState = {
  expense: [],
  totalAmount: 0,
};
const MyExpenseSlice = createSlice({
  name: "myexp",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
    },
    getExpense(state, action) {
      state.expense = action.payload.expense;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const MyExpenseAction = MyExpenseSlice.actions; // add axpense funtion and myexpense.js index.js, these for add expensef orm
export const getExpenseAction = MyExpenseSlice.actions; //getexpense table expense.js index.js for show data into table
// export const getExpenseAction = MyExpenseSlice.actions;
export default MyExpenseSlice.reducer;