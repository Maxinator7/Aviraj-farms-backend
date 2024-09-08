const express = require("express");
const app = express();

const requestLogs = (req, res, next) => {
  const start = Date.now();

  const { method, url } = req;
  const timestamp = new Date().toISOString();

  // After response has been sent, log the response status and time taken
  res.on("finish", () => {
    const duration = Date.now() - start; // Time taken for the request
    const statusCode = res.statusCode;

    // Log the details to the console or we can store in files
    console.log(
      `[${timestamp}] ${method} ${url} ${statusCode} - ${duration}ms`
    );
  });

  next();
};

module.exports = requestLogs;
