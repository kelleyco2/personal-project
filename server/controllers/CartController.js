module.exports = {
    getCart: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.session.client
        db.getCart([id]).then(response => {
            res.status(200).send(response)
        })
    },

    addToCart: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let { id: clientId } = req.session.client

        db.getCart(clientId).then(response => {
            let index = response.findIndex(cartItem => cartItem.product_id === +id)
            if(index === -1){
                db.addToCart([id, clientId]).then(response => {
                    res.status(200).send(response)
                })
            } else {
                let newQuantity = response[index].quantity + 1
                db.updateQuantity(id, newQuantity, clientId).then(response => {
                    res.status(200).send(response)
                })
            }
        }).catch(err => {
            console.error('error adding product', err)
            res.status(500).send(err)
        })
    },

    updateQuantity: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let { id: clientId } = req.session.client
        let { quantity } = req.body
        if(quantity){
            db.updateQuantity(id, quantity, clientId).then(response => {
                res.status(200).send(response)
            })
        } else if(+quantity === 0){
                db.deleteItem(id, clientId).then(response => {
                    res.status(200).send(response)
                })
            }
    },

    deleteItem: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let { id: clientId } = req.session.client

        
        db.deleteItem(id, clientId).then(response => {
            res.status(200).send(response)
        }).catch(err => {
            console.log('errorrrrrrr', err)
        })
    },

    checkout: (req, res) => {
        const db = req.app.get('db')
        let { id: clientId } = req.session.client
        db.checkout(clientId).then(response => {
            res.status(200).send(response)
        })
    }
}