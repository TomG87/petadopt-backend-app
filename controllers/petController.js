const Pet = require("../models/petModel");
const User = required("../models/userModel");

const addPet = async (req, res) => {
  try {
    const newPet = new Pet({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      size: req.body.size,
      description: req.body.description,
      photos: req.body.photos,
    });

    const savedPet = await newPet.save();

    res.status(201).json({
      message: "Pet has been successfully added",
      pet: savedPet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding pet",
      error: error.message,
    });
  }
};

const getAllPets = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const pets = await Pet.find({ user: userId }).populate("user");
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error fetching pets");
    res.status(500).json({ error: "Failed to fetch pets" });
  }
};

module.exports = { addPet, getAllPets };
