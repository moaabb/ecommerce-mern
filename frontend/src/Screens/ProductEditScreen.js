import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { listProductDetails, updateProduct  } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from  'react-redux'
import FormContainer from '../components/FormContainer'
import {  Form, Button } from 'react-bootstrap'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({ history, match }) => {
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [uploading, setUploading] =useState(false)
   
    const dispatch = useDispatch()
    const productID = match.params.id


    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProduct, errorProduct, product } = productDetails
    
    const productUpdate = useSelector(state => state.productUpdate)
    const { success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productID ) {
                dispatch(listProductDetails(productID))
            } else {
                setName(product.name)
                setBrand(product.brand)
                setDescription(product.description)
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setImage(product.image)
            }    
        }
        
    }, [dispatch, product, productID, history, successUpdate])
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          console.log(data);
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
    }

    const submitHandler =  (e) => {
        e.preventDefault()
        const updatedProduct = { name, price, brand, countInStock, image, description, category, _id: productID }
        dispatch(updateProduct(updatedProduct))
    }

    return (

        <>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
                Go Back
            </Link>
            {loadingProduct ? <Loader/> : errorProduct ? <Message variant='danger'>{errorProduct}</Message> : (
                <FormContainer>
                    <h1>Edit Product</h1>
                    
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter the product name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                    
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter the product price' value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter the product image address' value={image} onChange={e => setImage(e.target.value)}></Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter the product brand' value={brand} onChange={e => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label>Count in Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter the product Stock' value={countInStock} onChange={e => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter the product category' value={category} onChange={e => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter the product description' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                </FormContainer>
            )}
            
        </>
        
    )
}

export default ProductEditScreen
