'use client';

import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);

    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    document.documentElement.classList.toggle("dark", newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
    setDarkMode(newValue);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors"
    >
      {darkMode ? '🌙' : '☀️ '}
    </button>
  );
};

export default ThemeToggle;
