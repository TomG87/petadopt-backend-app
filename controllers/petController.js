const Pet = require("../models/petModel");

const addPet = async (req, res) => {
  try {
    const { name, breed, age, size, description, photos } = req.body;

    if (!name || !breed || !age || !size || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPet = new Pet({
      name,
      breed,
      age,
      size,
      description,
      photos,
      user: req.user.id,
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

const getPetById = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;
    const pet = await Pet.findOne({ _id: petId, user: userId }).populate(
      "user"
    );
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve Pet" });
  }
};

const deletePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;

    const pet = await Pet.findOne({ _id: petId, user: userId });

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found or not authorized to delete",
      });
    }

    await Pet.deleteOne({ _id: petId, user: userId });
    console.log("Pet has been successfully removed");

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error removing pet",
      error: error.message,
    });
  }
};

const updatePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this pet" });
    }

    const { name, breed, age, size, description, photos } = req.body;

    if (name) pet.name = name;
    if (breed) pet.breed = breed;
    if (age) pet.age = age;
    if (size) pet.size = size;
    if (description) pet.description = description;
    if (photos) pet.photos = photos;

    const updatedPet = await pet.save();

    res.status(200).json({
      message: "Pet information updated successfully",
      pet: updatedPet,
    });
  } catch (error) {
    console.error("Error updating pet information", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addPet, getAllPets, getPetById, deletePet, updatePet };
