const express = require("express");
const router = express.Router();

const { v4: uuid } = require("uuid");

const {
    initializePayment,
    verifyPayment
} = require("../services/paystack");

const { saveOrder } = require("../services/orders");

// Initialize payment
router.post("/initialize", async (req, res) => {
    try {
        const { email, amount } = req.body;

        const reference = uuid();

        const payment = await initializePayment(
            email,
            amount * 100,
            reference
        );

        res.json(payment);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Payment initialization failed."
        });
    }
});

// Verify payment
router.get("/verify/:reference", async (req, res) => {
    try {

        const payment = await verifyPayment(req.params.reference);

        if (
            payment.data &&
            payment.data.status === "success"
        ) {

            saveOrder({
                reference: payment.data.reference,
                email: payment.data.customer.email,
                amount: payment.data.amount / 100,
                status: payment.data.status,
                paidAt: payment.data.paid_at
            });
        }

        res.json(payment);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Verification failed."
        });

    }
});

module.exports = router;
