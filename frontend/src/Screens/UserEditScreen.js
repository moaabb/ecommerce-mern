import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUser} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from  'react-redux'
import FormContainer from '../components/FormContainer'
import {  Form, Button } from 'react-bootstrap'
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ history, match }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

   
    const dispatch = useDispatch()
    const userID = match.params.id

    const userUpdate = useSelector(state => state.userUpdate)
    const { success: successUpdate } = userUpdate

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if (successUpdate) {
            alert('User succesfully updated')
            history.push('/admin/userlist')
            dispatch({ type: USER_UPDATE_RESET })
            dispatch({ type: USER_DETAILS_RESET })
        } else {
            if (!user.name || user._id !== userID ) {
                dispatch(getUserDetails(userID))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [userID, user, successUpdate, history, dispatch])
    
    const submitHandler =  (e) => {
        e.preventDefault()
        if (window.confirm("Are you sure?")) {
            dispatch(updateUser({id: userID, name, email, isAdmin}))   
        }
    }

    return (

        <>
            <Link to='/admin/userlist' className='btn btn-dark my-3'>
                Go Back
            </Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <FormContainer>
                    <h1>Edit User</h1>
                    
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter your name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                    
                        <Form.Group controlId='email'>
                            <Form.Label>Email Adress</Form.Label>
                            <Form.Control type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Label>Is Admin</Form.Label>
                            <Form.Check type='checkbox' label='is Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen
