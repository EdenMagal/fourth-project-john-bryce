const { myQuery } = require('../db/config');
const { onlyLogged } = require('../helpers/onlyLogged');

const router = require('express').Router();

router.get('/allProducts', onlyLogged, async (req, res) => {
    try {
        const query = `SELECT * FROM products`;
        const products = await myQuery(query);

        res.send(products);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/byCategory/:id', onlyLogged, async (req, res) => {
    try {
        const categoryId = req.params.id;

        const query = `SELECT * FROM PRODUCTS WHERE categoryId = ${categoryId}`;
        const products = await myQuery(query);

        res.send(products);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/amountOfProducts', async (req, res) => {
    try {
        const query = `SELECT * FROM products`;
        const products = await myQuery(query);

        res.send({ products: products.length });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/searchProduct/:name', onlyLogged, async (req, res) => {
    try {
        const name = req.params.name;

        const query = `SELECT * FROM products WHERE name LIKE "%${name}%"`;
        const products = await myQuery(query);

        if (!products.length) {
            return res.send({ err: 'no results match your search' });
        }

        res.send(products);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/product/:id', onlyLogged, async (req, res) => {
    try {
        const productId = req.params.id;

        const query = `SELECT * FROM products WHERE productId = ${productId}`;
        const product = await myQuery(query);

        if (!product.length) {
            return res.send({ err: "product not found" });
        }

        res.send(product);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;