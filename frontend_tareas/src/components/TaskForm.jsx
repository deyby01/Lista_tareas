import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskCreated }) { // Recibe una función como prop
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el envío tradicional del formulario
    setError(null); // Limpia errores previos

    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    try {
      const newTask = { title, description };
      // Hacemos la petición POST a nuestro backend Django
      await axios.post('http://127.0.0.1:8000/api/tasks/', newTask);

      setTitle(''); // Limpiamos el campo de título
      setDescription(''); // Limpiamos el campo de descripción

      if (onTaskCreated) {
        onTaskCreated(); // Llamamos a la función pasada como prop para refrescar la lista
      }
    } catch (err) {
      setError('Error al crear la tarea. (Detalle: ' + err.message + ')');
      console.error("Error creating task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Crear Nueva Tarea</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="title">Título:</label><br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '90%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción (opcional):</label><br />
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '90%', padding: '8px', marginBottom: '10px', minHeight: '60px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Añadir Tarea
      </button>
    </form>
  );
}

export default TaskForm;