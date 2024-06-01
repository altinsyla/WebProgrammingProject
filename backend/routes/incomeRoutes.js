const express = require("express");
const Income = require("../models/Income");
const verifyToken = require("../verifyToken");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  console.log("post income!");
  const {
    source,
    amount,
    paymentMethod,
    category,
    description,
    registeredDate,
  } = req.body;
  try {
    const newIncome = new Income({
      userID: req.user.id,
      source,
      amount,
      paymentMethod,
      category,
      description,
      registeredDate,
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  console.log("get incomes");

  const { category } = req.query;

  let query = { userID: req.user.id };
  if (category) {
    query.category = { $regex: new RegExp(category, "i") };
  }

  try {
    const income = await Income.find(query);
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:incomeId", verifyToken, async (req, res) => {
  console.log("get income");
  const { incomeId } = req.params;
  try {
    const income = await Income.findById(incomeId);
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:incomeId", verifyToken, async (req, res) => {
  console.log("update income");
  const { incomeId } = req.params;
  const {
    source,
    amount,
    paymentMethod,
    category,
    description,
    registeredDate,
  } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      incomeId,
      {
        source,
        amount,
        paymentMethod,
        category,
        description,
        registeredDate,
      },
      { new: true }
    );
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:incomeId", verifyToken, async (req, res) => {
  console.log("delete income");
  const { incomeId } = req.params;
  try {
    await Income.findByIdAndDelete(incomeId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
