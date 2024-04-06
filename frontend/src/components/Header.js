import React from 'react'
import '../bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import {  useSelector,useDispatch } from 'react-redux';
import { logoutUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const totalItems=useSelector((store)=>store.cart.totalItems)
  const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const logoutHandler = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

  return (
    <header >
    <Navbar expand="lg" className="bg-body-tertiary" collapseOnSelect>
    <Container>
        <LinkContainer to='/'>
        <Navbar.Brand >SellShop</Navbar.Brand>

        </LinkContainer>
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
    <LinkContainer to='/cart'>
    <Nav.Link ><i className="fas fa-shopping-cart"></i>{`Cart - ${totalItems} items`}</Nav.Link>

    </LinkContainer>

   
    {user ? (
                                <NavDropdown title={user.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}  
  </Nav>
  </Navbar.Collapse>
    </Container>
    

    </Navbar>
    </header>
    
  )
}

export default Header
