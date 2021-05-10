import React, { useState, useEffect } from 'react'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { ORDER_DETAILS_RESET } from '../constants/orderConstants'

const ProfileScreen = ({ history, location }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
   
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, orders, errorOrders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch({type: ORDER_DETAILS_RESET})
            dispatch(listMyOrders())
            if (!user.name) {
                dispatch(getUserDetails('profile'))    
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, userInfo, history, user])
    

    const submitHandler =  (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }


        // DISPATCH THE THING
    }

    return (
        <Row>
          <Col md={4}>
          <h1>User Profile</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {successUpdate && <Message variant='success'>Profile Updated</Message>}
            {password !== confirmPassword && <Message variant='danger'>Passwords do not match</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter your name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
               
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    UPDATE
                </Button>
            </Form>
          </Col>  
          <Col md={8}>
            <h1>My Orders</h1>
            {loadingOrders ? (
            <Loader />
            ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
            ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                        {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                        ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td>
                        {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                        ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                            Details
                        </Button>
                        </LinkContainer>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            )}
          </Col>
        </Row>

        
    )
}

export default ProfileScreen
