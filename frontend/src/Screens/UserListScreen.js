import React, { useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import { Button, Table } from 'react-bootstrap'
import { getUserList } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList 

    useEffect(() => {
        dispatch(getUserList())   

    }, [dispatch])
    
    const deleteHandler = () => {
        console.log('deleted')
    }

    return (
        <>
            <h1>Users</h1>   
            {loading ? <Loader/> : error ? <Message variant='danger' /> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}/> ) : (<i className='fas fa-times' style={{color: 'red'}}/>)}</td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i class="fas fa-trash-alt fa-2x"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen
