import { useState, useEffect, FC } from "react";
import Task from "./task";
import TaskForm from "./taskForm";

const TaskList: FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <TaskForm fetchTasks={fetchTasks} />
      {tasks.map((task: any) => (
        <Task key={task.id} task={task} onDelete={handleDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
