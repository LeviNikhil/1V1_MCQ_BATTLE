import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const MCQItem = ({ mcq }) => {
  const { authToken } = useContext(AuthContext);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleAnswerSelection = (option) => {
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/mcqs/check-answer/${mcq._id}`,
        { selectedAnswer },
        {
          headers: {
            'x-auth-token': authToken,
            'Content-Type': 'application/json'
          }
        }
      );
      setFeedback(response.data.message);
    } catch (error) {
      console.error('Error checking answer:', error);
      setFeedback('Error checking answer.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this MCQ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/mcqs/${mcq._id}`, {
          headers: {
            'x-auth-token': authToken
          }
        });
        // Refresh MCQ list or remove this MCQ from state
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h3>{mcq.question}</h3>
      <ul>
        {Object.entries(mcq.options).map(([key, option]) => (
          <li key={key}>
            <label>
              <input
                type="radio"
                name="answer"
                value={key}
                checked={selectedAnswer === key}
                onChange={() => handleAnswerSelection(key)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckAnswer}>Check Answer</button>
      {feedback && <p>{feedback}</p>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MCQItem;
