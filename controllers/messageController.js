const Message = require("../models/messageModel");

const createMessageThread = async (req, res) => {
  const { participants } = req.body;

  try {
    if (!participants) {
      return res.status(400).json({ error: "Participant not available" });
    }
    const newThread = await Message.create({
      participants,
      messages: [],
      lastMessage: "",
    });

    res.status(201).json(newThread);
  } catch {
    res.status(500).json({ error: "Failed to create message thread" });
  }
};

module.exports = { createMessageThread };
