const router = require("express").Router();
const User = require("../models/User")
// Used to hide password
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

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
        //password: req.body.password
    })
    
    try{
        //saves user with an async function and sees if a user is saved
        // 201 - Succesfully added | 200 - Successful
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // successfully saved
    } catch (err){
        res.status(500).json(err); // error
    }

})

// Login

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user){
            !user && res.status(401).json("Wrong Username!");
            return;
        }

        //decrypt the password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    
        // get the password string
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        // match the user's password with the password inputed in body
        if (originalPassword != inputPassword){
            res.status(401).json("Wrong Password!");
            return;
        }

        // keeps the user's id and isAdmin property for future
        // user id matching or allow user to access xyz if admin
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
                {expiresIn:"3d"} // this access token expires in 3 days
            );
        
        // Hides password at POST Request
        // Stores other user info into 'others'
        const { password, ...others } = user._doc;

        // returns 'others' from line above (id, user, email) + accesstoken of user
        res.status(200).json({...others, accessToken});
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;