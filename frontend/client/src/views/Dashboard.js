import React, { useState, useEffect } from "react";
import api from "../api";
import "./Dashboard.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const history = useHistory();
  const handleLogOut = async(event) => {
    localStorage.removeItem('token');
    history.push('/Login')
  }
  // const handleDelete = (id) = async(event) => {
  //   try {
  //     const id = req.params.id;
  //     const deletedItem = await api.delete("/expenses/:id");
  //     deletedItem(response.data);
  //   } catch (err) {
  //     console.log("You need to be logged in first!");
  //   }
  // }

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await api.get("/expenses");
        setExpenses(response.data);
      } catch (err) {
        console.log("You need to be logged in first!");
      }
    };
    getExpenses();
  }, []);
  return (
    <div className="mt-5">
        <Link to="/Expenses" className="btn btn-primary mr-2">
          Add Expense
        </Link>
        <button onClick={handleLogOut} className="btn btn-primary mr-2">Log Out</button>
      <table>
        <thead>
          <tr className="mainheader">
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Buttons</th>
          </tr>
          {expenses.map((expense) => (
            <tr className="contentrow">
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  style={{ fontSize: "10px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mr-2"
                  style={{ fontSize: "10px" }}
                  // onClick={handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}

export default Dashboard;
