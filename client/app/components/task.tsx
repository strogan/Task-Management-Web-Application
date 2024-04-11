import { FC } from "react";

interface TaskProps {
  task: { id: number; title: string };
  onDelete: (taskId: number) => void;
}

const Task: FC<TaskProps> = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
