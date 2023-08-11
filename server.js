const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
    access_token: "TEST-1291734623694321-081112-c71ea35dd9e35c6dec44f1b84ca0b144-91553276",
});

app.get('/', function (req, res) {
    res.send('el servidor de mercadopago funciona');
})

app.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "http://localhost:3000",
            failure: "http://localhost:3000",
            pending: "",
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});


app.listen(8080, () => {
    console.log('server is running on port 8080');
});