"use client"
import { useTheme } from "next-themes";
export const getThemeParam = (): string => {
  const { theme } = useTheme();
  return theme || "light";
};