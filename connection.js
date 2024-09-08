const mongoose = require("mongoose");

async function connectDb(path) {
  try {
    mongoose.connect(path);
    console.log(`DB connected ready to accept connections`);
  } catch (error) {
    console.log(`Error encountered while connectiong to DB`);
  }
}

module.exports = connectDb;
