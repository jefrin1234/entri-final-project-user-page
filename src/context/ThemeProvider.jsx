// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme  === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
   
  }, [theme]);

  

  const toggleTheme = () => {

    const newTheme = theme === 'dark' ? 'light' : 'dark'; // Determine the new theme
  setTheme(newTheme); // Set the new theme in state
  localStorage.setItem('theme', newTheme); 
  
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
