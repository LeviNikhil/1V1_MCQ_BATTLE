const mongoose = require('mongoose');
const { Schema } = mongoose;

const mcqSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    option1: {
      type: String,
      required: true
    },
    option2: {
      type: String,
      required: true
    },
    option3: {
      type: String,
      required: true
    },
    option4: {
      type: String,
      required: true
    }
  },
  correctOption: {
    type: String,
    required: true,
    enum: ['option1', 'option2', 'option3', 'option4']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  subject: {
    type: String,
    required: true,
    enum: ['Math', 'Science', 'History', 'Geography', 'Literature', 'Art', 'Music', 'Sports'] 
  }
  
});


const MCQ = mongoose.model('MCQ', mcqSchema);

module.exports = MCQ;
