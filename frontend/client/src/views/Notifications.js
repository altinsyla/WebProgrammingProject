import React, { useState, useEffect } from "react";
import api from "../api";
import Swal from "sweetalert2";

function Notifications() {
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
    <div>
      <h1>Notifications</h1>
      <button onClick={() => console.log(notifications)}>
        Delete Notifications
      </button>
      <ul>
        {notifications?.map((notification) => (
          <li key={notification._id}>
            {notification.message} -{" "}
            {new Date(notification.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
