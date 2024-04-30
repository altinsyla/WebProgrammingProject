/*
npm init -y
npm install express mongoose cors
npm install --save-dev nodemon
*/

const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;
const jwt = require("jsonwebtoken");
const User = require("./Models/User");
const bcrypt = require("bcryptjs");
const verifyToken = require("./verifyToken.js");

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://altinsyla997:altinsyla123@webprogramming.wluex0n.mongodb.net/?retryWrites=true&w=majority&appName=WebProgramming";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Couldn't connect to MongoDB", error));

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).json({ error: "Error on registation" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isvalid = await user.isValidPassword(password);
    if (isvalid) {
      // username edhe pw correct
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'qelsi', {
        expiresIn: "1h",
      });

      res.json(token); //kthehet tokeni si response
    }
  } else {
    res.status(404).json({ mesazhi: "Incorrect username or password" });
  }
});

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
/*
   npx create-react-app client
   cd client
   npm install axios
   inside client/src/ create a new file UserList.js
   */
