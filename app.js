require("dotenv").config();
const express = require("express");
const products = require("./routers/product.router");
const dbConnection = require("./db/db.connect");
const user = require("./routers/user.router");
const cors = require("cors");
const routeNotFound = require("./middleware/route-not-found");
const errorHandler = require("./middleware/error-handler");
const login = require("./routers/login.router");
const authVerify = require("./middleware/auth-verify");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use("/products", products);
app.use("/login", login);
app.use("/user", authVerify, user);
app.use(routeNotFound);
app.use(errorHandler);
dbConnection();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// hosted server url
// https://node-server-k3tz.onrender.com/products