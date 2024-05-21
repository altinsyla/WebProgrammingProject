import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../src/api.js";
import { Link, useHistory, useParams } from "react-router-dom";

function Expenses() {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
  });
  const history = useHistory();
  const { id } = useParams();

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
          });
          console.log(formData);
        });
      };
      fetchExpense();
    }
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Form Data");
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        api.put("/expenses/" + id).then((response) => {
          alert("Expense edited!");
          history.push("/dashboard");
        });
        api
          .post("/expenses", formData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log("cannot save expenses!");
          });
      }
    } catch (error) {
      console.error("Expense save error", error.response.data);
    }
  };

  //api/expenses: POST

  return (
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

        <button
          type="submit"
          style={{
            width: "fit-content",
            alignSelf: "center",
            marginTop: "2rem",
            borderRadius: "10px",
            backgroundColor: "gray",
            color: "white",
            fontSize: "20px",
          }}
        >
          Add Expense
        </button>
        <Link to="/Dashboard" className="btn btn-danger mr-2">
          Go to Dashboard
        </Link>
      </form>
    </div>
  );
}

export default Expenses;
