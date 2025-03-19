require("dotenv").config();
const express = require("express");
const connectDb = require("./connection");
const routes = require("./routes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const requestLogs = require("./App/Middlewares/requestLogger");

const app = new express();

// parsing Middlewares
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// limiter middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

app.use(limiter);

// security middlewares
app.use(helmet());
app.use(cors()); // can add specific frontend origins later

app.use(requestLogs); // request logger

// Routes
app.use(routes);

async function startServer(port) {
  app.listen(port, () => {
    console.log(`Server is live on https:/localhost:${port}`);
  });
}
connectDb(process.env.mongoDb_url)
  .then(startServer(process.env.port))
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
