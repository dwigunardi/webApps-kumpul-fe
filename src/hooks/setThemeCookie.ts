// components/SetThemeCookie.js
'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes'; 

const SetThemeCookie = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year expiry
  }, [theme]);

  return null;
};

export default SetThemeCookie;
