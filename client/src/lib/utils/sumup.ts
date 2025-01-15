const axios = require('axios');

const SUMUP_API_KEY = process.env.SUMUP_API_KEY;
const SUMUP_REDIRECT_URL = process.env.SUMUP_REDIRECT_URL;
const SUMUP_BASE_URL = process.env.SUMUP_API_URL;


const sumupService = {
    createCheckout: async (amount, checkoutReference) => {
        try {
            const response = await axios.post(
                `${SUMUP_BASE_URL}/checkouts`,
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
    },
};

module.exports = sumupService;