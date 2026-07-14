'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function getInitialDark() {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const value = getInitialDark();
    setDark(value);
    document.documentElement.classList.toggle('dark', value);
    setMounted(true);
  }, []);

  function toggle() {
    const value = !dark;
    setDark(value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', value);
  }

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex items-center gap-2 rounded-lg px-2 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        <Moon size={17} />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
      className="flex items-center gap-2 rounded-lg px-2 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
      <span className="hidden text-xs font-semibold sm:inline">
        {dark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
