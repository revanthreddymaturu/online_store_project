import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateUser } from '../utils/userSlice'

const ProfileScreen = () => {
    const userDetails = useSelector(store => store.user)
    const { error, loading, user } = userDetails

    const [firstname, setFirstName] = useState(user.first_name)
    const [lastname, setLastName] = useState(user.last_name)
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const errMessage='Enter new values to update'
    const submitHandler=(e)=>{
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        }
        else{
            const payload={
                'first_name':firstname,
                'last_name':lastname,
                'password':password,  
                }
                dispatch(updateUser(payload))
    
            }
        }
        

  return (
            <Row>
            <Col md={3}>
                <h2>Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group className='mt-4' controlId='firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            
                            type='name'
                            placeholder='Enter First name'
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mt-4' controlId='lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            
                            type='name'
                            placeholder='Enter Last name'
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mt-4' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            disabled
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-4' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-4' controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='mt-4' type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            </Col>
            </Row>
  )
}

export default ProfileScreen
