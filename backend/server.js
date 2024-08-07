const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;
const jwt = require("jsonwebtoken");
const User = require("./Models/User");
const verifyToken = require("./verifyToken.js");
const authRoutes = require("./routes/authRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const notificationsRoute = require("./routes/NotificationRoute.js");

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://flamurisa21:flamurisa123.@webprogramim.r0ojtdh.mongodb.net/?retryWrites=true&w=majority&appName=WebProgramim";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Couldn't connect to MongoDB", error));

app.get("/api/check-token", verifyToken /* Middleware*/, (req, res) => {
  res.json(req.user);
});

app.get("/api/test", async (req, res) => {});

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post("/api/user", async (req, res) => {
  const newUser = new User({
    name: "test",
    gender: "f",
  });
  const savedUser = await newUser.save();
  res.json(savedUser);
});

app.put("/api/user/:id", async (req, res) => {
  const { id } = req.params; // ose const id = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      name: "Taulant",
    },
    { new: true }
  );
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/notifications", notificationsRoute);

