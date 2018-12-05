require('dotenv').config()

const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')
const stripe = require('stripe')("sk_test_z2BLRg49ADmItyb3eVpKwt4y")

const ac = require('./controllers/Auth')
const pc = require('./controllers/ProductsController')
const cc = require('./controllers/CartController')
const checkForSession = require('./middlewares/checkForSession')
const oc = require('./controllers/OrderController')

const app = express()

const { CONNECTION_STRING, SERVER_PORT: PORT, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected!')
})

app.use(bodyParser.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

app.post('/auth/login', ac.login)
app.post('/auth/register', ac.register)
app.get('/auth/logout', ac.logout)
app.get('/auth/currentClient', ac.getCurrentClient)

app.get('/api/products', pc.getProducts)
app.post('/api/products', pc.addProduct)
app.delete('/api/products/:id', pc.deleteProduct)
app.put('/api/products/:id', pc.updateProduct)

app.post('/charge', async (req, res) => {
    try {
        let {status} = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'An example charge',
            source: req.body.data.token
        })

        res.json({status})
    } catch(err){
        console.log('Payment:', err)
        res.status(500).end()
    }
})

app.get('/api/orders', oc.getOrders)
app.post('/api/orders/:id', oc.addOrderStatus)
app.post('/api/orders', oc.getOrdersByDate)


app.use(checkForSession)

app.get('/api/cart', cc.getCart)
app.post('/api/cart/:id', cc.addToCart)
app.put('/api/cart/:id', cc.updateQuantity)
app.delete('/api/cart/checkout', cc.checkout)
app.delete('/api/cart/:id', cc.deleteItem)

app.post('/api/order', oc.addOrder)

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})