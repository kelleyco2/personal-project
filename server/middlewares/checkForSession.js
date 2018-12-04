module.exports = function ( req, res, next ){
    if(!req.session.client){
        return res.status(403).send('User not logged in')
        // console.log(req.session.client)
        // req.session.client = {
        //     id: 2
        // }
    }
    next()
}