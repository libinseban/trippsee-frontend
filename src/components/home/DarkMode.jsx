import React, { useEffect } from 'react';

const DarkModeToggle = () => {
  const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // If no saved theme, apply system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('light');
      } else {
          document.documentElement.classList.remove('light');
      }
    }
  };

  useEffect(() => {
    applyTheme();
  }, []);

  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  return (
    <button 
      onClick={toggleDarkMode} 
      className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-300"
    >
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeToggle;
