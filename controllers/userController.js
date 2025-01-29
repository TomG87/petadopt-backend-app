const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User has been successfully added",
      user: savedUser,
    });

    console.log("User has been successfully added");
  } catch (error) {
    console.log("Error adding user:", error.message);
    res.status(500).json({
      message: "Error adding user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
module.exports = { addUser, getAllUsers };
