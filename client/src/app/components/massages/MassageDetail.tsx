"use client"
import { Button } from '@/src/components/ui/button';
import { useAuth } from '@/src/app/contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


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


    const handlePayment = async (id: number) => {
        // try {
        //     // Appel à votre API pour créer une session de paiement SumUp
        //     const response = await fetch('/create-payment', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             massageId,
        //             userId: user.id
        //         }),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Erreur lors de la création du paiement');
        //     }

        //     const { paymentUrl } = await response.json();

        //     // Redirection vers la page de paiement SumUp
        //     window.location.href = paymentUrl;
        // } catch (error) {
        //     console.error('Erreur de paiement:', error);
        //     // Gérer l'erreur (afficher un message à l'utilisateur)
        // }
    };
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
                        priority
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

                    <Button className="w-full">
                        Payer {price.toFixed(2)} €
                    </Button>

                </div>
            </div>
        </div>
    );
}
