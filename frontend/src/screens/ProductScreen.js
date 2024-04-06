import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row, } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

import { Link, useParams,useNavigate } from 'react-router-dom'

import Rating from '../components/Rating'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProduct} from '../utils/productSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addItem } from '../utils/cartSlice';
function ProductScreen() {
  
    const navigate=useNavigate();
    const {id}=useParams();
    const dispatch=useDispatch();
    const product=useSelector((store)=>store.product.product);
    const loading=useSelector((store)=>store.product.loading);
    const error=useSelector((store)=>store.product.error);
    const [qty,setQty]=useState(1);
    const addToCartHandler=()=>{
        const totalProdPrice=parseInt(product.price)*(qty);
        const payload={
            'id':product._id,
            'name':product.name,
            'qty':qty,
            'price':product.price,
            'totalPrice':(totalProdPrice),
            'image':product.image,
            'countInStock':product.countInStock
        }
        dispatch(addItem(payload))
    }
  useEffect(()=>{
    console.log('!!!inside useEffect')
    dispatch(fetchProduct(id));
},[dispatch,id])
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading?<Loader/>:error?<Message errMessage={error}/>:
      <Row>
      <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={3}>
          <ListGroup variant='flush'>
              <ListGroupItem>
                  {product.name}
              </ListGroupItem>
              <ListGroupItem>
              <Rating value={product.rating} no_of_reviews={`${product.numReviews} reviews`} color="#f8e825" />
              </ListGroupItem>
              <ListGroupItem>
                  Price: ${product.price}
              </ListGroupItem>
              <ListGroupItem>
                  Description: {product.description}
              </ListGroupItem>
          </ListGroup>
      </Col>
      <Col md={3}>
          <ListGroup variant='flush'>
              <ListGroupItem>
                  <Row>
                      <Col>Price:</Col>
                      <Col>
                          <strong>${product.price}</strong>
                      </Col>
                  </Row>
              </ListGroupItem>
              <ListGroupItem>
                  <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock>0?"In Stock":"Out of Stock"}</Col>
                  </Row>
              </ListGroupItem>
              {product.countInStock>0 && (
              <ListGroupItem>
                <Row>
                    <Col>Quantity:</Col>
                    <Col xs="auto" >
                    <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {
                            [...Array(product.countInStock).keys()].map((x)=><option key={x+1} value={x+1}>{x+1}</option>)
                        }
                    </Form.Control>

                    </Col>
                </Row>
              </ListGroupItem>)
              }
              <ListGroupItem>
                  <Button className='btn-block' onClick={addToCartHandler} disabled={product.countInStock==0} type='button'>Add to Cart</Button>
              </ListGroupItem>
              
          </ListGroup>
      </Col>
    </Row>
      }
      
    </div>
  )
}

export default ProductScreen
