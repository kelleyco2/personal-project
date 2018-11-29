module.exports = {

    getProducts: (req, res) => {
        let db = req.app.get('db')
        db.getProducts().then(response => {
            res.status(200).send(response)
        })
    },

    addProduct: (req, res) => {
        let db = req.app.get('db')
        let { img, title, description, price } = req.body

        db.addProducts( img, title, description, price ).then(response => {
            res.status(200).send(response)
        })
    },

    updateProduct: (req, res) => {
        let db = req.app.get('db')
        let { id } = req.params
        let { img, title, description, price } = req.body

        db.updateProducts( id, img, title, description, price ).then(response => {
            res.status(200).send(response)
        })
    },

    deleteProduct: (req, res) => {
        let db = req.app.get('db')
        let { id } = req.params
        db.deleteProduct(id).then(response => {
            res.status(200).send(response)
        })
    }
}