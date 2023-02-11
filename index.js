require("dotenv").config();
require("colors");
const express = require("express");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Welcome to MeChat" });
});

app.listen(PORT, () => {
  const message = `Server started on port ${PORT}`.underline.yellow;
  console.log(message);
  console.log(`http://localhost:${PORT}`.blue.underline);
});
