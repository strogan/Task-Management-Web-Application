import { FC, useState } from "react";
import { backendUrl } from "../constants";
import { Button, TextField, FormControl, FormHelperText } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface TaskFormProps {
  fetchTasks: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: false, description: false });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(newTask).some(
      (value) => !value.trim()
    );
    setErrors({
      title: !newTask.title.trim(),
      description: !newTask.description.trim(),
    });

    if (!hasEmptyFields) {
      try {
        await fetch(`${backendUrl}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        setNewTask({ title: "", description: "" });
        fetchTasks();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField
          label={<FormattedMessage id="form.title" />}
          name="title"
          value={newTask.title}
          onChange={handleChange}
          variant="outlined"
          error={errors.title}
          helperText={
            errors.title ? <FormattedMessage id="form.emptyTitle" /> : ""
          }
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label={<FormattedMessage id="form.description" />}
          name="description"
          value={newTask.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          error={errors.description}
          helperText={
            errors.description ? (
              <FormattedMessage id="form.emptyDescription" />
            ) : (
              ""
            )
          }
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        aria-label="Add task"
        sx={{ mt: 2 }}
        disabled={Object.values(errors).some((error) => error)}
      >
        <FormattedMessage id="form.addTask" />
      </Button>
    </form>
  );
};

export default TaskForm;
