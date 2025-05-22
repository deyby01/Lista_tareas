import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Usamos la variable de entorno para la URL base de la API
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTasks = async () => {
    // ... (código existente de fetchTasks sin cambios)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tasks/`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas. (Detalle: ' + err.message + ')');
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (taskId, currentCompletedStatus) => {
    // ... (código existente de handleToggleComplete sin cambios)
    try {
      await axios.patch(`<span class="math-inline">\{API\_BASE\_URL\}/api/tasks/</span>{taskId}/`, {
        completed: !currentCompletedStatus 
      });
      fetchTasks();
    } catch (err) {
      setError('Error al actualizar la tarea. (Detalle: ' + err.message + ')');
      console.error("Error updating task:", err);
    }
  };

  // NUEVA FUNCIÓN para eliminar una tarea
  const handleDeleteTask = async (taskId) => {
    try {
      // Hacemos una petición DELETE a nuestro backend Django
      await axios.delete(`<span class="math-inline">\{API\_BASE\_URL\}/api/tasks/</span>{taskId}/`);
      // Después de eliminar, volvemos a cargar todas las tareas
      // Una optimización sería filtrar la tarea eliminada del estado local 'tasks'
      // setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      // Pero fetchTasks() es más simple por ahora y asegura consistencia con el backend.
      fetchTasks();
    } catch (err) {
      setError('Error al eliminar la tarea. (Detalle: ' + err.message + ')');
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Lista de Tareas (Jueves, 22 de Mayo)</h1>
      </header>
      <main>
        <TaskForm onTaskCreated={fetchTasks} />
        <TaskList 
          tasks={tasks} 
          error={error} 
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask} // <-- Pasamos la nueva función
        />
      </main>
    </div>
  );
}

export default App;