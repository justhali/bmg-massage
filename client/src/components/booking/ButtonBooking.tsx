'use client'
import { Button } from "@/styles/components/ui/button";
import { useState } from "react";
import ModalCalendar from "./ModalCalendar";


interface ButtonBookingProps {
    title: string;
    massageId: number;
}

export default function ButtonBooking({ title, massageId }: ButtonBookingProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <Button onClick={toggleModal}>{title}</Button>
            <ModalCalendar isOpen={isOpen} onClose={closeModal} />
        </div>
    );
}