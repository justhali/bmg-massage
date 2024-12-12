'use client'
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/app/components/ui/dialog"
import { Calendar } from "@/src/app/components/ui/calendar";

interface ModalCalendarProps {
    isOpen: boolean;
}

export default function ModalCalendar({ isOpen }: ModalCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sélectionnez une date</DialogTitle>
                    <DialogDescription>
                        Choisissez une date pour votre réservation.
                    </DialogDescription>
                </DialogHeader>
                <div>

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



