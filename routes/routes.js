const express = require("express");
const router = express.Router();

const {
  addUser,
  getAllUsers,
  loginUser,
  deleteUser,
  updateUser,
} = require("./controllers/userController");

const {
  addPet,
  getAllPets,
  getPetById,
  deletePet,
  updatePet,
} = require("./controllers/petController");

router.post("/users", addUser);
router.get("/users", getAllUsers);
router.post("/users", loginUSer);
router.delete("/users/:userId", deleteUser);
router.put("/users/:userId", updateUser);
