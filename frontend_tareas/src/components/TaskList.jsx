import React from 'react';

// Recibimos la nueva prop onDeleteTask
function TaskList({ tasks, error, onToggleComplete, onDeleteTask }) {

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <p>No hay tareas disponibles o están cargando...</p>;
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Contenedor para el checkbox y la información de la tarea */}
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id, task.completed)}
                  style={{ marginRight: '10px', transform: 'scale(1.5)' }}
                />
                <h3 style={{ 
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#888' : '#000',
                    margin: 0 
                  }}>
                  {task.title}
                </h3>
              </div>
              <p style={{ marginLeft: '30px', color: task.completed ? '#aaa' : '#333', fontSize: '0.9em', margin: '0 0 5px 30px' }}> 
                {task.description || 'Sin descripción'}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '0.8em', color: '#666', margin: '0 0 0 30px' }}><small>Creada: {new Date(task.created_at).toLocaleString()}</small></p>
            </div>
            
            {/* Botón de eliminar */}
            <button 
              onClick={() => {
                // Opcional: Confirmación antes de eliminar
                if (window.confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`)) {
                   onDeleteTask(task.id);
                 }
                onDeleteTask(task.id);
              }}
              style={{ 
                marginLeft: '10px', 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', // Rojo para eliminar
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                alignSelf: 'center' // Centra el botón verticalmente con el contenido
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;