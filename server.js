const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running"
    });
});

// CREATE STRIPE SESSION
app.post("/create-checkout-session", async (req, res) => {
    try {
        const items = req.body.items || [];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",

            line_items: items.map(item => ({
                price_data: {
                    currency: "zar",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity: item.quantity
            })),

            success_url: "https://nexpak-beepsa.github.io/shop.html?success=true",
            cancel_url: "https://nexpak-beepsa.github.io/shop.html?cancel=true"
        });

        res.json({ id: session.id });

    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
    console.log("Stripe server running on port", PORT);
});
