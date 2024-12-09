import { getBookingById } from "lib/api/bookings";

export default async function Page(props) {
    const params = await props.params;
    const id = await params.id;
    const booking = await getBookingById(id);

    return (
        <div>
            <h2>{booking.bookingDate}</h2>
            <p>{booking.status}</p>
        </div>
    );
}