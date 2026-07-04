const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/payments");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        company: "NexPak Solutions",
        message: "Backend is running."
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
