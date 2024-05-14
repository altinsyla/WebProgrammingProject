import React from 'react';
import './App.css';
import Login from "./views/Login.js";
import Register from './views/Register.js';
import Expenses from './views/Expenses.js';
import Dashboard from './views/Dashboard.js';
import { BrowserRouter, Route, Switch } from "react-router-dom"; // per linqe


function App() {
  return (
<BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/Register">
          <Register />
        </Route>

        <Route exact path="/Expenses">
          <Expenses />
        </Route>

        <Route exact path="/Dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
