import React from 'react';
import './TemaNav.css'; // Crearemos este archivo CSS

function TemaNav({ temas, temaSeleccionado, onSeleccionarTema }) {
  return (
    <nav className="tema-nav">
      {temas.map(tema => (
        <button
          key={tema}
          className={`tema-btn ${tema === temaSeleccionado ? 'active' : ''}`}
          onClick={() => onSeleccionarTema(tema)}
        >
          {tema}
        </button>
      ))}
    </nav>
  );
}

export default TemaNav;