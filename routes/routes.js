const express = require("express");
const router = express.Router();

const { addUser, getAllUsers, loginUser, deleteUser, updateUser  } = require("./controllers/userController");

const 