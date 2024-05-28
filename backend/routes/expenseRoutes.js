const express = require("express");
const Expense = require("../models/Expense");
const verifyToken = require("../verifyToken");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  console.log("post expense!");
  const { category, amount, description, date, paid } = req.body;
  try {
    const newExpense = new Expense({
      user: req.user.id,
      category,
      amount,
      description,
      date,
      paid: Boolean(paid),
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  console.log("get expenses");

  const { name, amount, dateCondition, amountCondition, date } = req.query;

  let query = { user: req.user.id };
  if (name) {
    query.category = { $regex: new RegExp(name, "i") };
  }

  try {
    const expense = await Expense.find(query);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one expense by ID
router.get("/:expenseId", verifyToken, async (req, res) => {
  console.log("get expenses");
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findById(expenseId);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:expenseId", verifyToken, async (req, res) => {
  console.log("update expense");
  const { expenseId } = req.params; //alternativa osht req.params.expenseId
  const { category, amount, description, date, paid } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        category,
        amount,
        description,
        date,
        paid: Boolean(paid),
      },
      { new: true }
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:expenseId", verifyToken, async (req, res) => {
  console.log("delete expense");
  const { expenseId } = req.params; //alternativa osht req.params.expenseId
  try {
    await Expense.findByIdAndDelete(expenseId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
