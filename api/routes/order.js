const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


const router = require("express").Router();

// Create | any user can create their own cart
router.post ("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body) // Retrieve product's info

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Updating
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
        res.status(200).json(updatedOrder)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId}) // Find user with id
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All Orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Monthly Income 
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date() // March
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)) // February
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)) // January
    
    try {
        const income = await Order.aggregate ([
            { $match: { createdAt: { $gte: previousMonth } } }, // Orders created the last two months
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"} // total sales of that month
                }
            }
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;