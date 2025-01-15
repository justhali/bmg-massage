"use server"
import axios from "axios";


const URL = process.env.SUMUP_API_URL;
const API_KEY = process.env.SUMUP_API_KEY;

export const createCheckout = async (amount: number, checkout_reference: string) => {
    try {
        const response = await axios.post(
            `${URL}/checkouts`,
            {
                checkout_reference: checkout_reference,
                amount,
                currency: "EUR",
                pay_to_email: "just.hvli@gmail.com",
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du paiement :', error.response?.data || error.message);
        throw error;
    }
}


export const completeCheckout = async (id: string) => {
    try {
        const response = await axios.put(
            `${URL}/checkouts/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Erreur de récupération du massage ${id}`, error);
        return null;
    }
}