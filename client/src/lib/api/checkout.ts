import axios from "axios";
import { SumupCheckout } from "../types/index";

const SUMUP_URL = process.env.SUMUP_API_URL;
const SUMUP_API_KEY = process.env.SUMUP_API_KEY;

export const createCheckout = async (amount: number, checkoutReference: string): Promise<SumupCheckout> => {
    try {
        const response = await axios.post(
            `${SUMUP_URL}/checkouts`,
            {
                checkout_reference: checkoutReference,
                amount,
                currency: "EUR",
                pay_to_email: "just.hvli@gmail.com",
                redirect_url: SUMUP_REDIRECT_URL,
            },
            {
                headers: {
                    Authorization: `Bearer ${SUMUP_API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du paiement :', error.response?.data || error.message);
        throw error;
    }
}


export const completeCheckout = async (id: number): Promise<SumupCheckout | null> => {
    try {

        const response = await axios.put(`${SUMUP_URL}/checkouts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur de récupération du massage ${id}`, error);
        return null;
    }
}