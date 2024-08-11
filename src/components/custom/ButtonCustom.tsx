import React from "react"
import { Button } from "../ui/button"

interface ButtonCustomProps {
    bgColor: React.ComponentProps<"button">["className"]
    textColor: React.ComponentProps<"button">["className"]
    shadowColor: React.ComponentProps<"button">["className"]
    children: React.ReactNode
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    className?: string
    onClick?: () => void
}

export default function ButtonCustom(props: ButtonCustomProps) {
    const { bgColor, textColor, shadowColor, children, variant = undefined } = props
    return (
        <Button
            variant={variant}
            className={`w-full md:w-fit px-5 text-nowrap hover:before:${bgColor} relative overflow-hidden border border-blue-1 bg-white ${textColor} shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:${bgColor} before:transition-all before:duration-500 hover:text-white hover:${shadowColor} hover:before:left-0 hover:before:w-full`}
        >
           {children}
        </Button>
    )
}