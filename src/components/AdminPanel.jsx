import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import './styles/AdminPanel.css';

function AdminPanel({ allQuestions, onAddQuestion, onUpdateQuestion, onDeleteQuestion }) {
  const [questionToEdit, setQuestionToEdit] = useState(null); // Estado para la pregunta que se está editando
  const [showForm, setShowForm] = useState(false); // Nuevo estado para mostrar/ocultar el formulario

  // Función para manejar el guardado (agregar/actualizar) desde el formulario
  const handleSave = (question) => {
    if (question === null) { // Si se hizo clic en cancelar edición
      setQuestionToEdit(null);
      setShowForm(false);
      return;
    }

    if (questionToEdit) {
      onUpdateQuestion(question);
    } else {
      onAddQuestion(question);
    }
    setQuestionToEdit(null); // Salir del modo edición
    setShowForm(false); // Ocultar el formulario después de guardar
  };

  // Al hacer click en editar, mostramos el formulario con los datos
  const handleEditClick = (question) => {
    setQuestionToEdit(question);
    setShowForm(true); // Mostrar el formulario
  };

  // Al hacer click en "Add New Question", mostramos un formulario vacío
  const handleAddQuestionClick = () => {
    setQuestionToEdit(null); // Asegurarse de que el formulario esté en modo agregar
    setShowForm(true); // Mostrar el formulario
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Administración de Preguntas</h2>
        <button onClick={handleAddQuestionClick} className="btn btn-success">
          Agregar Nueva Pregunta
        </button>
      </div>

      {showForm && (
        <QuestionForm 
          onSave={handleSave} 
          questionToEdit={questionToEdit}
        />
      )}

      {/* Tabla de preguntas */}
      <h3>Listado de Preguntas</h3>
      {allQuestions.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.1em', color: '#666' }}>
          No hay preguntas cargadas todavía. ¡Agrega una!
        </p>
      ) : (
        <div className="table-responsive"> 
          <table className="questions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tema</th>
                <th>Pregunta</th>
                <th>Tipo</th>
                <th>Respuestas</th>
                <th>Respuestas Correctas</th>
                <th>Aclaración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allQuestions
                .sort((a, b) => a.tema.localeCompare(b.tema) || a.pregunta.localeCompare(b.pregunta)) // Ordenar por tema y luego por pregunta
                .map(q => (
                  <tr key={q.id}>
                    <td>{q.id.substring(0, 4)}...</td> {/* Mostrar ID abreviado */}
                    <td>{q.tema}</td>
                    <td>{q.pregunta.substring(0, 50)}{q.pregunta.length > 50 ? '...' : ''}</td> {/* Recortar texto largo */}
                    <td>{q.tipoDePregunta === 1 ? 'Múltiples' : 'Única'}</td>
                    <td>{q.respuestas.join(', ')}</td>
                    <td>{q.respuestasCorrectas.join(', ')}</td>
                    <td>{q.aclaracion.substring(0, 50)}{q.aclaracion.length > 50 ? '...' : ''}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => handleEditClick(q)} className="btn btn-primary">Editar</button>
                        <button onClick={() => onDeleteQuestion(q.id)} className="btn btn-danger">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;