module.exports = {
    addOrder: async (req, res) => {
        const db = req.app.get('db')
        let { id } = req.session.client
        let { total } = req.query

        let response = await db.addOrder([id, total])

        let cart = await db.getCart(id)

        cart.forEach(async item => {
            await db.addOrderProducts([item.product_id, response[0].id, item.quantity])
        })

        await db.checkout(id)

        res.sendStatus(200)
    },

    getOrders: (req, res) => {
        const db = req.app.get('db')

        db.getOrders().then(response => {
            res.status(200).send(response)
        })
    }


    
}