import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importar toast
import './styles/QuestionForm.css';

function QuestionForm({ onSave, questionToEdit }) {
  const [pregunta, setPregunta] = useState('');
  const [respuestas, setRespuestas] = useState('');
  const [respuestasCorrectas, setRespuestasCorrectas] = useState('');
  const [aclaracion, setAclaracion] = useState('');
  const [tipoDePregunta, setTipoDePregunta] = useState(1);
  const [tema, setTema] = useState('');
  const [error, setError] = useState('');

  const TEMAS_FIJOS = ["Archivos", "Árboles", "Hashing"];
  const TIPOS_PREGUNTA_FIJOS = [
    { value: 1, label: "Una o Más de una respuesta" },
    { value: 2, label: "Una sola respuesta" }
  ];

  useEffect(() => {
    if (questionToEdit) {
      setPregunta(questionToEdit.pregunta);
      setRespuestas(questionToEdit.respuestas.join('; '));
      setRespuestasCorrectas(questionToEdit.respuestasCorrectas.join('; '));
      setAclaracion(questionToEdit.aclaracion);
      setTipoDePregunta(questionToEdit.tipoDePregunta);
      setTema(questionToEdit.tema);
    } else {
      setPregunta('');
      setRespuestas('');
      setRespuestasCorrectas('');
      setAclaracion('');
      setTipoDePregunta(1);
      setTema('');
    }
    setError('');
  }, [questionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const parsedRespuestas = respuestas.split(';').map(s => s.trim()).filter(s => s);
    const parsedRespuestasCorrectas = respuestasCorrectas.split(';').map(s => s.trim()).filter(s => s);

    if (parsedRespuestas.length === 0) {
      setError('Debes ingresar al menos una opción de respuesta.');
      toast.error('Debes ingresar al menos una opción de respuesta.'); // <-- Notificación
      return;
    }
    if (parsedRespuestasCorrectas.length === 0) {
      setError('Debes ingresar al menos una respuesta correcta.');
      toast.error('Debes ingresar al menos una respuesta correcta.'); // <-- Notificación
      return;
    }
    if (tipoDePregunta === 2 && parsedRespuestasCorrectas.length > 1) {
      setError('Para el tipo "Una sola respuesta", solo puede haber una respuesta correcta.');
      toast.error('Para el tipo "Una sola respuesta", solo puede haber una respuesta correcta.'); // <-- Notificación
      return;
    }
    const invalidCorrects = parsedRespuestasCorrectas.filter(rc => !parsedRespuestas.includes(rc));
    if (invalidCorrects.length > 0) {
        const msg = `Las siguientes respuestas correctas no están entre las opciones: ${invalidCorrects.join(', ')}`;
        setError(msg);
        toast.error(msg); // <-- Notificación
        return;
    }

    const newQuestion = {
      tipoDePregunta: parseInt(tipoDePregunta),
      pregunta,
      respuestas: parsedRespuestas,
      respuestasCorrectas: parsedRespuestasCorrectas,
      aclaracion,
      tema,
    };

    if (questionToEdit) {
      newQuestion.id = questionToEdit.id;
    }

    onSave(newQuestion);
    
    if (!questionToEdit) {
      setPregunta('');
      setRespuestas('');
      setRespuestasCorrectas('');
      setAclaracion('');
      setTipoDePregunta(1);
      setTema('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h3>{questionToEdit ? 'Editar Pregunta' : 'Agregar Nueva Pregunta'}</h3>
      
      {error && <p className="form-error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="tema">Tema:</label>
        <select
          id="tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
        >
          <option value="">Selecciona un tema</option>
          {TEMAS_FIJOS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tipoDePregunta">Tipo de Pregunta:</label>
        <select
          id="tipoDePregunta"
          value={tipoDePregunta}
          onChange={(e) => setTipoDePregunta(parseInt(e.target.value))}
          required
        >
          {TIPOS_PREGUNTA_FIJOS.map(tipo => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pregunta">Pregunta:</label>
        <textarea
          id="pregunta"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          rows="3"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="respuestas">Respuestas (separadas por ;):</label>
        <textarea
          type="text"
          id="respuestas"
          value={respuestas}
          onChange={(e) => setRespuestas(e.target.value)}
          placeholder="Opción A; Opción B; Opción C"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="respuestasCorrectas">Respuestas Correctas (separadas por ;):</label>
        <textarea
          type="text"
          id="respuestasCorrectas"
          value={respuestasCorrectas}
          onChange={(e) => setRespuestasCorrectas(e.target.value)}
          placeholder={tipoDePregunta === 1 ? "Opción A; Opción C" : "Una sola opción"}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="aclaracion">Aclaración:</label>
        <textarea
          id="aclaracion"
          value={aclaracion}
          onChange={(e) => setAclaracion(e.target.value)}
          rows="3"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-success">
        {questionToEdit ? 'Guardar Cambios' : 'Agregar Pregunta'}
      </button>
      {questionToEdit && (
        <button type="button" onClick={() => onSave(null)} className="btn btn-secondary">
          Cancelar Edición
        </button>
      )}
    </form>
  );
}

export default QuestionForm;