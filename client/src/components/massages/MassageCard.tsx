import { getMassageById } from "lib/api/massages";
import ButtonBooking from "../booking/ButtonBooking";


export default async function MassageCard(props) {
    const params = await props.params;
    const { id } = params;
    const massage = await getMassageById(id);

    return (
        <div>

        </div>
    );
} 