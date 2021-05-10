import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from  'react-redux'
import FormContainer from '../components/FormContainer'
import { Row, Col, Form, Button } from 'react-bootstrap'

const UserEditScreen = ({ history, location }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

   
    const dispatch = useDispatch()


    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }

    }, [userInfo, history, redirect])
    
    
    const submitHandler =  (e) => {
        e.preventDefault()


    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Is Admin</Form.Label>
                    <Form.Check type='checkbox' label='is Admin' onChange={e => setIsAdmin(e.target.check)}></Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign Up
                </Button>
            </Form>

        </FormContainer>

        
    )
}

export default UserEditScreen
