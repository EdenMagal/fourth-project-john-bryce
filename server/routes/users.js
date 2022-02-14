const router = require('express').Router();
const { myQuery } = require('./../db/config');
const { onlyLogged } = require('../helpers/onlyLogged');



router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send({ err: 'missing some info' });
        }

        const query = `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`;
        const user = await myQuery(query);

        if (!user.length) {
            return res.send({ err: 'incorrect username or password' });
        }

        req.session.user = user[0];

        res.send(user[0]);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, idNumber, password, city, street } = req.body;

        if (!firstName || !lastName || !username || !idNumber || !password || !city || !street) {
            return res.send({ err: 'missing some info' });
        }

        const query = `SELECT * FROM users WHERE username = "${username}"`;
        let user = await myQuery(query);

        if (user.length) {
            return res.send({ err: 'username taken' });
        }

        const query2 = `SELECT * FROM users WHERE idNumber = ${idNumber}`;
        user = await myQuery(query2);

        if (user.length) {
            return res.send({ err: 'id already exists' });
        }

        const query1 = `INSERT INTO users(firstName, lastName, username, idNumber, password, city, street) VALUES ("${firstName}", "${lastName}", "${username}", "${idNumber}", "${password}", "${city}", "${street}")`;
        await myQuery(query1);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.delete('/logout', onlyLogged, async (req, res) => {
    try {
        req.session.destroy();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/check/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const query = `SELECT * FROM users WHERE idNumber = ${id}`;
        const user = await myQuery(query);

        if (user.length) {
            return res.send({ err: 'id already exists' });
        }

        return res.send({ msg: "ok" });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/shippingInfo', onlyLogged, async (req, res) => {
    try {

        const idNumber = req.session.user.idNumber;

        const query = `SELECT * FROM users WHERE idNumber = ${idNumber}`;
        const customer = await myQuery(query);

        if (!customer.length) {
            return res.send({ err: "customer not found" });
        }

        res.send({ street: customer[0].street, city: customer[0].city });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/getUser/:idNumber', async (req, res) => {
    try {
        const id = req.params.idNumber;
        if (req.session.user.idNumber == id) {
            return res.send(req.session.user);
        }

        res.send({ err: 'no user' });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});



module.exports = router;