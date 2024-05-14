const User = require('../Models/User');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require('express');

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).send("User registered");
    } catch (error) {
      res.status(500).json({ error: "Error on registation" });
    }
  });
  
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isvalid = await user.isValidPassword(password);
      if (isvalid) {
        // username edhe pw correct
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'qelsi', {
          expiresIn: "1d",
        });
  
        res.json(token); //kthehet tokeni si response
      }
    } else {
      res.status(404).json({ mesazhi: "Incorrect username or password" });
    }
  });

  module.exports = router;

