const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());


mercadopago.configure({
    access_token: "TEST-7899621053516003-031112-f1e27f6ce8eae7bff80e5b0a139298f4-170171815",
});

app.get('/', function (req, res) {
    res.send('el servidor de mercadopago funciona');
})

app.post("/create_preference", async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                },
            ],
            back_urls: {
                success: "http://localhost:3000/confirmed",
                failure: "http://localhost:3000/",
                pending: "",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);

        res.json({
            id: response.body.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
    }
});



app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
});






