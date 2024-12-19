'use client'
import { useState } from "react";

import { Button } from "@/src/app/components/ui/button";
import { BookingForm } from "./BookingForm";
import Link from "next/link";



export default function ButtonBooking({ title, massageId }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button
                onClick={toggleModal}
                size="lg"
                asChild
            >
                <Link href="/login">{title}</Link>
            </Button>
        </div>
    );
}