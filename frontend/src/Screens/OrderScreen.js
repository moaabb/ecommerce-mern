import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from  'react-redux'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2"
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import { getOrderDetails, orderDeliver, payOrder } from '../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
    const orderID = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)


    const { order, error, loading: loadingDetails } = useSelector(state => state.orderDetails)
    const { userInfo } = useSelector(state => state.userLogin)
    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)
    const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver)

    useEffect(() => {        
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=BRL`

            script.onload = () => setSdkReady(true)
            document.body.appendChild(script)
        }
        
        !userInfo && history.push('/login') 
        if (order && userInfo) {
            if (order.user._id !== userInfo._id && !userInfo.isAdmin) history.push('/')
        } 


        if(!order || successPay || successDeliver) {
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderID))

        } else if(!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

        

    }, [dispatch, orderID, order, successPay, history, userInfo, successDeliver])

    const onSuccessHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderID, paymentResult))
    }

    const onDeliverHandler = () => {
        dispatch(orderDeliver(order))
    }


    return loadingDetails ? <Loader/> : error ? <Message variant='danger'>{ error }</Message> : 
    (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <div className='my-3'>
                                <strong>Name:</strong> {order.user.name}
                            </div>
                            <div className='my-3'>
                                <strong>Email:</strong>
                                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                            </div>
                            <div className='my-3'>
                                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country} 
                            </div>
                            <div className='my-3'>
                                {order.isDelivered ? <Message variant='success'>Delivered at {order.deliveredAt}</Message>: <Message variant='danger'>Not Delivered</Message>}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <div className='my-3'>
                                <strong> Method: </strong> {order.paymentMethod}
                            </div>
                            <div className='my-3'>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>: <Message variant='danger'>Not Paid</Message>}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>    
                                                    <strong>{item.qty} X ${item.price} = ${item.qty * item.price} </strong>                                               
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? (
                                        <Loader/> 
                                    ) : (
                                        <PayPalButton amount={order.totalPrice} currency='BRL' onSuccess={onSuccessHandler}/>
                                        
                                    )}
                                </ListGroup.Item>
                            )}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button  type='button' className='btn btn-block' onClick={onDeliverHandler}>
                                        Mark as Delivered
                                    </Button>
                                    {loadingDeliver && <Loader/>}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
