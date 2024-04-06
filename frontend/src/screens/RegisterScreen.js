import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { fetchUser, registerUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
function RegisterScreen() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [firstname,setFirstName]=useState('')
    const [lastname,setLastName]=useState('')
    const [repassword,setRePassword]=useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {error,loading,user}=useSelector(store=>store.user)
    const [passmismatch,setPassMisMatch]=useState('')
    const submitHandler = (e) => {
        e.preventDefault()

        if(password===repassword){
            const payload={
                'first_name':firstname,
                'last_name':lastname,
                'email':email,
                'password':password,  
            }
            dispatch(registerUser(payload))
        }
        else{
            setPassMisMatch('Passwords didn\'t match. Re-enter password')
        }
        
    }
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user])
    

  return (
    <FormContainer>
    {passmismatch && <Message errMessage={passmismatch}></Message>}
    {error && <Message errMessage={error}></Message>}
    {loading?<Loader/>:
    (<>
    <h1>Sign up</h1>
    <Form onSubmit={submitHandler}>

            <Form.Group className='mt-4' controlId='firstname'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter First Name'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className='mt-4' controlId='lastname'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Last Name'
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='mt-4'  controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
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
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='mt-4' controlId='repassword'>
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Re-enter Password'
                    value={repassword}
                    onChange={(e) => setRePassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>



            <Button className='mt-3' type='submit' variant='primary'>
                Sign up
            </Button>
    </Form>
    </>)}

  
</FormContainer>
  )
}

export default RegisterScreen
