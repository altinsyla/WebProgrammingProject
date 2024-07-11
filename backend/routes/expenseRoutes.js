const express = require("express");
const Expense = require("../models/Expense");
const verifyToken = require("../verifyToken");
const { trusted } = require("mongoose");
const router = express.Router();
const checkAndNotify = require("../checkAndNotify");

router.post("/", verifyToken, async (req, res) => {
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

    await checkAndNotify(req.user.id, 2);
    await newExpense.save();
    res.status(201).json(newExpense);
    res.status(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const {
    name,
    amount,
    amountCondition,
    dateCondition,
    date,
    paid,
    paidCondition,
    page = 1,
    limit = 10,
    sortField,
    sortOrder,
  } = req.query;
  let query = { user: req.user.id };
  if (name) {
    query.category = { $regex: new RegExp(name, "i") };
  }
  if (amount) {
    const amountValue = parseFloat(amount);
    if (amountCondition === "equal") {
      query.amount = amountValue;
    } else if (amountCondition === "bigger") {
      query.amount = { $gt: amountValue };
    } else if (amountCondition === "smaller") {
      query.amount = { $lt: amountValue };
    }
  }
  if (date) {
    const dateValue = new Date(date);
    if (dateCondition === "equal") {
      query.date = dateValue;
    } else if (dateCondition === "bigger") {
      query.date = { $gt: dateValue };
    } else if (dateCondition === "smaller") {
      query.date = { $lt: dateValue };
    }
  }
  if (paid === "true" || paid === "false") {
    query.paid = paid;
  }
  const options = {
    skip: (page - 1) * limit,
    limit: parseInt(limit),
  };

  if (sortField && sortOrder) {
    options.sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };
  }

  try {
    const expense = await Expense.find(query, null, options);
    const total = await Expense.countDocuments(query);

    res.json({ expense, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one expense by ID
router.get("/:expenseId", verifyToken, async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findById(expenseId);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:expenseId", verifyToken, async (req, res) => {
  const { expenseId } = req.params; //alternativa osht req.params.expenseId
  const { category, amount, description, date, paid } = req.body;
  await checkAndNotify(req.user.id, 2)
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
  const { expenseId } = req.params; //alternativa osht req.params.expenseId
  try {
    await Expense.findByIdAndDelete(expenseId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
