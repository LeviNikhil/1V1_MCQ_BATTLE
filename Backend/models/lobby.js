const mongoose = require("mongoose");
const { Schema } = mongoose;

const lobbySchema = new Schema({
  numOfUsers: {
    type: Number,
    required: true,
    min: 1,
    max: 2,
  },
  numOfQuestions: {
    type: Number,
    required: true,
    min: 1,
  },
  subject: {
    type: String,
    required: true,
    enum: [
      "Math",
      "Science",
      "History",
      "Geography",
      "Literature",
      "Art",
      "Music",
      "Sports",
    ],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Lobby = mongoose.model("Lobby", lobbySchema);
module.exports = Lobby;
