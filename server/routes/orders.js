const router = require('express').Router();
const { myQuery } = require('../db/config');
const { onlyUsers } = require('../helpers/onlyUsers');

router.get('/amountOfOrders', async (req, res) => {
    try {
        const query = `SELECT * FROM orders`;
        const orders = await myQuery(query);

        res.send({ orders: orders.length });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/isTheDateAvailable/:date', onlyUsers, async (req, res) => {
    try {
        const date = req.params.date;

        const query = `SELECT * FROM orders WHERE shippingDate = "${date}"`;
        const orders = await myQuery(query);

        if (orders.length >= 3) {
            return res.send({ err: 'too many orders are set to this day, please pick another date.' });
        }

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/order', onlyUsers, async (req, res) => {
    try {

        const customerId = req.session.user.idNumber;

        const { city, street, shippingDate, cardInfo, price } = req.body;

        if (!city || !street || !shippingDate || !cardInfo || !price) {
            return res.send({ err: "missing some info" });
        }

        const query = `SELECT * FROM users WHERE idNumber = ${customerId}`;
        const customer = await myQuery(query);

        if (!customer.length) {
            return res.send({ err: "customer not found" });
        }

        const query1 = `SELECT * FROM carts WHERE customerId = ${customerId} AND isOpen = true`;
        const cart = await myQuery(query1);

        if (!cart.length) {
            return res.send({ err: "cart not found" });
        }

        const query2 = `SELECT * FROM cartitem WHERE cartId = ${cart[0].cartId}`;
        const products = await myQuery(query2);

        if (!products.length) {
            return res.send({ err: "your cart is empty" });
        }

        const query3 = `INSERT INTO orders(customerId, cartId, city, street, shippingDate, cardInfo, price) VALUES (${customerId}, ${cart[0].cartId}, "${city}", "${street}", "${shippingDate}", ${cardInfo}, ${price})`;

        await myQuery(query3);

        const query4 = `UPDATE carts SET isOpen = false WHERE cartId = ${cart[0].cartId}`;
        await myQuery(query4);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

module.exports = router;