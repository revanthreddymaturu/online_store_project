import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Image, ListGroup, Row,ListGroupItem,Button,Card} from 'react-bootstrap'
import { Link, useParams,useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { updateItemQty,deleteItem } from '../utils/cartSlice';
import { useDispatch } from 'react-redux'


function CartScreen() {
  
  const cartItems=useSelector((store)=>store.cart.cartItems)
  const totalCartItems=useSelector((store)=>store.cart.totalItems)

  const dispatch=useDispatch();
  const removeFromCartHandler=(id,qty)=>{
    const payload={
      'id':id,
      'qty':qty,
    }
    dispatch(deleteItem(payload))
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length===0?(
          <h3 >
            Your cart is empty <Link to='/'>Go Back</Link>
          </h3>
        ):(
          <ListGroup variant='flush'>
            {cartItems.map(item=>{
              return(
               <div>
              <ListGroupItem key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt="Product Image" fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>

                  <Col md={2}>
                  <Form.Control as="select" value={item.qty} onChange={(e)=>{
                      
                      const payload={
                        'id':item.id,
                        'qty':e.target.value,
                      }
                      return dispatch(updateItemQty(payload));
                    
                  }}>
                        {
                            [...Array(item.countInStock).keys()].map((x)=><option key={x+1} value={x+1}>{x+1}</option>)
                        }
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.id,item.qty)} ><i className='fas fa-trash'></i></Button>

                  </Col>
                
                </Row>
                
              </ListGroupItem>

               </div> 
              

              )
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Subtotal ({totalCartItems})</h2>
              ${cartItems.reduce((acc,item)=>acc+parseInt(item.qty)*item.price,0).toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button type='button' className='btn-block' disabled={cartItems.length==0}>Proceed to Checkout</Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    
  )
}

export default CartScreen
