const mongoose = require("mongoose");

const messageModel = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectID, ref: "Message" }],
  lastMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageModel);
