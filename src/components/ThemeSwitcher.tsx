"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function ThemeSwitcher() {
  const { theme, systemTheme, setTheme } = useTheme()
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      replace(`${pathname}?${params.toString()}`);
      return params.toString()
    },
    [replace, pathname, searchParams]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="min-w-fit w-full px-3">
        <Button variant="default" size="icon">
          <Sun className={`absolute h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-light-4 active:border-none`} />
          <Moon className={`absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 active:border-none text-white`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={theme === "dark" ? "bg-dark-1 text-white" : theme === "light" ? "bg-white text-dark-1" : ""}>
        <DropdownMenuItem className={theme === "dark" ? "text-white" : theme === "light" ? "text-dark-1" : "text-white"} onClick={() => {
          createQueryString("theme", "light")
          setTheme("light")
        }}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className={theme === "dark" ? "text-white" : theme === "light" ? "text-dark-1" : "text-white"} onClick={() => {
          createQueryString("theme", "dark")
          setTheme("dark")
        }}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
