"use client";
import { useState } from "react";
import { createCheckout, completeCheckout } from "@/src/lib/api/checkout";
import { Button } from "@/src/components/ui/button";


export default function WidgetSumup() {
    const [checkoutId, setCheckoutId] = useState<string | null>(null);

    const handlePayment = async () => {
        try {
            const checkoutData = await createCheckout(100, "ref123456");

            const newCheckoutId = checkoutData.id;
            setCheckoutId(newCheckoutId);

            const completedCheckout = await completeCheckout(newCheckoutId);

            if (window.SumUpCard) {
                window.SumUpCard.mount({
                    id: "sumup-card",
                    checkoutId: newCheckoutId,
                    onResponse: function (type: string, body: any) {
                        console.log("Type:", type);
                        console.log("Body:", body);
                    },
                });
            } else {
                console.error("Le SDK SumUp n'est pas chargé.");
            }
        } catch (error) {
            console.error("Erreur lors du traitement du paiement :", error);
        }
    };
    return (
        <div id="sumup-card">
            <Button onClick={handlePayment}>Paiement</Button>
        </div>
    );
}