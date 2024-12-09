import { getBookings } from "lib/api/bookings";

export default async function page() {
    const bookingList = await getBookings();

    return (
        <div>
            <h1>Réservation</h1>
            {
                bookingList.map(booking => (
                    <>
                        <p>{booking.bookingDate}</p>
                        <p>{booking.email}</p>
                        <p>{booking.status}</p>
                    </>
                ))
            }
        </div>
    );
}