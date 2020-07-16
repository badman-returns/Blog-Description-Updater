//  Function for verifying JWT 

const jwt = require('jsonwebtoken');

module.exports = function auth (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(404).send('Bad Request.')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET) 
        req.user = verified;
        next()
    }catch(err){
        res.status(400).send('Invalid Token');
    }

}