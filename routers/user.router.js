const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.json({ name: "deepak", pin: "4342" });
});

module.exports = router;
