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

const sendMessage = async (req, res) => {
  const { threadId } = req.params;
  const { userId, content } = req.body;

  try {
    if (!userId || !content) {
      return res
        .status(400)
        .json({ error: "User ID and content are required" });
    }
    const thread = await Message.findById(threadId);
    if (!thread) {
      return res.status(404).json({ error: "Message thread not found" });
    }

    const newMessage = {
      sender: userId,
      content,
      timestamp: new Date(),
    };

    thread.messages.push(newMessage);
    thread.lastMessage = content;
    await thread.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { createMessageThread, sendMessage };
