import React, { useState, useEffect } from "react";
import api from "../api";
import "./Dashboard.css";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState("");
  const [updateExpense, setUpdateExpense] = useState('');

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push("/Login");
  };

  const getExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
      return;
    }
    getExpenses();
  }, [history]);

  const deleteExpense = async () => {
    await api.delete("/expenses/" + deleteExpenseId);
    setShowModal(false);
    getExpenses();
    alert("Expense deleted!");
  };

  const handleEdit = (expenseId) => {
    history.push('/expenses/edit/' + expenseId);
  }

  const confirmDelete = (expenseId) => {
    setShowModal(true);
    setDeleteExpenseId(expenseId);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-5">
      <Link to="/Expenses" className="btn btn-primary mr-2">
        Add Expense
      </Link>
      <button onClick={handleLogOut} className="btn btn-primary mr-2">
        Log Out
      </button>
      <table>
        <thead>
          <tr className="mainheader">
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr className="contentrow" key={expense.id}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  style={{ fontSize: "10px" }}
                  onClick={() => handleEdit(expense._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mr-2"
                  style={{ fontSize: "10px" }}
                  onClick={() => confirmDelete(expense._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="confirmDialog">
          <p>Are you sure you want to delete this expense?</p>
          <button onClick={deleteExpense} className="buttonsYes">
            Yes
          </button>
          <button onClick={cancelDelete} className="buttonsNo">
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
