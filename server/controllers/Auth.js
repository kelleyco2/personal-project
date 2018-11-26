const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        try{
            const db = req.app.get('db')
            const { email, password } = req.body

            let clientResponse = await db.getClientByEmail(email)
            let client = clientResponse[0]

            if(!client){
                return res.status(401).send('Email not found')
            }

            const isAuthenticated = bcrypt.compareSync(password, client.password)

            if(!isAuthenticated){
                return res.status(403).send('Incorrect Password')
            }

            delete client.password
            req.session.client = client
            res.send(req.session.client)
        } catch(error){
            console.log('Error logging in', error)
            res.status(500).send(error)
        }
    },

    register: async (req, res) => {
        try{
            const db = req.app.get('db')
            const { name, email, password } = req.body

            let clientResponse = await db.getClientByEmail(email)

            if(clientResponse[0]){
                return res.status(409).send('Email already exits')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.registerClient([name, email, hash])
            let newClient = response[0]

            delete newClient.password

            req.session.client = newClient
            res.send(req.session.client)
        } catch(error){
            console.log('Error Registering')
            res.status(500).send(error)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getCurrentClient: (req, res) => {
        res.send(req.session.client)
    }
}