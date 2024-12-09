import { getMassageById } from "lib/api/massages";

export default async function Page({ params }) {
    const id = await params.id;
    const massage = await getMassageById(id);

    return (
        <div>
            <h1>Massages</h1>
            <h2>{massage.name}</h2>
            <p>{massage.description}</p>
            <p>{massage.price}</p>
            <p>{massage.duration}</p>
        </div>
    );
}