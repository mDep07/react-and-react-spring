import { v4 as uuidv4 } from 'uuid';

const ITEMS = {
  tasks: 'list_tasks',
};

export default function Db() {
  const getAllTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(ITEMS.tasks) || '[]');
    return tasks;
  };

  const addNewTask = (task) => {
    return new Promise((resolve, reject) => {
      const tasks = getAllTasks();
      const newTask = { ...task, id: uuidv4() };
      localStorage.setItem(ITEMS.tasks, JSON.stringify([...tasks, newTask]));
      setTimeout(() => resolve(newTask), 1000);
    });
  };

  const deleteTask = (taskId) => {
    return new Promise((resolve, reject) => {
      const tasks = getAllTasks();
      const tasksWithoutDelete = tasks.filter(({ id }) => id !== taskId);
      localStorage.setItem(ITEMS.tasks, JSON.stringify(tasksWithoutDelete));
      setTimeout(() => resolve(taskId), 1500);
    });
  };

  const aditTask = ({ id, title, importance }) => {
    return new Promise((resolve, reject) => {
      const tasks = getAllTasks();
      const tasksWithoutDelete = tasks.filter(({ id }) => id !== taskId);
      localStorage.setItem(ITEMS.tasks, JSON.stringify(tasksWithoutDelete));
      setTimeout(() => resolve(taskId), 1500);
    });
  };

  return {
    getAllTasks,
    addNewTask,
    deleteTask,
  };
}
