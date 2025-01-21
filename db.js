const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase", {});
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Error connecting to MongoDB", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
