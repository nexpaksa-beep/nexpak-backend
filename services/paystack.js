const axios = require("axios");

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

async function initializePayment(email, amount, reference) {

    const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
            email,
            amount,
            reference
        },
        {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

module.exports = {
    initializePayment
};
