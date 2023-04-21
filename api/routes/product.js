const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


const router = require("express").Router();

// Create
router.post ("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body) // Retrieve product's info

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Updating
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
        res.status(200).json(updatedProduct)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Product -- Anyone can see the products thus no verification
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id) // Find user with id
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All Product
router.get("/", async (req, res) => {
    const qNew = req.query.new // fetch new products => api/products?new=true
    const qCategory = req.query.category; // fetch products by category  => api/products?category=man
    try {
        let products;

        if (qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5) // retrieve latest 5 products
        } else if (qCategory) { // retrieve products in the category
            products = await Product.find({
                categories: {
                    $in: [qCategory], // checks if the query category exists
                },
            })
        } else {
            products = await Product.find(); // retrieve all products
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;