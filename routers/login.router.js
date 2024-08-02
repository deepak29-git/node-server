const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const userDb = [
  {
    userName: "deepak",
    password: "deepak@29",
  },
];
router.route("/").post((req, res) => {
  const userData = req.body;
  const user = userDb.find(
    (item) =>
      item.userName === userData.userName && item.password === userData.password
  );
  if (user) {
    const token = jwt.sign({ userId: "dg" }, secret, { expiresIn: "1hr" });
    res.json({ userName: userData.userName, token });
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
});

module.exports = router;
