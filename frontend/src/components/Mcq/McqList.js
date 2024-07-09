import React, { useEffect, useState } from "react";
import { Button, Card, List, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetMCQs, DeleteMcq } from "./Mcq.service";
import { Urls } from "../../constant/Urls";
import "./McqList.css"; // Import your custom styles

const McqList = () => {
  const navigate = useNavigate();
  const [mcqs, setMcqs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMCQ, setSelectedMCQ] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    getMcqs();
  }, []);

  const getMcqs = async () => {
    try {
      const response = await GetMCQs();
      setMcqs(response.data);
    } catch (err) {
      console.error("Error fetching the MCQs:", err);
    }
  };

  const deleteMcq = async (id) => {
    try {
      await DeleteMcq(id);
      toast.success("MCQ deleted successfully!");
      getMcqs();
    } catch (err) {
      console.error(err);
    } finally {
      setIsModalVisible(false);
    }
  };

  const showDeleteModal = (mcq) => {
    setSelectedMCQ(mcq);
    setIsModalVisible(true);
  };

  const handleDeleteOk = () => {
    deleteMcq(selectedMCQ._id); // Use `_id` as per MongoDB schema
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (id) => {
    navigate(Urls.Mcqs.EditMcq(id));
  };

  const handleOptionClick = (mcqId, optionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [mcqId]: optionKey,
    }));
  };

  const handleSubmit = (mcqId) => {
    const selectedOption = selectedOptions[mcqId];
    const mcq = mcqs.find((mcq) => mcq._id === mcqId);

    if (selectedOption === mcq.correctOption) {
      toast.success("Correct answer!");
    } else {
      toast.error("Wrong answer!");
    }
  };

  return (
    <div className="mcq-container">
      <div className="mcq-header">
        <h1>MCQ List</h1>
        <Button type="primary" onClick={() => navigate(Urls.Mcqs.NewMcq())}>
          Create
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={mcqs}
        renderItem={(mcq) => (
          <List.Item>
            <Card title={`Question: ${mcq.question}`} className="mcq-card">
              <p className="mcq-difficulty">Difficulty: {mcq.difficulty}</p>
              <p className="mcq-subject">Subject: {mcq.subject}</p>
              <div className="mcq-options">
                {mcq.options &&
                  Object.entries(mcq.options).map(([key, value]) => (
                    <Button
                      key={key}
                      type={
                        selectedOptions[mcq._id] === key ? "primary" : "default"
                      }
                      onClick={() => handleOptionClick(mcq._id, key)}
                    >
                      {`${value}`}
                    </Button>
                  ))}
              </div>
              <div className="mcq-submit">
                <Button type="primary" onClick={() => handleSubmit(mcq._id)}>
                  Submit
                </Button>
              </div>
              <div className="mcq-actions">
                <Button type="primary" onClick={() => handleEdit(mcq._id)}>
                  Edit
                </Button>
                <Button type="default" onClick={() => showDeleteModal(mcq)}>
                  Delete
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Delete MCQ"
        visible={isModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this MCQ?</p>
      </Modal>
    </div>
  );
};

export default McqList;
