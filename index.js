const express = require('express');
const cors = require('cors');
const userRouter = require('./Router/userRouter');
const productRouter = require('./Router/productRouter');
const shoppingCartRouter = require('./Router/shoppingCartRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/shoppingCart', shoppingCartRouter);
app.use(express.static('Views'));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/Views/login.html');
});

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' })
})

app.use((err, req, res, next) => {
    if (err.message === 'BOOK NOT FOUND' || err.message === 'PRODUCT NOT FOUND') {
        res.status(404).json({ error: err.message })
    } else {
        res.status(500).json({ error: 'Something went wrong!!!' })
    }
});

app.listen(3000, () => console.log('Listening to 3000...'))