const MCQ = require("../models/mcq");
const asyncHandler = require("express-async-handler");

exports.createMCQ = asyncHandler(async (req, res) => {
  const { question, options, correctOption, difficulty, subject } = req.body;
  try {
    const mcq = new MCQ({ question, options, correctOption, difficulty, subject });
    await mcq.save();
    res.status(201).send('MCQ created');
    
  } catch (err) {
    res.status(400).send(err.message);
  }
});

exports.checkAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { selectedAnswer } = req.body;

  try {
    const mcq = await MCQ.findById(id);
    if (!mcq) return res.status(404).send('MCQ not found');

    if (selectedAnswer === mcq.correctOption) {
      res.status(200).json({ message: 'Correct!' });
    } else {
      res.status(200).json({ message: 'Incorrect!' });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

exports.getMCQs = asyncHandler(async (req, res) => {
  try {
    const mcqs = await MCQ.find();
    res.status(200).json(mcqs);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

exports.updateMCQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, options, correctOption, difficulty, subject } = req.body;
  try {
    const mcq = await MCQ.findByIdAndUpdate(
      id,
      { question, options, correctOption, difficulty, subject },
      { new: true }
    );
    if (!mcq) return res.status(404).send('MCQ not found');
    res.status(200).json(mcq);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

exports.deleteMCQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const mcq = await MCQ.findByIdAndDelete(id);
    if (!mcq) return res.status(404).send('MCQ not found');
    res.status(200).send('MCQ deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});
