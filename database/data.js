const { v4: uuidv4 } = require("uuid");

const data = {
  products: [
    { id: uuidv4(), name: "glass", price: 121 },
    { id: uuidv4(), name: "sd", price: 44 },
    { id: uuidv4(), name: "ds", price: 21 },
  ],
};
module.exports = data;
