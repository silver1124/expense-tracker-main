import React, { useRef, useState } from "react";
import "../Pages/MyExpense.css";

const MyExpense = () => {
  const InputDescriptionRef = useRef();
  const InputDateRef = useRef();
  const InputExpenseRef = useRef();
  const InputCategoryRef = useRef();
  const [expense, setExpense] = useState([]);

  const MyExpenseHandler = (event) => {
    event.preventDefault();
    const exprenseData = {
      description: InputDescriptionRef.current.value,
      date: InputDateRef.current.value,
      amount: InputExpenseRef.current.value,
      category: InputCategoryRef.current.value,
      id: Math.random().toString(),
    };
    setExpense((prev) => {
      return [...prev, exprenseData];
    });
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4 ">
          <div className="card ">
            <div className="card-body bg-primary border border-primary rounded cardExpenseBtn">
              <button
                className=" btn bg-white border border-primary font-weight-bold"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
        {/* model */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-primary">
              <div className="modal-header">
                <h4
                  className="modal-title text-primary"
                  id="exampleModalCenterTitle"
                >
                  Add Expense
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={MyExpenseHandler}>
                <div className="modal-body">
                  <div className="form-group font-weight-bold">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control "
                      id="date"
                      aria-describedby="emailHelp"
                      placeholder="Enter Expenses.."
                      ref={InputDateRef}
                    />
                  </div>
                  <div className="form-group font-weight-bold">
                    <label htmlFor="expense">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="expense"
                      aria-describedby="emailHelp"
                      placeholder="Enter Expenses.."
                      ref={InputExpenseRef}
                    />
                  </div>
                  <div className="form-group font-weight-bold">
                    <label htmlFor="des">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="des"
                      placeholder=" Enter Description.."
                      ref={InputDescriptionRef}
                    />
                  </div>
                  <div classhtml="form-group">
                    <label htmlFor="category " className="font-weight-bold">
                      Category
                    </label>
                    <select
                      className="form-select form-select-sm form-control"
                      id="category"
                      placeholder="Confirm Password"
                      aria-label=".form-select-sm example"
                      ref={InputCategoryRef}
                    >
                      <option selected>Category</option>
                      <option defaultValue="1">Food</option>
                      <option defaultValue="2">Salary</option>
                      <option defaultValue="3">Petrol</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn bg-white border border-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="table-responsive ">
          <table
            className="table table-striped table-bordered table-hover Expensetable table-lg mt-5"
            id="expenseTable"
          >
            <thead className="table-dark">
              <tr>
                <th>Expense Description </th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((Expense) => {
                return (
                  <tr key={Expense.id}>
                    <td>{Expense.description}</td>
                    <td>{Expense.category}</td>
                    <td>{Expense.amount}</td>
                    <td>{Expense.date}</td>
                    <td>
                      <a className="btn btn-primary text-white">Edit</a>
                      <a className="btn btn-primary text-white ml-3">Delete</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyExpense;