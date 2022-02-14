const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(session({
    secret: 'project4',
    cookie: {
        maxAge: 60 * 60 * 24 * 30
    }
}));

app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/carts', require('./routes/carts'));
app.use('/admin', require('./routes/admin'));


app.listen(1000, () => {
    console.log("up n runnin");
});