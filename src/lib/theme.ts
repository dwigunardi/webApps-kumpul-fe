// lib/theme.js
import { cookies } from 'next/headers';

export const getCurrentTheme = () => {
  const cookieStore = cookies();
  return cookieStore.get('theme')?.value || 'light';
};
