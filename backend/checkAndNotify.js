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

    console.log("result1", result);
    console.log("result2", result2);
    const income = result2[0] ? result2[0].total : 0;
    const expenses = result[0] ? result[0].total : 0;

    console.log("Calculated Income:", income);
    console.log("Calculated Expenses:", expenses);

    if (action == 1) {
      if (expenses >= income) {
        throw new Error(
          "Expenses are greater than or equal to incomes. Cannot delete this income."
        );
      }
    } else if (action == 2) {
      if (expenses > 0 && income >= expenses) {
        throw new Error(
          `Failed: Your total amount of incomes:${income} is bigger than the amount of: ${expenses}`
        );
      }
    }

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
