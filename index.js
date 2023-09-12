const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
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
                success: "https://antistampa.netlify.app/dashboard",
                failure: "https://antistampa.netlify.app/dashboard",
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







///////////////////////



// app.post("/create_preference", async (req, res) => {
//     try {
//         const items = req.body.items; // Obtiene el array de productos del cuerpo de la solicitud

//         // Crea un array de objetos de items para la preferencia de MercadoPago
//         const preferenceItems = items.map(item => ({
//             title: item.title,
//             unit_price: Number(item.unit_price),
//             quantity: Number(item.quantity),
//             description: item.description,
//             picture_url: item.picture_url, // Agrega la URL de la imagen del producto
//             color: item.color, // Agrega el color del producto
//             size: item.size, // Agrega el tamaño del producto
//         }));

//         // Construye la preferencia con los items actualizados
//         let preference = {
//             items: preferenceItems,
//             back_urls: {
//                 success: "http://localhost:3000",
//                 failure: "http://localhost:3000",
//                 pending: "",
//             },
//             auto_return: "approved",
//         };

//         const response = await mercadopago.preferences.create(preference);

//         res.json({
//             id: response.body.id,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error al crear la preferencia' });
//     }
// });


//////////////////////
/////////////////


// app.post("/create_preference", async (req, res) => {
//     try {

        
//         const items = req.body.items; // Obtiene el array de productos del cuerpo de la solicitud


//         const preferenceItems = items.map(item => ({
//             title: item.name, // Usar la propiedad del objeto en el array
//             unit_price: Number(item.newTotal), // Usar la propiedad del objeto en el array
//             quantity: Number(item.quantity),
//             picture_url: item.img, // Usar la propiedad del objeto en el array
//             color: item.color, // Usar la propiedad del objeto en el array
//             size: item.size, // Usar la propiedad del objeto en el array
//         }));


//         let preference = {

//             items: preferenceItems,

//             back_urls: {
//                 success: "http://localhost:3000",
//                 failure: "http://localhost:3000",
//                 pending: "",
//             },
//             auto_return: "approved",
//         };

//         //     mercadopago.preferences
//         //         .create(preference)
//         //         .then(function (response) {
//         //             res.json({
//         //                 id: response.body.id,
//         //             });
//         //         })
//         //         .catch(function (error) {
//         //             console.log(error);
//         //         });

//         const response = await mercadopago.preferences.create(preference);

//         res.json({
//             id: response.body.id,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error al crear la preferencia' });
//     }
// });