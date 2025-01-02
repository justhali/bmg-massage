
import { getMassages } from "@/src/lib/api/massages";
import MassageCard from "@/src/components/massages/MassageCard";
import LogoutButton from "@/src/components/layout/logoutButton";



export default async function Page() {
    const massagesList = await getMassages();

    return (
        <div>
            <h1>Massages</h1>
            {
                massagesList.map(massage => (
                    <MassageCard
                        key={massage.id}
                        massageId={massage.id}
                        title={massage.name}
                        price={massage.price}
                        duration={massage.duration}
                        description={massage.description} />
                ))
            }
            <LogoutButton />
        </div>
    );
}