const express = require("express");
const Income = require("../models/Income");
const verifyToken = require("../verifyToken");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const {
    source,
    amount,
    paymentMethod,
    category,
    description,
    taxable,
  } = req.body;
  try {
    const newIncome = new Income({
      userID: req.user.id,
      source,
      amount,
      paymentMethod,
      category,
      description,
      taxable: Boolean(taxable),
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const {
    category,
    amount,
    amountCondition,
    registeredDate,
    dateCondition,
    taxable,
    page = 1,
    limit = 10,
    sortField,
    sortOrder,
  } = req.query;

  let query = {};
  if (category) {
    query.category = { $regex: new RegExp(category, "i") };
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
  if (registeredDate) {
    const dateValue = new Date(registeredDate);
    if (dateCondition === "equal") {
      query.registeredDate = dateValue;
    } else if (dateCondition === "bigger") {
      query.registeredDate = { $gt: dateValue };
    } else if (dateCondition === "smaller") {
      query.registeredDate = { $lt: dateValue };
    }
  }

  if (taxable === "true" || taxable === "false") {
    query.taxable = taxable;
  }
  const options = {
    skip: (page - 1) * limit,
    limit: parseInt(limit),
  };
  if (sortField && sortOrder) {
    options.sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };
  }

  try {
    const income = await Income.find(query, null, options);
    const total = await Income.countDocuments(query);
    res.json({ income, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:incomeId", verifyToken, async (req, res) => {
  const { incomeId } = req.params;
  try {
    const income = await Income.findById(incomeId);
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:incomeId", verifyToken, async (req, res) => {
  const { incomeId } = req.params;
  const {
    source,
    amount,
    paymentMethod,
    category,
    description,
    taxable,
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
        taxable: Boolean(taxable),
      },
      { new: true }
    );
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:incomeId", verifyToken, async (req, res) => {
  const { incomeId } = req.params;
  try {
    await Income.findByIdAndDelete(incomeId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
