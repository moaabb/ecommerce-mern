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

// @desc Delete a product
// @Route DELETE /api/products/:id
// @access private/admin

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    try {

        await product.remove()
        res.json({message: "product deleted"})
    } catch (error) {
        res.json({error})
    }
}

// @desc Create a product
// @Route POST /api/products/
// @access private/admin

export const createProduct = async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
}

// @desc Update a product
// @Route PUT /api/products/:id
// @access private/admin

export const updateProduct = async (req, res) => {
    const { name, price, image, brand, category, countInStock, description } = req.body

    try {
        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name
            product.price = price
            product.image = image 
            product.brand = brand
            product.category = category
            product.description = description
            product.countInStock = countInStock

            const updatedProduct = await product.save()

            res.json(updatedProduct)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    } catch (error) {
        res.json({error})
    }
    
}

// @desc Review a product
// @Route PUT /api/products/:id/reviews
// @access private

export const createProductReview = async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
        const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
        )
  
        if (alreadyReviewed) {
            res.status(400)
            return res.json({error: "Product already reviewed"})
        }
  
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
    
        product.reviews.push(review)
    
        product.numReviews = product.reviews.length
    
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
    
        await product.save()
        res.status(201).json({ message: 'Review added' })
        } else {
        res.status(404)
        res.json({error: "Product not found"})
    }
  }