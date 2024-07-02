import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MCQItem from './McqItem';

const MCQList = () => {
  const [mcqs, setMcqs] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mcqs', {
          headers: {
            'Authorization': authToken
          }
        });
        setMcqs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMcqs();
  }, [authToken]);

  const handleDeleteMCQ = (deletedMcqId) => {
    setMcqs(mcqs.filter(mcq => mcq._id !== deletedMcqId));
  };

  return (
    <div>
      <h2>MCQ List</h2>
      <Link to="/mcqs/new">Create New MCQ</Link>
      {mcqs.map(mcq => (
        <MCQItem key={mcq._id} mcq={mcq} onDelete={handleDeleteMCQ} />
      ))}
    </div>
  );
};

export default MCQList;
