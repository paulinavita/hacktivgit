const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../models/user')
var jwt = require('jsonwebtoken');

class AuthController {

    static googleSignIn (req,res) {
        let payload = null
        let token;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            
            payload = ticket.getPayload();
            console.log(payload)
            const userid = payload['sub'];
            
            return User.findOne({email : payload.email})
        })
        .then(foundUser => {
            if (!foundUser) {
                return User.create({
                    email : payload.email,
                    name : payload.name,
                    password : 'ABC123'
                })
            } else {
                token = jwt.sign({name: foundUser.name, email:foundUser.email},
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                    );
                    console.log(token, 'bawah')
                    res.status(200).json({
                        token
                    })
            }
        })
        .then(saved => {
            token = jwt.sign({name: saved.name, email: saved.email},
                process.env.JWT_SECRET,
                { expiresIn: '24h' })
            res.status(200).json({message : 'Logged in via google', token})
            console.log(token, 'dithen')

        })
        .catch(err =>{
            res.status(400).json({err : err.message})
        })
    }
}

module.exports = AuthController