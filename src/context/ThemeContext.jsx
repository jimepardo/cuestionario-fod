import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto del tema
const ThemeContext = createContext();

// Hook personalizado para usar el tema
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Proveedor del tema
export const ThemeProvider = ({ children }) => {
  // Estado inicial del tema, intentando leer de localStorage o por defecto 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Efecto para aplicar la clase 'dark-mode' al body y guardar en localStorage
  useEffect(() => {
    const root = document.documentElement; // O document.body
    if (theme === 'dark') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme); // Guardar la preferencia del usuario
  }, [theme]); // Se ejecuta cada vez que el tema cambia

  // Función para alternar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};