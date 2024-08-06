const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Todos", todoSchema);
