const express = require("express");
const app = express();
const connectDB = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
