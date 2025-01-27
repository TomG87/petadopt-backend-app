const User = require("../models/userModel");

const addUser = async (req, res) => {
  try {
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

module.exports = { addUser };
