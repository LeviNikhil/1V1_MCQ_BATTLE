import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const MCQForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: {
      option1: '',
      option2: '',
      option3: '',
      option4: ''
    },
    correctOption: '',
    difficulty: '',
    subject: ''
  });

  const { authToken } = useContext(AuthContext);
  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate();

  console.log('Auth Token:', authToken); // Check if authToken is being logged

  useEffect(() => {
    if (id) {
      // Fetch the MCQ details for editing
      const fetchMcq = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/mcqs/${id}`, {
            headers: {
              'x-auth-token': authToken
            }
          });
          setFormData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMcq();
    }
  }, [id, authToken]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (optionName, value) => {
    setFormData({ ...formData, options: { ...formData.options, [optionName]: value } });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = id ? `http://localhost:5000/api/mcqs/${id}` : 'http://localhost:5000/api/mcqs/';
      const method = id ? 'put' : 'post';
  
      // Ensure formData is structured correctly
      const formDataToSend = {
        question: formData.question,
        options: {
          option1: formData.options.option1,
          option2: formData.options.option2,
          option3: formData.options.option3,
          option4: formData.options.option4
        },
        correctOption: formData.correctOption,
        difficulty: formData.difficulty,
        subject: formData.subject
      };
      // Make the request
      await axios[method](url, formDataToSend, {
        headers: {
          'x-auth-token': authToken,
          'Content-Type': 'application/json'
        }
      });
      navigate('/mcqs'); // Redirect to the MCQ list
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question</label>
        <input type="text" name="question" value={formData.question} onChange={handleChange} required />
      </div>
      {Object.keys(formData.options).map((optionName, index) => (
        <div key={index}>
          <label>{`Option ${index + 1}`}</label>
          <input type="text" value={formData.options[optionName]} onChange={e => handleOptionChange(optionName, e.target.value)} required />
        </div>
      ))}
      <div>
        <label>Correct Option</label>
        <select name="correctOption" value={formData.correctOption} onChange={handleChange} required>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </div>
      <div>
        <label>Difficulty</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Subject</label>
        <select name="subject" value={formData.subject} onChange={handleChange} required>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Geography">Geography</option>
          <option value="Literature">Literature</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default MCQForm;
