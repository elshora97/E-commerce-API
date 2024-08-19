require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`app is up and running on port: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
