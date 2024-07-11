import React, { useState, useEffect } from "react";
import api from "../api";
import "./Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./IncomeDashboard.css";
import Swal from "sweetalert2";

function IncomeDashboard() {
  const [incomes, setIncomes] = useState([]);
  const history = useHistory();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState({
    amount: "",
    amountCondition: "equal",
    category: "",
    taxable: "",
    registeredDate: "",
    dateCondition: "equal",
  });
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [sortDirection, setSortDirection] = useState("asc");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push("/Login");
    Swal.fire({
      text: "You have been logged out successfully!",
      icon: "success",
    });
  };

  const getIncomes = async () => {
    try {
      const response = await api.get("/incomes", {
        params: { ...filter, page, limit, sortField, sortOrder },
      });
      setIncomes(response.data.income);
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
    getIncomes();
  }, [history, page, limit, sortField, sortOrder]);

  const deleteIncome = async (incomeId) => {
    try {
      await api.delete("/incomes/" + incomeId);
      Swal.fire({
        title: "Deleted!",
        text: "Your income has been deleted.",
        icon: "success",
      });
      getIncomes();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response.data.message, // Display the error message from the backend
        icon: "error",
      });
    }
  };

  const handleEdit = (incomeId) => {
    history.push("/incomes/edit/" + incomeId);
  };
  const confirmDelete = (incomeId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIncome(incomeId);
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: name === "amount" ? parseFloat(value) : value,
    });
  };

  const applyFilter = async () => {
    setPage(1);
    await getIncomes();
    setShowFilterModal(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    getIncomes();
  };
  const sortTable = () => {
    const sortedData = [...incomes].sort((a, b) => {
      if (sortDirection === "asc") {
        return b.taxable - a.taxable;
      } else {
        return a.taxable - b.taxable;
      }
    });
    setIncomes(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSortChange = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    getIncomes();
  };

  return (
    <div style={{ backgroundColor: '#F1EDED', height: "100vh" }}>
      <Sidebar />
      <div className="main-div">
        <Link to="/incomes" className="btn btn-primary mt-3 mr-2 mb-3">
          Add Income
        </Link>
        <button
          onClick={() => setShowFilterModal(true)}
          className="btn btn-success mt-3 mr-3 mb-3"
        >
          Filter
        </button>
        <button
          onClick={handleLogOut}
          className="btn btn-danger mt-3 mr-5 mb-3"
        >
          Log Out
        </button>
      </div>
      <table style={{width: '80%', display:'flex', flexDirection: "column", marginLeft: "270px"}}>
      <h2>Income Dashboard</h2>
        <thead>
          <tr className="mainheader">
            <th onClick={() => handleSortChange("source")}>
              Source{" "}
              {sortField === "source"
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
                : ""}
            </th>
            <th>Payment Method</th>
            <th>Category</th>
            <th>Description</th>
            <th onClick={sortTable} style={{ cursor: 'pointer' }}>
              Taxable
            </th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {incomes?.map((income) => (
            <tr className="contentrow" key={income._id}>
              <td>{income.source}</td>
              <td>{income.amount}</td>
              <td>{income.paymentMethod}</td>
              <td>{income.category}</td>
              <td>{income.description}</td>
              <td><input
                  type="checkbox"
                  checked={income.taxable}
                  readOnly
                  // disabled="disabled"  e hijezon edhe slen me prek
                /></td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  style={{ fontSize: "10px",  marginTop: '5px', marginBottom: '5px' }}
                  onClick={() => handleEdit(income._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger  mr-2"
                  style={{ fontSize: "10px", marginTop: '5px', marginBottom: '5px'}}
                  onClick={() => confirmDelete(income._id)}
                >
                  Delete
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
            <h2>Filter Incomes</h2>
            <div className="filter-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={filter.category}
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
              <label>Taxable:</label>
              <select
                name="taxable"
                value={filter.taxable}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="filter-buttons">
              <button onClick={applyFilter}>Apply</button>
              <button onClick={() => setShowFilterModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IncomeDashboard;
