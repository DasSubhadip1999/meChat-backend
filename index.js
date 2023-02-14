require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/user/userRoute"));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Welcome to MeChat" });
});

app.listen(PORT, () => {
  const message = `Server started on port ${PORT}`.underline.yellow;
  console.log(message);
  console.log(`http://localhost:${PORT}`.blue.underline);
});
