// This file contains code for new user registration & login.


const router = require('express').Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

//  Schema is used for validation during registration
const registerSchema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
})

//  Schema is used for validation during login
const loginSchema = Joi.object({
    email:Joi.string()
        .required(),
    password:Joi.string()
        .required()
})

//REGISTER A NEW USER

router.post('/register', async(req, res)=>{   
    
    const {error} = registerSchema.validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

        // Checking if the user exist in database   
        const checkExistingEmail =  await User.findOne({email: req.body.email});
        if(checkExistingEmail) return res.status(400).send('Email already exist');


    // Hash  passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

     //Create New Database for user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword    
    });
    try {
        const savedUser =  await user.save()
        res.send({user : user._id});
    } catch(err) {
        res.status(400).send(err);
        
    }
});

// LOGIN EXISTING USER

router.post('/login',  async(req, res) =>{
    const {error} = loginSchema.validate(req.body)
    if(error)
        return res.status(400).send(error.details[0].message);

        // Checking if the user exist in database   
        const user =  await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email does not exist');

        // Check Password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Password does not match');

        // Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn:'1h'});
        res.header('auth-token', token).send(token);

});



module.exports = router;