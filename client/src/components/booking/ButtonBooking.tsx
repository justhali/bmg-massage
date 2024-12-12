'use client'
import { useState } from "react";
import ModalCalendar from "./ModalCalendar";
import { Button } from "@/src/app/components/ui/button";



export default function ButtonBooking({ title }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button
                onClick={toggleModal}
                size="lg"
            >
                {title}
            </Button>
            <ModalCalendar isOpen={isOpen} />
        </div>
    );
}