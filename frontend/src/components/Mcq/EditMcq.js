import { Button, Card, Form, Input, Radio, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Urls } from "../../constant/Urls";
import { GetMCQ, UpdateMcq } from "./Mcq.service";

const { Option } = Select;

const EditMcq = () => {
  const {id: mcqId } = useParams();
  const [mcq, setMcq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getMcq();
  }, [mcqId]);

  const getMcq = async () => {
    try {
      const response = await GetMCQ(mcqId);
      setMcq(response.data);
      form.setFieldsValue({
        question: response.data.question,
        option1: response.data.options.option1,
        option2: response.data.options.option2,
        option3: response.data.options.option3,
        option4: response.data.options.option4,
        correctOption: response.data.correctOption,
        difficulty: response.data.difficulty,
        subject: response.data.subject,
      });
    } catch (err) {
      console.error("Error fetching the MCQ:", err);
      toast.error("Error fetching the MCQ");
    } finally {
      setLoading(false);
    }
  };

  const updateMcq = async (data) => {
    try {
      await UpdateMcq(mcqId, data);
      toast.success("MCQ updated successfully!");
      navigate(Urls.Mcqs.Mcqs());
    } catch (err) {
      console.error(err);
      toast.error("Error updating the MCQ");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (values) => {
    setLoading(true);
    const data = {
      question: values.question,
      options: {
        option1: values.option1,
        option2: values.option2,
        option3: values.option3,
        option4: values.option4,
      },
      correctOption: values.correctOption,
      difficulty: values.difficulty,
      subject: values.subject,
    };
    updateMcq(data);
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

  return (
    <div className="container flex flex-col items-center justify-center flex-grow p-4 mx-auto mb-5">
      <h1 className="mt-5 mb-4 text-2xl font-bold text-center">Edit MCQ</h1>
      <Card title={`MCQ ID: ${mcq._id}`} className="w-full shadow-lg lg:w-1/2">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: "Please input the question!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 1"
            name="option1"
            rules={[{ required: true, message: "Please input option 1" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 2"
            name="option2"
            rules={[{ required: true, message: "Please input option 2" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 3"
            name="option3"
            rules={[{ required: true, message: "Please input option 3" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 4"
            name="option4"
            rules={[{ required: true, message: "Please input option 4" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correct Option"
            name="correctOption"
            rules={[{ required: true, message: "Please select the correct option" }]}
          >
            <Radio.Group>
              <Radio value="option1">Option 1</Radio>
              <Radio value="option2">Option 2</Radio>
              <Radio value="option3">Option 3</Radio>
              <Radio value="option4">Option 4</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Difficulty"
            name="difficulty"
            rules={[{ required: true, message: "Please select the difficulty level" }]}
          >
            <Select placeholder="Select difficulty">
              <Option value="Easy">Easy</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Hard">Hard</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please select the subject" }]}
          >
            <Select placeholder="Select subject">
              <Option value="Math">Math</Option>
              <Option value="Science">Science</Option>
              <Option value="History">History</Option>
              <Option value="Geography">Geography</Option>
              <Option value="Literature">Literature</Option>
              <Option value="Art">Art</Option>
              <Option value="Music">Music</Option>
              <Option value="Sports">Sports</Option>
            </Select>
          </Form.Item>
          <Form.Item className="mb-0">
            <div className="flex justify-between w-full">
              <Button type="default" onClick={() => navigate(Urls.Mcqs.Mcqs())}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditMcq;
