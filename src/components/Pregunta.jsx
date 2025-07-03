import React, { useState, useEffect } from 'react'; 
import { shuffleArray } from '../utils/helpers';
import './styles/Pregunta.css'; 

function Pregunta({ pregunta, respuestasSeleccionadas, alCambiarSeleccion }) {
  const { id, tipoDePregunta, pregunta: textoPregunta, respuestas } = pregunta;

  const [respuestasBarajadas, setRespuestasBarajadas] = useState([]);

  useEffect(() => {
    setRespuestasBarajadas(shuffleArray([...respuestas])); 
  }, [pregunta]); 

  return (
    <div className="pregunta-card">
      <h2>{textoPregunta}</h2>
      {tipoDePregunta === 1 ? ( // (checkboxes)
        respuestasBarajadas.map((opcion, index) => ( 
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
      ) : ( 
        respuestasBarajadas.map((opcion, index) => ( 
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