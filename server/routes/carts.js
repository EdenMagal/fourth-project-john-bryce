const router = require('express').Router();
const { myQuery } = require('../db/config');
const { onlyUsers } = require('../helpers/onlyUsers');

router.use(onlyUsers);

router.get('/cartStatus', async (req, res) => {
    try {
        const customerId = req.session.user.idNumber;

        const query3 = `SELECT * FROM users WHERE idNumber = ${customerId}`;
        const user = await myQuery(query3);

        if (user[0].role == "admin") {
            return res.send({ msg: "welcome back admin :)" })
        }

        const query = `SELECT * FROM carts WHERE customerId = ${customerId} AND isOpen = true`;
        const cart = await myQuery(query);

        if (cart.length) {
            return res.send({ msg: `You have an open cart from ${new Date(cart[0].creationDate).toLocaleDateString('en-IL')}` })
        }

        const query1 = `SELECT * FROM orders WHERE customerId = ${customerId}`;
        const order = await myQuery(query1);

        if (order.length) {
            return res.send({ msg: `Your last order with us was at ${order[order.length - 1].orderDate.toLocaleDateString('en-IL')}, start shopping :)` });
        }

        res.send({ msg: 'Welcome , start shopping :)' })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.post('/addToCart', async (req, res) => {
    try {

        const { productId, amount, customerId } = req.body;

        if (!customerId || !amount || !customerId) {
            return res.send({ err: "missing some info" });
        }

        if (amount < 0) {
            return res.send({ err: "choose a valid amount" });
        }

        const query = `SELECT * FROM products WHERE productId = ${productId}`;
        const product = await myQuery(query);

        if (!product.length) {
            return res.send({ err: "product not found" });
        }

        const query1 = `SELECT * FROM carts WHERE customerId = ${customerId} AND isOpen = true`;
        const cart = await myQuery(query1);

        if (!cart.length) {
            return res.send({ err: "cart not found" });
        }

        const query3 = `SELECT * FROM cartitem WHERE cartId = ${cart[0].cartId} AND productId = ${productId}`;
        const prod = await myQuery(query3);

        if (prod.length) {
            const totalPrice = amount * product[0].price;
            const query4 = `UPDATE cartitem SET amount = amount + ${amount} , totalPrice = totalPrice + ${totalPrice}`;
            await myQuery(query4);
            return res.sendStatus(201);
        }

        const query2 = `INSERT INTO cartitem(productId,amount,totalPrice,cartId) VALUES (${productId},${amount},${amount * product[0].price},${cart[0].cartId})`;
        await myQuery(query2);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/cartProducts/:cartId', async (req, res) => {
    try {

        const cartId = req.params.cartId;

        const query = `SELECT * FROM carts WHERE cartId = ${cartId} AND isOpen = true`;
        const cart = await myQuery(query);

        if (!cart.length) {
            return res.send({ err: "cart not found" });
        }

        const query1 = `SELECT * FROM cartitem INNER JOIN products ON cartItem.productId = products.productId WHERE cartId = ${cartId}`;
        const products = await myQuery(query1);

        res.send(products);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/cartTotal/:cartId', async (req, res) => {
    try {

        const cartId = req.params.cartId;

        const query = `SELECT * FROM carts WHERE cartId = ${cartId} AND isOpen = true`;
        const cart = await myQuery(query);

        if (!cart.length) {
            return res.send({ err: "cart not found" });
        }

        const query1 = `SELECT * FROM cartitem WHERE cartId = ${cartId}`;
        const products = await myQuery(query1);

        if (!products.length) {
            return res.send({ total: 0 });
        }

        const prices = products.map(product => { return product.totalPrice });

        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        res.send({ total: prices.reduce(reducer, 0) });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.delete('/removeItem/:cartId/:productId', async (req, res) => {
    try {

        const { productId, cartId } = req.params;

        const query = `SELECT * FROM carts WHERE cartId = ${cartId} AND isOpen = true`;
        const cart = await myQuery(query);

        if (!cart.length) {
            return res.send({ err: 'cart not found' });
        }

        const query1 = `SELECT * FROM products WHERE productId = ${productId}`;
        const product = await myQuery(query1);

        if (!product.length) {
            return res.send({ err: 'product not found' });
        }

        const query2 = `DELETE FROM cartitem WHERE cartId = ${cartId} AND productId = ${productId}`;
        await myQuery(query2);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.delete('/emptyCart/:cartId', async (req, res) => {
    try {

        const cartId = req.params.cartId;

        const query = `SELECT * FROM carts WHERE cartId = ${cartId} AND isOpen = true`;
        const cart = await myQuery(query);

        if (!cart.length) {
            return res.send({ err: "cart not found" });
        }

        const query2 = `DELETE FROM cartitem WHERE cartId = ${cartId}`;
        await myQuery(query2);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/getCart', async (req, res) => {
    try {

        const customerId = req.session.user.idNumber;

        const query = `SELECT * FROM users WHERE idNumber = ${customerId}`;
        const user = await myQuery(query);

        if (!user.length) {
            return res.send({ err: "user not found" });
        }

        const query1 = `SELECT * FROM carts WHERE customerId = ${customerId} AND isOpen = true`;
        let cart = await myQuery(query1);

        if (cart.length) {
            return res.send({ cartId: cart[0].cartId });
        }

        const query2 = `INSERT INTO carts(customerId) VALUES (${customerId})`;
        await myQuery(query2);

        cart = await myQuery(query1);

        res.send({ cartId: cart[0].cartId });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = router;