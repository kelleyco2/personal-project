module.exports = {

    getOrder: (req ,res) => {
        const db = req.app.get('db')
        let { id } = req.session.client
        db.getOrder(id).then(response => {
            res.status(200).send(response)
        })
    },

    addOrder: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.session.client
        let { total } = req.body

        db.addOrder([id, total]).then(response => {
            res.status(200).send(response)
        })
    }
}