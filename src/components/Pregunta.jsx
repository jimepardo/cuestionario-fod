import React, { useState, useEffect } from 'react'; // Importamos useEffect
import { shuffleArray } from '../utils/helpers'; // Importamos la función de ayuda

function Pregunta({ pregunta, respuestasSeleccionadas, alCambiarSeleccion }) {
  const { id, tipoDePregunta, pregunta: textoPregunta, respuestas } = pregunta;

  const [respuestasBarajadas, setRespuestasBarajadas] = useState([]);

  // Usamos useEffect para barajar las respuestas cada vez que la 'pregunta' cambie
  useEffect(() => {
    setRespuestasBarajadas(shuffleArray([...respuestas])); // Barajamos una copia de las respuestas
  }, [pregunta]); // Dependencia: re-ejecuta cuando 'pregunta' cambia

  return (
    <div className="pregunta-card">
      <h2>{textoPregunta}</h2>
      {tipoDePregunta === 1 ? ( // Pregunta con varias respuestas correctas (checkboxes)
        respuestasBarajadas.map((opcion, index) => ( // Usamos respuestasBarajadas
          <div key={index} className="opcion">
            <input
              type="checkbox"
              id={`${id}-opcion-${index}`}
              value={opcion}
              checked={respuestasSeleccionadas.includes(opcion)}
              onChange={() => alCambiarSeleccion(opcion)}
            />
            <label htmlFor={`${id}-opcion-${index}`}>{opcion}</label>
          </div>
        ))
      ) : ( // Pregunta con una sola respuesta correcta (radio buttons)
        respuestasBarajadas.map((opcion, index) => ( // Usamos respuestasBarajadas
          <div key={index} className="opcion">
            <input
              type="radio"
              id={`${id}-opcion-${index}`}
              value={opcion}
              name={id}
              checked={respuestasSeleccionadas[0] === opcion}
              onChange={() => alCambiarSeleccion(opcion)}
            />
            <label htmlFor={`${id}-opcion-${index}`}>{opcion}</label>
          </div>
        ))
      )}
    </div>
  );
}

export default Pregunta;