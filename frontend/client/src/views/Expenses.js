import React, { useState } from "react";
import axios from "axios";
import api from "../../src/api.js";

function Expenses() {

    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        description: '',
        date: ''
    });

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
        console.log('Form Data');
        console.log(formData);
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {
            api.post('/expenses', formData)
            .then(response => {
              console.log(response);
    
            })
            .catch(err =>{
              console.log('cannot save expenses!');
            })
    
          } catch (error) {
            console.error('Expense save error', error.response.data);
          }
    
    }

    //api/expenses: POST
    
    return (
        <div
      style={{
          display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <form onSubmit={onSubmit}
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
        <input onChange={onChange} type="text" placeholder="Category" name="category" required style={{borderRadius: '5px', padding: '2px 1px'}} aria-placeholder="bold"/>

        <label>Set Amount</label>
        <input onChange={onChange} type="number" placeholder="Amount" name="amount" required style={{borderRadius: '5px', padding: '2px 1px'}}/>

        <label>Set Description</label>
        <input onChange={onChange} type="text" placeholder="Description" name="description" style={{borderRadius: '5px', padding: '2px 1px'}}/>

        <label>Set Date</label>
        <input onChange={onChange}type="date" placeholder="Date" name="date" required style={{borderRadius: '5px', padding: '2px 1px'}}/>


        <button type= 'submit' style={{width: "fit-content", alignSelf: 'center', marginTop: '2rem', borderRadius: '10px', backgroundColor: 'gray', color: 'white', fontSize: '20px'}}>Add Expense</button>
      </form>
    </div>
  );
}

export default Expenses;
