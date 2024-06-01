import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../src/api.js";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import './Income.css';

function Incomes() {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    paymentMethod: "",
    category: "",
    description: "",
    registeredDate: ""
  });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    if (id) {
      const fetchIncome = async () => {
        api.get("/incomes/" + id).then((response) => {
          setFormData({
            source: response.data.source,
            amount: response.data.amount,
            paymentMethod: response.data.paymentMethod,
            category: response.data.category,
            description: response.data.description,
            registeredDate: response.data.registeredDate.split("T")[0],
          });
          console.log(formData);
        });
      };
      fetchIncome();
    }
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        api.put("/incomes/" + id, formData).then((response) => {
          Swal.fire({
            text: "Income successfully edited!",
            icon: "success",
          });
          history.push("/incomedashboard");
        });
      } else {
        api
          .post("/incomes", formData)
          .then((response) => {
            console.log(response);
            Swal.fire({
              text: "Income successfully added!",
              icon: "success",
            });
            history.push("/incomedashboard");
          })
          .catch((err) => {
            console.log("cannot save incomes!");
          });
      }
    } catch (error) {
      console.error("Income save error", error.response.data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            backgroundColor: "#F0E5E3",
            padding: "2rem 5rem",
            borderRadius: "10px",
            marginTop: '2rem',
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h1 className="income-header">Income Form</h1>
          <label className="income-label">Set Source</label>
          <input
            onChange={onChange}
            type="text"
            placeholder="e.g. Business, Crypto..."
            name="source"
            required
            className="income-input"
            value={formData.source}
          />

          <label className="income-label">Set Amount</label>
          <input
            onChange={onChange}
            type="number"
            placeholder="Amount"
            name="amount"
            required
            className="income-input"
            value={formData.amount}
          />
          <label className="income-label">Payment Method</label>
          <input
            onChange={onChange}
            type="text"
            name="paymentMethod"
            placeholder="e.g. Cash, Bank..."
            required
            className="income-input"
            value={formData.paymentMethod}
          />

          <label className="income-label">Set Category</label>
          <input
            onChange={onChange}
            type="text"
            name="category"
            placeholder="e.g. Active, passive..."
            required
            className="income-input"
            value={formData.category}
          />

          <label className="income-label">Set Description</label>
          <input
            onChange={onChange}
            type="text"
            name="description"
            placeholder="Description"
            className="income-input"
            value={formData.description}
          />

          <label className="income-label">Set Date</label>
          <input
            onChange={onChange}
            type="date"
            name="registeredDate"
            className="income-input"
            value={formData.registeredDate}
          />
          <div className="incomes-buttons">
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "fit-content",
              alignSelf: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {id ? "Edit Income" : "Add Income"}
          </button>
          <Link to="/incomedashboard" className="btn btn-danger">
            Go to Dashboard
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Incomes;
