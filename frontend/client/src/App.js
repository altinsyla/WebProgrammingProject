import React from "react";
import "./App.css";
import Login from "./views/login.js";
import Register from "./views/register.js";
import Expenses from "./views/Expenses.js";
import Dashboard from "./views/Dashboard.js";
// import Income from './views/Income.js';
import Incomes from './views/Incomes.js';
import { BrowserRouter, Route, Switch } from "react-router-dom"; // per linqe
import IncomeDashboard from "./views/IncomeDashboard.js";
import Notifications from "./views/Notifications.js";

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

        <Route exact path="/Notifications">
        <Notifications></Notifications>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
