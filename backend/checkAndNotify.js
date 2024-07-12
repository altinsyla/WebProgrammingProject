const mongoose = require("mongoose");
const Income = require("./models/Income");
const Expense = require("./models/Expense");
const Notification = require("./models/Notifications");

const checkAndNotify = async (userId, action) => {
  try {
    if (!userId || !action) {
      throw new Error("userId or action is undefined");
    }

    const result = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const result2 = await Income.aggregate([
      { $match: { userID: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const income = result2[0] ? result2[0].total : 0;
    const expenses = result[0] ? result[0].total : 0;

    console.log("Calculated Income:", income);
    console.log("Calculated Expenses:", expenses);

    if (action == 1) {
      if (expenses >= income) {
        await Notification.create({
          userId: userId,
          message: "Attempted to delete an income when expenses were higher.",
        });
        throw new Error(
          "Expenses are greater than or equal to incomes. Cannot delete this income."
        );
      }
    } else if (action == 2) {
      if (expenses > 0 && income <= 0) {
        await Notification.create({
          userId: userId,
          message: "Attempted to add an expense when there were no incomes.",
        });
        throw new Error(
          `Failed: There are no incomes, cannot add expenses.`
        );
      } else if (income <= expenses) {
        await Notification.create({
          userId: userId,
          message: `Failed: Your total amount of incomes: ${income} is less than the amount of expenses: ${expenses}`,
        });
        throw new Error(
          `Failed: Your total amount of incomes: ${income} is less than the amount of expenses: ${expenses}`
        );
      }
    }

    // General notification about checking balance
    await Notification.create({
      userId: userId,
      message: "Checked and notified about income and expenses balance.",
    });

    

  } catch (error) {
    console.error("Error in checkAndNotify:", error);
    throw error; // Propagate the error up
  }
};

module.exports = checkAndNotify;
