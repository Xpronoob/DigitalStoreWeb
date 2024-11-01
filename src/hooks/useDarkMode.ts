import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return [theme, toggleTheme] as const;
};
