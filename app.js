const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log("Server is running on ${PORT");
});