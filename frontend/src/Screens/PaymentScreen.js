import React, { useState } from 'react'
import { useDispatch, useSelector } from  'react-redux'
import FormContainer from '../components/FormContainer'
import { Form, Button, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = ({ history }) => {

    const shippingAddress = useSelector(state => state.cart.shippingAddress)

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    if (!shippingAddress) {
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod( paymentMethod ))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
        
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Col>
                        <Form.Label as='label'>Select Method</Form.Label>
                        <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' checked value='PayPal' onChange={e => setPaymentMethod(e.target.value)}> 
                        </Form.Check>
                    </Col>
                    
                    
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
