import { useState, useEffect, FC } from "react";
import TaskForm from "./taskForm";
import { backendUrl } from "../constants";
import {
  Grid,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FormattedMessage } from "react-intl";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${backendUrl}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await fetch(`${backendUrl}/tasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`${backendUrl}/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        fetchTasks();
        setEditingTask(null);
      } else {
        console.error("Error updating task:", await response.text());
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <Grid container item justifyContent="center" mt={3}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h3">
          <FormattedMessage id="taskList.addTask" />
        </Typography>
        <TaskForm fetchTasks={fetchTasks} />
        <Typography variant="h3" mt={2}>
          <FormattedMessage id="taskList.list" />
        </Typography>
        <List dense={false}>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              {editingTask?.id === task.id ? (
                <>
                  <TextField
                    label={<FormattedMessage id="form.title" />}
                    name="title"
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                  />
                  <TextField
                    label={<FormattedMessage id="form.description" />}
                    name="description"
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    multiline
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveTask(editingTask)}
                  >
                    <FormattedMessage id="form.save" />
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelEdit}
                  >
                    <FormattedMessage id="form.cancel" />
                  </Button>
                </>
              ) : (
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                />
              )}
              <ListItemSecondaryAction style={{ display: "flex" }}>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditTask(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default TaskList;
