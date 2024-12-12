
import Image from 'next/image';
import ButtonBooking from '../booking/ButtonBooking';

interface MassageDetailProps {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
}

export default function MassageDetail({
    id,
    name,
    description,
    price,
    duration,
}: MassageDetailProps) {
    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">

            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                    <Image
                        src={`/images/${id}.jpg`}
                        alt={`Image de ${name}`}
                        width={600}
                        height={600}
                        className="w-full h-auto max-h-[600px] object-cover rounded-lg border border-gray-300"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
                    </div>

                    <div>
                        <div className="text-lg text-gray-800 font-semibold mb-4">
                            Prix : <span>{price.toFixed(2)} €</span>
                        </div>
                        <div className="text-lg text-gray-800 font-semibold mb-6">Durée : {duration}</div>
                    </div>

                    <ButtonBooking title={"Réserver"} />
                </div>
            </div>
        </div>
    );
}
