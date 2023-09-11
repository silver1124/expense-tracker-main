import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getExpenseAction } from "../../Store/MyExpenseSlice";

const TableExpense = () => {
  const [expense, setExpense] = useState([]);
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const emailID = localStorage.getItem("email");
  const replaceEmailid = emailID.replace("@", "").replace(".", "");

  // const expenses = useSelector((state) => state.expense.expense);
  // console.log(expenses);

  //get data and show in database
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
      if (response.ok) {
        let updatedtotalAmount = 0;
        const newdata = [];
        for (let key in data) {
          newdata.push({ id: key, ...data[key] });
          updatedtotalAmount =
            updatedtotalAmount + Number(data[key].expense.amount);
        }
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
  }, [dispatch]);

  //Edit data (table data)
  const EditExpenseHandler = (id) => {
    // fetch(
    //   `https://expensetrackernew-86302-default-rtdb.firebaseio.com/expense.json/${id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
  };
  //delete data (table data)
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
            console.log("deleted");

            // console.log(res
          } else {
            console.log("error");
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-responsive ">
      <button className="mt-5 btn-sm btn-success border ">
        <i className="fa fa-download ml-2 mr-2" aria-hidden="true"></i>Download
        CSV
      </button>
      <table
        className="table table-striped table-bordered table-hover Expensetable table-lg mt-2"
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
          {expense.map((item) => (
            <tr key={item.id} className="tablebody" id="tabletr">
              <td>{item.expense.description}</td>
              <td>{item.expense.category}</td>
              <td>{item.expense.amount}</td>
              <td>{item.expense.date}</td>

              <td>
                <Link
                  className="btn btn-primary text-white"
                  onClick={() => EditExpenseHandler(item.id)}
                >
                  Edit
                </Link>

                <Link
                  className="btn btn-primary text-white ml-3"
                  onClick={() => DeleteExpenseHandler(item.id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
          <tr>
            <th colSpan="4">Subtotal</th>
            <th>{totalAmount}</th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Expense Description </th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableExpense;