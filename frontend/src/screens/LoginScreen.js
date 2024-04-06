import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { fetchUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

function LoginScreen() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {error,loading,user}=useSelector(store=>store.user)
    
    const submitHandler = (e) => {
        e.preventDefault()
        const payload={
            'username':email,
            'password':password
        }
        dispatch(fetchUser(payload))
    }
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user])
  return (
    

        <FormContainer>
            {error && <Message errMessage={error}></Message>}
            {loading?<Loader/>:
            (<>
            <h1>Sign in</h1>
            <Form onSubmit={submitHandler}>
                    <Form.Group  controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
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

                    <Button className='mt-3' type='submit' variant='primary'>
                        Sign In
                    </Button>
            </Form>
            </>)}

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={'/register'}>
                        Register
                        </Link>
                </Col>
            </Row>
        </FormContainer>
  )
}

export default LoginScreen
