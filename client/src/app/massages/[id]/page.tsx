'use client'
import { getMassageById } from "lib/api/massages";
import ButtonBooking from "@/components/booking/ButtonBooking";
import { createBooking } from "lib/api/bookings";
import { useEffect, useState } from "react";

export default function Page(props) {
    const [massage, setMassage] = useState(null);
    const [error, setError] = useState(null);

    // const massage = await getMassageById(id);
    // const bookAMassage = await createBooking(id);

    // const handleBooking = () => {
    //     bookAMassage
    // }
    useEffect(() => {
        async function fetchMassage() {
            try {
                const params = props.params;
                const massageId = params.id;
                console.log("On est censée récupérer un massage ici", await getMassageById(massageId))
                const massageData = await getMassageById(massageId);
                setMassage(massageData);
            } catch (err) {
                setError(err);
            }
        }

        fetchMassage();
    }, []);

    const handleBooking = async () => {
        const params = props.params;
        const id = params.id;
        await createBooking(id);
    }


    return (
        <div>
            <h1>Massages</h1>
            {/* <h2>{massage.}</h2> */}
            {/* <p>{massage.description}</p>
            <p>{massage.price}</p>
            <p>{massage.duration}</p> */}
            < ButtonBooking
                onClick={() => handleBooking()}
                title="Réserver"
            />
        </div>
    );
}