'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { selectTheme } from '@/lib/features/ui/uiSlice';

export default function ThemeSync() {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
}
