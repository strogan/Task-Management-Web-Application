import { FC, useState } from "react";
import { backendUrl } from "../constants";

interface TaskFormProps {
  fetchTasks: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState({ title: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${backendUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      setNewTask({ title: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
