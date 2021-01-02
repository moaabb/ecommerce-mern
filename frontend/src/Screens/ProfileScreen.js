import React, { useState, useEffect } from 'react'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from  'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'

const LoginScreen = ({ history, location }) => {
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
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
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
            {success && <Message variant='success'>Profile Updated</Message>}
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
          </Col>
        </Row>

        
    )
}

export default LoginScreen
