const router = require("express").Router();
const User = require("../models/User")
// Used to hide password
const CryptoJS = require('crypto-js');

/*
 * User registers with username, email and password
 * Post Request with that info
 * Create User model using the info by storing it into it's data fields
*/
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    
    try{
        //saves user with an async function and sees if a user is saved
        const savedUser = await newUser.save();
        res.status(201).json(savedUser) // successfully saved
    } catch (err){
        res.status(500).json(err); // error
    }

})

// Login

router.post("/login", async (req,res)=>{

})

module.exports = router;