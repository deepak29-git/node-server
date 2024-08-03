const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const userDb = [
  {
    email: "test@gmail.com",
    password: "test@123",
  },
];
router.route("/").post((req, res) => {
  const userData = req.body;
  const user = userDb.find(
    (item) =>
      item.email === userData.email && item.password === userData.password
  );
  if (user) {
    const token = jwt.sign({ userName: "deepak" }, secret, {
      expiresIn: "1hr",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
});

module.exports = router;
