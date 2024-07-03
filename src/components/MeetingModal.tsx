import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    buttonText?: string
    handleClick?: () => void
    className?: string
    image?: string
    children?: React.ReactNode
    buttonIcon?: string
}

const MeetingModal = ({ isOpen, onClose, title, buttonText, handleClick, className, image, children, buttonIcon }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={'flex w-full max-w-[530px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'}>
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image
                                src={image}
                                alt="image"
                                width={72}
                                height={72}
                                className="rounded-full"
                            />
                        </div>
                    )}
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                    {children}
                    <Button
                        className={
                            "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                        }
                        onClick={handleClick}
                    >
                        {buttonIcon && (
                            <Image
                                src={buttonIcon}
                                alt="button icon"
                                width={13}
                                height={13}
                            />
                        )}{" "}
                        &nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal