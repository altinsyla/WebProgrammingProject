import React, {useState, useEffect} from "react";
import api from '../api';

function Dashboard() {
    const[expenses, setExpenses] = useState([]);

    useEffect(() => {
        const getExpenses = async() => {
            const response = await api.get('/expenses');
            setExpenses(response.data);
        }
        getExpenses();
    }, []);
  return (
    <div>
      <h1>Shpenzimet</h1>
      {expenses.map(expense => (
        <p>
           {expense.category}: {expense.amount} - {expense.description} on {new Date(expense.date).toLocaleDateString()} 
        </p>
      ))}
    </div>
  );
}

export default Dashboard;
