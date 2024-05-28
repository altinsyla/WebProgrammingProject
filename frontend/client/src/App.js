import React from "react";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Expenses from "./views/Expenses.js";
import Dashboard from "./views/Dashboard.js";
import Income from './views/Income.js';
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
        <Route exact path="/Expenses/edit/:id">
          <Expenses />
        </Route>
        <Route exact path="/income">
          <Income />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
