import Product from '../models/productModel.js'

// @desc FETCH All products
// @Route GET /api/products
// @access Public

export const getProducts = (req, res) => {
    Product.find()
        .then(data => res.json(data))
        .catch(err => res.status(404).json({message: err.message}))
}

// @desc FETCH a single product by ID
// @Route GET /api/products/:id
// @access Public

export const getProductByID = (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json(`Error: Product not found. ${err.message}`))
}