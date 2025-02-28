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
  getPetsByUserId,
} = require("./controllers/petController");

const {
  createMessageThread,
  sendMessage,
  deleteMessage,
} = require("./controllers/messageController");

router.post("/users", addUser);
router.get("/users", getAllUsers);
router.post("/users/login", loginUser);
router.delete("/users/:userId", deleteUser);
router.put("/users/:userId", updateUser);
router.get("/users/:userId/pets", getPetsByUserId);

router.post("/pets", addPet);
router.get("/pets", getAllPets);
router.get("/pets/:petId", getPetById);
router.delete("/pets/:petId", deletePet);
router.put("/pets/:petId", updatePet);

router.post("/messages/thread", createMessageThread);
router.post("/messages/:threadId", sendMessage);
router.delete("/messages/:threadId/:messageId", deleteMessage);

module.exports = router;
