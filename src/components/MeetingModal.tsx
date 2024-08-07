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
            <DialogContent className={'flex w-full max-w-[630px] flex-col gap-6 border-none bg-light-4 dark:bg-dark-1 px-6 py-9 text-light-5 dark:text-light-4'}>
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-12">
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
                    <div className='grid grid-cols-2 gap-x-5 text-light-4'>
                        <Button
                            className={
                                "bg-red-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                            }
                            onClick={onClose}
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
                            CLose
                        </Button>
                        <Button
                            className={
                                "bg-blue-2 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal