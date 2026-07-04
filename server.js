const express = require("express");
const stripe = require("stripe")("YOUR_SECRET_KEY");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",

        line_items: req.body.items.map(item => ({
            price_data: {
                currency: "zar",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        })),

        success_url: "http://localhost:5500/shop.html?success=true",
        cancel_url: "http://localhost:5500/shop.html?cancel=true"
    });

    res.json({ id: session.id });
});

app.listen(4242, () => {
    console.log("Stripe server running on port 4242");
});
