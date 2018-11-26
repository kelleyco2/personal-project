require('dotenv').config()

const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')

const ac = require('./controllers/Auth')
const pc = require('./controllers/ProductsController')

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

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})