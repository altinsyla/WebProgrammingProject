const express = require('express');
const Expense = require('../models/Expense');
const verifyToken = require('../verifyToken');
const router = express.Router();

router.post('/', verifyToken, async(req,res) => {
    console.log('post expense!')
    const { category, amount, description, date } = req.body;
    try {
        const newExpense = new Expense({ user: req.user.id, category, amount, description, date });
        await newExpense.save();
        res.status(201).json(newExpense);
      } catch (error) {
        res.status(400).json({ message: error.message});
      }
});


router.get('/', verifyToken, async(req, res) => {
    console.log('get expenses');
    try{
        const expense = await Expense.find({user: req.user.id});
        res.json(expense);

    }catch(error){
        res.status(500).json({message: error.message});

    }
});

//Get one expense by ID
router.get('/:expenseId', verifyToken, async(req, res) => {
    console.log('get expenses');
    const {expenseId} = req.params;
    try{
        const expense = await Expense.findById(expenseId);
        res.json(expense);

    }catch(error){
        res.status(500).json({message: error.message});

    }
});


router.put('/:expenseId', verifyToken, async(req, res) => {
    console.log('update expense');
    const {expenseId} = req.params; //alternativa osht req.params.expenseId
    console.log(expenseId);
    const { category, amount, description, date } = req.body;

    try{
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            category,
            amount,
            description,
            date
        }, {new: true});
        res.json(updatedExpense);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
    });

router.delete('/:expenseId', verifyToken, async(req, res) => {
    console.log('delete expense');
    const {expenseId} = req.params; //alternativa osht req.params.expenseId
    console.log(expenseId);
  try {
    await Expense.findByIdAndDelete(expenseId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;