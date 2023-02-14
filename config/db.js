const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
const DB = process.env.DB;
const PATH = `${URI}/${DB}`;

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(PATH);
    console.log(`MongoDB connected to: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
