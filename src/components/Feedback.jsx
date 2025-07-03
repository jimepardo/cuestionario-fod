import React from 'react';
import './styles/Feedback.css'; 

function Feedback({ esCorrecta, aclaracion, respuestasCorrectas }) {
  // No mostrar feedback si aún no se ha verificado
  if (esCorrecta === null) {
    return null;
  }

  const feedbackClase = esCorrecta ? 'feedback-correcto' : 'feedback-incorrecto';
  const mensaje = esCorrecta ? '¡Correcto!' : '¡Incorrecto!';

  return (
    <div className={`feedback-container ${feedbackClase}`}>
      <p className="feedback-message">{mensaje}</p>
      {/* La aclaración y las respuestas correctas se muestran directamente */}
      <div className="aclaracion-box">
        <h3>La respuesta correcta es:</h3>
        <ul>
          {respuestasCorrectas.map((respuesta, index) => (
            <li key={index}>{respuesta}</li>
          ))}
        </ul>
        <p>{aclaracion}</p>
      </div>
    </div>
  );
}

export default Feedback;