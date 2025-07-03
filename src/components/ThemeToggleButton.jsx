import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './styles/ThemeToggleButton.css'; 

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className={`theme-toggle-button ${theme === 'dark' ? 'dark-mode-active' : ''}`}
      title={theme === 'dark' ? 'Cambiar a Modo Diurno' : 'Cambiar a Modo Nocturno'}
    >
      {theme === 'dark' ? '☀️' : '🌙'} 
    </button>
  );
}

export default ThemeToggleButton;