const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@deepakcluster.8zyjaro.mongodb.net/?retryWrites=true&w=majority&appName=deepakCluster`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("monogo db connected successfully");
  } catch (error) {
    console.log("db connection failed", err);
  }
};

module.exports = dbConnection;
