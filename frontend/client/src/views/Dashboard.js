import React, { useState, useEffect } from "react";
import api from "../api";
import "./Dashboard.css";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState("");

  const [showFilterModal, setshowFilterModal] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    amount: "",
    amountCondition: "equal",
    paid: "",
    date: "",
    dateCondition: "equal",
  });

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
    history.push("/expenses/edit/" + expenseId);
  };

  const confirmDelete = (expenseId) => {
    setShowModal(true);
    setDeleteExpenseId(expenseId);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = async () => {
    const response = await api.get("/expenses", { params: filter });
    setExpenses(response.data);
    setshowFilterModal(false);
  };

  return (
    <div className="mt-5">
      <Link to="/Expenses" className="btn btn-primary mr-2">
        Add Expense
      </Link>
      <button onClick={handleLogOut} className="btn btn-primary mr-2">
        Log Out
      </button>
      <button
        onClick={() => setshowFilterModal(true)}
        className="btn btn-primary mr-2"
      >
        Filter
      </button>
      <table>
        <thead>
          <tr className="mainheader">
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Paid</th>
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
                <input
                  type="checkbox"
                  checked={expense.paid}
                  readOnly
                  // disabled="disabled"  e hijezon edhe slen me prek
                />
              </td>
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
      {showFilterModal && (
        <div className="filter-overlay">
          <div className="filter-dialog">
            <h2>Filter Expenses</h2>
            <div className="filter-group">
              <label>Category:</label>
              <input
                type="text"
                name="name"
                value={filter.name}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={filter.amount}
                onChange={handleFilterChange}
              />
              <select
                name="amountCondition"
                value={filter.amountCondition}
                onChange={handleFilterChange}
              >
                <option value="equal">Equal</option>
                <option value="bigger">Bigger</option>
                <option value="smaller">Smaller</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Paid:</label>
              <select
                name="paid"
                value={filter.paid}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={filter.date}
                onChange={handleFilterChange}
              />
              <select
                name="dateCondition"
                value={filter.dateCondition}
                onChange={handleFilterChange}
              >
                <option value="equal">Equal</option>
                <option value="bigger">Bigger</option>
                <option value="smaller">Smaller</option>
              </select>
            </div>
            <div className="filter-buttons">
              <button onClick={applyFilter}>Apply Filter</button>
              <button onClick={() => setshowFilterModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
