const express = require("express");
const router = express.Router();

const { v4: uuid } = require("uuid");
const { initializePayment } = require("../services/paystack");

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

module.exports = router;
