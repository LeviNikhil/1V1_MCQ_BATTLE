import { Button, Card, List, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Urls } from "../../constant/Urls";
import { GetMCQ } from "./Mcq.service";

const McqDetails = () => {
  const { id: mcqId } = useParams();
  const [mcq, setMcq] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMcq();
  }, [mcqId]);

  const getMcq = async () => {
    try {
      const response = await GetMCQ(mcqId);
      setMcq(response.data);
    } catch (err) {
      console.error("Error fetching the MCQ:", err);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    // Add the delete logic here
    setIsModalVisible(false);
    // navigate back to the list or any other desired action
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    navigate(Urls.Mcqs.EditMcq(mcqId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!mcq) {
    return <p>MCQ not found.</p>;
  }

  const options = [
    { key: 'option1', label: 'Option 1' },
    { key: 'option2', label: 'Option 2' },
    { key: 'option3', label: 'Option 3' },
    { key: 'option4', label: 'Option 4' },
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 mb-5">
      <h1 className="mt-5 mb-4 text-2xl font-bold text-center">MCQ Details</h1>
      <Card title={`MCQ ID: ${mcq.id}`} className="shadow-lg">
        <p className="text-lg font-bold">{mcq.question}</p>
        <List
          itemLayout="horizontal"
          dataSource={options}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={mcq.options[item.key]}
              />
              {mcq.correctOption === item.key && (
                <span className="text-green-600 font-bold"> (Correct)</span>
              )}
            </List.Item>
          )}
        />
        <div className="p-4 mt-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Explanation:</h3>
          <p>{mcq.explanation}</p>
        </div>
        <div className="p-4 mt-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Difficulty:</h3>
          <p>{mcq.difficulty}</p>
        </div>
        <div className="p-4 mt-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Subject:</h3>
          <p>{mcq.subject}</p>
        </div>
        <div className="mt-4">
          <div className="flex justify-between w-full">
            <Button type="default" onClick={() => navigate(Urls.Mcqs.Mcqs())}>
              Cancel
            </Button>
            <div className="flex gap-8">
              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button type="default" onClick={showDeleteModal}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        title="Delete MCQ"
        // visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this MCQ?</p>
      </Modal>
    </div>
  );
};

export default McqDetails;
