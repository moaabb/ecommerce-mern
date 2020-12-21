import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'


const HomeScreen =  () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
       
    }, [])
    return (
            <>
                <h1>Our Latest Products</h1>
                <Row>
                    {products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                               <Product product={product}/>                         
                            </Col>
                        )
                    })}
                </Row>  
            </>
    )
    
}

export default HomeScreen
