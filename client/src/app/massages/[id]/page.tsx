import ButtonBooking from "@/src/components/booking/ButtonBooking";
import MassageDetail from "@/src/components/massages/MassageDetail";
import { getMassageById } from "@/src/lib/api/massages";


export default async function Page(props) {
    const params = await props.params;
    const { id } = params;
    const massage = await getMassageById(id);

    return (
        <div>
            <MassageDetail
                id={massage.id}
                name={massage.name}
                description={massage.description}
                price={massage.price}
                duration={massage.duration}
            />
        </div>
    );
}   