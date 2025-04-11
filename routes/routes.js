const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
  addUser,
  getAllUsers,
  loginUser,
  deleteUser,
  updatedUser,
} = require("../controllers/userController");

const {
  addPet,
  getAllPets,
  getPetById,
  deletePet,
  updatePet,
  getPetsByUserId,
} = require("../controllers/petController");

const {
  createMessageThread,
  sendMessage,
  deleteMessage,
} = require("../controllers/messageController");

router.post("/users", addUser);
router.get("/users", authenticate, getAllUsers);
router.post("/users/login", loginUser);
router.delete("/users/:userId", authenticate, deleteUser);
router.put("/users/:userId", authenticate, updatedUser);
router.get("/users/:userId/pets", authenticate, getPetsByUserId);

router.post("/pets", authenticate, addPet);
router.get("/pets", authenticate, getAllPets);
router.get("/pets/:petId", authenticate, getPetById);
router.delete("/pets/:petId", authenticate, deletePet);
router.put("/pets/:petId", authenticate, updatePet);

router.post("/messages/thread", authenticate, createMessageThread);
router.post("/messages/:threadId", authenticate, sendMessage);
router.delete("/messages/:threadId/:messageId", authenticate, deleteMessage);

module.exports = router;
