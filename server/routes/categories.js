const { myQuery } = require('../db/config');
const { onlyLogged } = require('../helpers/onlyLogged');

const router = require('express').Router();

router.use(onlyLogged);

router.get('/categories', async (req, res) => {
    try {
        const query = `SELECT * FROM categories`;
        const categories = await myQuery(query);
        res.send(categories);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;