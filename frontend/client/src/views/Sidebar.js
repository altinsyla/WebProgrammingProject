import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../api";
import Swal from "sweetalert2";
import "./Sidebar.css";

function Sidebar() {
  const [notifications, setNotifications] = useState([]);
  const [userID, setuserID] = useState(localStorage.getItem("userID"));

  const getNotifications = async () => {
    try {
      const response = await api.get("/notifications/" + userID);
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch notifications",
        icon: "error",
      });
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="main-div-sidebar">
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/dashboard">Expenses</Link>
          </li>
          <li>
            <Link to="/incomedashboard">Incomes</Link>
          </li>
          <li>
            <Link to="/Notifications">Notifications ({notifications.length})</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
