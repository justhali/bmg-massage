'use client'
import { useState } from "react";

import { Button } from "@/src/app/components/ui/button";
import { BookingForm } from "./BookingForm";



export default function ButtonBooking({ title, massageId }) {
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
            {isOpen &&
                <BookingForm
                    isOpen={isOpen}
                    massageId={massageId}
                />}
        </div>
    );
}