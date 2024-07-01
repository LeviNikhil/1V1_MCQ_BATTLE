import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MCQItem from './McqItem';

const MCQList = () => {
  const [mcqs, setMcqs] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mcqs', {
          headers: {
            'x-auth-token': authToken
          }
        });
        setMcqs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMcqs();
  }, [authToken]);

  return (
    <div>
      <h2>MCQ List</h2>
      <Link to="/mcqs/new">Create New MCQ</Link>
      {mcqs.map(mcq => (
        <MCQItem key={mcq._id} mcq={mcq} />
      ))}
    </div>
  );
};

export default MCQList;