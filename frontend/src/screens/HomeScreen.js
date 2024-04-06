import React, { useEffect, useId, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../utils/productsSlice'
import appStore from '../utils/appStore'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
  const dispatch=useDispatch();
  const products=useSelector((store)=>store.products.products);
  const loading=useSelector((store)=>store.products.loading);
  const error=useSelector((store)=>store.products.error);
  const user=useSelector((store)=>store.user.user)
  const userName=user?user.name:'Guest'
  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch])

  return (
    <div>
        <h1>Latest Products</h1>
        {loading?<Loader/>:error?<Message errMessage={error}/>:
        <Row>
        {products.map((product)=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
            
        ))}
      </Row>
        }
      
    </div>
  )
}

export default HomeScreen
