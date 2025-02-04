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
router.post("/users/login", loginUser);
router.delete("/users/:userId", deleteUser);
router.put("/users/:userId", updateUser);

router.post("/pets", addPet);
router.get("/pets", getAllPets);
router.get("/pets/:userId]", getPetById);
router.delete("/pets/:petId", deletePet);
router.put("/pets/:userId", updatePet);

module.exports = router;
