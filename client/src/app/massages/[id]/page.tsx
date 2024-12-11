import ButtonBooking from "@/components/booking/ButtonBooking";
import { getMassageById } from "lib/api/massages";


export default async function Page(props) {
    const params = await props.params;
    const { id } = params;
    const massage = await getMassageById(id);

    return (
        <div>
            <h1>Massages</h1>
            <h2>{massage.name}</h2>
            <p>{massage.description}</p>
            <p>{massage.price}</p>
            <p>{massage.duration}</p>
            <ButtonBooking massageId={massage.id} title={"Réserver"} />
        </div>
    );
}   