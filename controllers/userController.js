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

const loginUser = async ( req, res ) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({"User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Invalid credentials"});
    }

    res.status(200).json({ message: "Login Successful", user });
  } catch (error) {
    console.log("Error logging in: ", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
  const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const updateUser = async (req, res ) => {
    try {
      const {userId } = req.params;
      const {name, email, password } = req.body;

      const user = await User.findById(userId);
      if(!user) {
        return res.status(404).json({ message: "User not found" });
      }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
          const saleRounds = 10;
          user.password = await bcrypt.hash(password, saltRounds);
        }

        const updateUser = await user.save();
        res.status(200).json({ message: "User updated successfully", user: updatedUser })
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Interal server error" })
      }
    };
  
  module.exports = { addUser, getAllUsers, loginUser, deleteUser, updateUser };
