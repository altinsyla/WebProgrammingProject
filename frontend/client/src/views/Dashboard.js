import React, { useState, useEffect, useSyncExternalStore } from "react";
import api from "../api";
import "./Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const history = useHistory();
  const [showFilterModal, setshowFilterModal] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    amount: "",
    amountCondition: "equal",
    paid: "",
    date: "",
    dateCondition: "equal",
  });
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push("/Login");
    Swal.fire({
      text: "You have been logged out successfully!",
      icon: "success",
    });
  };

  const getExpenses = async () => {
    try {
      const response = await api.get("/expenses", {
        params: { ...filter, page, limit, sortField, sortOrder },
      });
      setExpenses(response.data.expense);
      setTotal(response.data.total);
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
  }, [page, limit, sortField, sortOrder]);

  const deleteExpense = async (expenseId) => {
    try {
      await api.delete("/expenses/" + expenseId);
      Swal.fire({
        title: "Deleted!",
        text: "Your expense has been deleted.",
        icon: "success",
      });
      getExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete expense!",
        icon: "error",
      });
    }
  };
  const handleEdit = (expenseId) => {
    history.push("/expenses/edit/" + expenseId);
  };

  const confirmDelete = (expenseId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExpense(expenseId);
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = async () => {
    setPage(1);
    const response = await api.get("/expenses", { params: filter });
    setExpenses(response.data);
    setshowFilterModal(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    getExpenses();
  };

  const handleSortChange = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="background-dashbaord">
    <div style={{ backgroundColor: "#F1EDED", height: "100vh" }}>
      <Sidebar />
      <div className="main-div">
        <Link to="/Expenses" className="btn btn-primary mt-3 mr-2">
          Add Expense
        </Link>
        <button
          onClick={() => setshowFilterModal(true)}
          className="btn btn-success mt-3 mr-2"
        >
          Filter
        </button>
        <button onClick={handleLogOut} className="btn btn-danger mt-3 mr-5">
          Log Out
        </button>
      </div>

      <table
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "270px",
        }}
      >
        <thead>
          <h2>Expense Dashboard</h2>
          <tr className="mainheader">
            <th onClick={() => handleSortChange("category")}>
              Category{" "}
              {sortField === "category"
                ? sortOrder === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
            <th onClick={() => handleSortChange("amount")}>
              Amount{" "}
              {sortField === "amount"
                ? sortOrder === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}</th>
            <th>Description</th>
            <th onClick={() => handleSortChange("date")}>
              Date{" "}
              {sortField === "date"
                ? sortOrder === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}</th>
            <th>Paid</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr backgroundColor="#c0d6fa" className="contentrow" key={expense.id}>
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
                  style={{
                    fontSize: "10px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={() => handleEdit(expense._id)}
                >
                  <img className="img1" src={require("../assets/img/brand/edit-246.png")} />
                </button>
                <button
                  className="btn btn-danger mr-2"
                  style={{
                    fontSize: "10px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={() => confirmDelete(expense._id)}
                >
                   <img className="img1" src={require("../assets/img/brand/delete-589.png")} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

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
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={filter.description}
                onChange={handleFilterChange}
              />
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
            <div className="filter-buttons">
              <button onClick={applyFilter}>Apply Filter</button>
              <button onClick={() => setshowFilterModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;
