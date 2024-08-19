require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//rest of packages
const morgan = require("morgan");

//database
const connectDB = require("./db/connect");

//routes
const authRoutes = require("./routes/authRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce api");
});
app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
