const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    // Checks if this user has a valid token
    if (authHeader){
        const token = authHeader.split(" ")[1]; // gets the second element since token == "Bearer' 'gwe125125mk1op"
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json("Token is not valid!"); // Wrong token or expired
            req.user = user // If no error, route to the requested user
            next() // leaves and goes to user.js route
        });
    } else {
        // No token (user not registered)
        return res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // id does not match or user is not an admin
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

// Verifies if the user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};