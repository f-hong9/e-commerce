const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


const router = require("express").Router();

// Updating -- must verify user's token and if they are an authorized user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body // Get everything from the body and update it (e.g you changed the username from test to testu => updates username and sets all the info from test)
            },
            { new: true }
        )
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Delete -- must verify user's token and if they are an authorized user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User -- Only admin can get user; thus must verify the user's token and if they are admin
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id) // Find user with id
        const { password, ...others } = user._doc;
        res.status(200).json(others); // prints everything but password
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All Users -- Only admin can get all users; thus must verify the user's token and if they are admin
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new // retrieves new user => api/users?new=true
    try {
        // If there is a query (new user), retrieve the latest #(limit) users
        // else, return all users
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        // MongoDB aggregate
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } }, // Users created greater than last year e.t.c if last year = 2022, users created from 2022 to 2023
            {
                $project:{
                    month: { $month: "$createdAt" }, // Assign month createdAt to month (e.g. if $year: "$createdAt", gets year of date created)
                },
            },
            {
                $group: {
                    _id: "$month", // 1 - January e.t.c
                    total: { $sum : 1 }, // how many users were created at the same month
                }
            }
        ])
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;