'use client'
import { Calendar } from "@/styles/components/ui/calendar"
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/styles/components/ui/dialog"

interface ModalCalendarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalCalendar({ isOpen, onClose }: ModalCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sélectionnez une date</DialogTitle>
                    <DialogDescription>
                        Choisissez une date pour votre réservation.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-screen">

                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        classNames={undefined} />
                </div>
            </DialogContent>
            <DialogFooter>
            </DialogFooter>
        </Dialog>
    )

}



