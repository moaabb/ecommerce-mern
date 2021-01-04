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

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/product/:id' component={ProductScreen}/>
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
