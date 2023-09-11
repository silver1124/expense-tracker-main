import React, { useEffect, useRef, useState } from "react";
import "../Pages/MyExpense.css";
import { useDispatch, useSelector } from "react-redux";
import { MyExpenseAction } from "../../Store/MyExpenseSlice";
import { getExpenseAction } from "../../Store/MyExpenseSlice";
const MyExpense1 = () => {
  const InputDescriptionRef = useRef();
  const InputDateRef = useRef();
  console.log(InputDateRef);
  const InputExpenseRef = useRef();
  const InputCategoryRef = useRef();
  const [expense, setExpense] = useState([]);
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const emailID = localStorage.getItem("email");
  const replaceEmailid = emailID.replace("@", "").replace(".", "");
  //form submit handler
  const MyExpenseSubmitHandler = (event) => {
    event.preventDefault();
    const exprenseData = {
      description: InputDescriptionRef.current.value,
      date: InputDateRef.current.value,
      category: InputCategoryRef.current.value,
      amount: InputExpenseRef.current.value,
      id: Math.random().toString(),
    };
    console.log(exprenseData);
    dispatch(MyExpenseAction.addExpense(exprenseData));
    if (
      !exprenseData.description ||
      !exprenseData.date ||
      !exprenseData.category ||
      !exprenseData.amount
    ) {
      window.confirm("please provide each input feild value ");
    } else {
      fetch(
        `https://expense-tracker-c3fba-default-rtdb.firebaseio.com/expense/${replaceEmailid}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            exprenseData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          window.location.reload();
        })
        .then((data) => {
          console.log(data);
          InputDescriptionRef.current.value = "";
          InputDateRef.current.value = "";
          InputCategoryRef.current.value = "";
          InputExpenseRef.current.value = "";
        });
    }
  };

  //fetch(get) data and show in table
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://expense-tracker-c3fba-default-rtdb.firebaseio.com/expense/${replaceEmailid}.json/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        let updatedtotalAmount = 0;
        const newdata = [];
        for (let key in data) {
          newdata.push({ id: key, ...data[key] });
          updatedtotalAmount =
            updatedtotalAmount + Number(data[key].exprenseData.amount);
        }
        console.log(newdata);
        dispatch(
          getExpenseAction.getExpense({
            expense: newdata,
            totalAmount: updatedtotalAmount,
          })
        );
        setExpense(newdata);
      } else {
        console.log("error");
      }
    };
    getData();
  }, [dispatch, replaceEmailid]);

  //delete data from table
  const DeleteExpenseHandler = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this expense?")) {
        console.log(id);
        await fetch(
          `https://expense-tracker-c3fba-default-rtdb.firebaseio.com/expense/${replaceEmailid}/${id}.json/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            window.location.reload();
            console.log("deleted");
          } else {
            console.log("error");
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // edit data from table

  const EditExpenseHandler = async (editexpense) => {
    console.log(editexpense);
    try {
      const res = await fetch(
        `https://expense-tracker-c3fba-default-rtdb.firebaseio.com/expense/${replaceEmailid}/${editexpense.id}.json/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        InputExpenseRef.current.value = editexpense.exprenseData.amount;
        InputDescriptionRef.current.value =
          editexpense.exprenseData.description;
        InputCategoryRef.current.value = editexpense.exprenseData.category;
        InputDateRef.current.value = editexpense.exprenseData.date;
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
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
                  Add Expense-
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
              <form onSubmit={MyExpenseSubmitHandler}>
                <div className="modal-body">
                  <div className="form-group font-weight-bold">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control "
                      id="date"
                      aria-describedby="dateHelp"
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
                      <option value="Food">Food</option>
                      <option value="Salary">Salary</option>
                      <option value="Petrol">Petrol</option>
                      <option value="others">Others</option>
                    </select>
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
                    <td value={Expense.exprenseData.description}>
                      {Expense.exprenseData.description}
                    </td>
                    <td value={Expense.exprenseData.category}>
                      {Expense.exprenseData.category}
                    </td>
                    <td value={Expense.exprenseData.amount}>
                      {Expense.exprenseData.amount}
                    </td>
                    <td value={Expense.exprenseData.date}>
                      {Expense.exprenseData.date}
                    </td>
                    <td>
                      <button
                        className=" btn bg-white border border-primary font-weight-bold"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => EditExpenseHandler(Expense)}
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        className=" btn bg-white border border-primary font-weight-bold ml-2"
                        onClick={() => DeleteExpenseHandler(Expense.id)}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th colSpan="4">Subtotal</th>
                <th>{totalAmount}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyExpense1;