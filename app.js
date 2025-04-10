const express = require("express");
const app = express();
const connectDB = require("./db");
const routes = require("./routes/routes");
const authenticate = require("./middleware/authenticate");

app.use(express.json());
app.use("/api", authenticate, routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB().catch((err) => {
  console.error("Error during DB connection:", err);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
