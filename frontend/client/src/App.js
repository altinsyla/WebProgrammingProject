import React from 'react';
import './App.css';
import Login from "./views/Login.js";
import Register from './views/Register.js';
import Expenses from './views/Expenses.js';
import Dashboard from './views/Dashboard.js';


function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Register /> */}
      <Expenses />
      <Dashboard />
    </div>
  );
}

export default App;
