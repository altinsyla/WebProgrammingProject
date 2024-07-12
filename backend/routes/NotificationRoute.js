const express = require("express");
const router = express.Router();
const checkAndNotify = require("../checkAndNotify");
const verifyToken = require("../verifyToken");
const Notification = require("../models/Notifications");

router.post("/check-notify", verifyToken, async (req, res) => {
  try {
    // qita ndreqe
    await checkAndNotify();
    res.status(200).json({ message: "Notification check completed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId });
    console.log(notifications);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
});

module.exports = router;
