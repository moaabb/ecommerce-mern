import { Router } from 'express'
import mongoose from 'mongoose'
import Product from '../models/productModel.js'

const router = Router()


// Pega todos os produtos

router.get('/', (req, res) => {
    Product.find()
        .then(data => res.json(data))
        .catch(err => res.status(404).json({message: err.message}))
})

// Busca um produto pela id

router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json(`Error: ${err.message}`))
})

export default router