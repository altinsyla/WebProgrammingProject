import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../src/api.js";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Expense.css";;

function Expenses() {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
    paid: false,
  });
  const history = useHistory();
  const { id } = useParams();
  const [isChecked, setIsChecked] = useState("false");
  useEffect(() => {
    console.log(id);
    if (id) {
      const fetchExpense = async () => {
        api.get("/expenses/" + id).then((response) => {
          setFormData({
            category: response.data.category,
            amount: response.data.amount,
            description: response.data.description,
            date: response.data.date.split("T")[0],
            paid: response.data.paid,
          });
          console.log(formData);
        });
      };
      fetchExpense();
    }
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        api.put("/expenses/" + id, formData).then((response) => {
          Swal.fire({
            text: "Expense successfully edited!",
            icon: "success",
          });
          history.push("/dashboard");
        });
      } else {
        api
          .post("/expenses", formData)
          .then((response) => {
            console.log(response);
            Swal.fire({
              text: "Expense successfully added!",
              icon: "success",
            });
            history.push("/dashboard");
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.response.data.message, // Display the error message from the backend
              icon: "error",
            });
          });
      }
    } catch (error) {
      console.error("Expense save error", error.response.data);
    }
  };

  //api/expenses: POST

  return (
    <div className="main-div-expenses">
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
              backgroundColor: "#f2f2f2",
              padding: "2rem 5rem",
              borderRadius: "20px",
            }}
          >
            <label>Set Category</label>
            <input
              onChange={onChange}
              type="text"
              placeholder="Category"
              name="category"
              required
              style={{ borderRadius: "5px", padding: "2px 1px" }}
              aria-placeholder="bold"
              value={formData.category}
            />

            <label>Set Amount</label>
            <input
              onChange={onChange}
              type="number"
              placeholder="Amount"
              name="amount"
              required
              style={{ borderRadius: "5px", padding: "2px 1px" }}
              value={formData.amount}
            />

            <label>Set Description</label>
            <input
              onChange={onChange}
              type="text"
              placeholder="Description"
              name="description"
              style={{ borderRadius: "5px", padding: "2px 1px" }}
              value={formData.description}
            />

          <label>Set Date</label>
          <input
            onChange={onChange}
            type="date"
            placeholder="Date"
            name="date"
            required
            style={{ borderRadius: "5px", padding: "2px 1px" }}
            value={formData.date}
          />
          <label>Paid</label>
          <input
            onChange={onChange}
            type="checkbox"
            name="paid"
            style={{ borderRadius: "5px", padding: "2px 1px" }}
            checked={formData.paid}
          />
          <div>
          <button
            type="submit"
            className="btn btn-success"
            style={{
              width: "fit-content",
              alignSelf: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {id ? "Edit expense" : "Add Expense"}
          </button>
          <Link to="/Dashboard" className="btn btn-danger">
            Go to Dashboard
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Expenses;
