import React from "react";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Expenses from "./views/Expenses.js";
import Dashboard from "./views/Dashboard.js";
// import Income from './views/Income.js';
import Incomes from './views/Incomes.js';
import { BrowserRouter, Route, Switch } from "react-router-dom"; // per linqe
import IncomeDashboard from "./views/IncomeDashboard.js";

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
        <Route exact path="/incomedashboard">
          <IncomeDashboard />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/Expenses/edit/:id">
          <Expenses />
        </Route>
        <Route exact path="/incomes">
          <Incomes />
        </Route>
        <Route exact path="/incomes/edit/:id">
          <Incomes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
