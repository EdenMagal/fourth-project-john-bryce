const router = require('express').Router();
const { myQuery } = require('../db/config');
const { onlyAdmin } = require('../helpers/onlyAdmin');

router.use(onlyAdmin); 
  
router.post('/addProduct', async (req, res) => {
    try {
        const { name, price, imgUrl, categoryId } = req.body;

        if (!name || !price || !imgUrl || !categoryId) {
            return res.send({ err: 'missing some info' });
        }

        const query = `INSERT INTO products(name, price, imgUrl, categoryId) VALUES("${name}",${price},"${imgUrl}",${categoryId})`;
        await myQuery(query);

        const query1 = `SELECT * FROM products`;
        const products = await myQuery(query1);

        res.send(products);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


router.put('/edit/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const { name, price, imgUrl, categoryId } = req.body;

        if (!name || !price || !imgUrl || !categoryId) {
            return res.send({ err: 'missing some info' });
        }

        const query = `SELECT * FROM products WHERE productId = ${productId}`;
        const product = await myQuery(query);

        if (!product.length) {
            return res.send({ err: 'product not found' });
        }

        const query1 = `UPDATE products SET name = "${name}", price = ${price}, imgUrl = "${imgUrl}", categoryId=${categoryId}    WHERE productId = ${productId}`;
        await myQuery(query1);

        const query2 = `SELECT * FROM products`;
        const products = await myQuery(query2);

        res.send(products);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;