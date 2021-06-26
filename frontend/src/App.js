import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen'
import {BrowserRouter as Router, Route } from 'react-router-dom' 
import ProductScreen from './Screens/ProductScreen'
import ProfileScreen from './Screens/ProfileScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserListScreen from './Screens/UserListScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import UserEditScreen from './Screens/UserEditScreen'
import OrderListScreen from './Screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/placeorder' component={PlaceOrderScreen} exact />
          <Route path='/order/:id?' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/page/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/product/:id?/edit' component={ProductEditScreen} exact />
          <Route path='/admin/user/:id?/edit' component={UserEditScreen} />
          <Route exact path='/search/:keyword' component={HomeScreen} />
          <Route exact path='/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/product/:id?' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route exact path='/login' component={LoginScreen}/>
          <Route exact path='/register' component={RegisterScreen}/>
        </Container>
      </main>
      <Footer/> 
      
    </Router>
  )
}

export default App
