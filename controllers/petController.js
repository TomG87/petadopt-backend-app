const Pet = require("../models/petModel");

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

module.exports = { addPet };
