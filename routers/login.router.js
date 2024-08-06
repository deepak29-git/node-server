const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

router.route("/").post(async (req, res) => {
  const userData = req.body;
  try {
    const isAuth = await authModel.find(userData);
    if (isAuth.length) {
      const token = jwt.sign({ userName: "deepak" }, secret, {
        expiresIn: "1hr",
      });
      res.json({ token });
    } else {
      res.status(404).json({ message: "No account found in DB" });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
