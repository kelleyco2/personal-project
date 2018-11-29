import React, { Component } from 'react';
import './components/reset.css';
import './App.css'
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux' 
import {Elements, StripeProvider} from 'react-stripe-elements';


import Header from './components/Header/Header'
import Home from './components/Home/Home'
import LashCare from './components/LashCare/LashCare'
import ProductsContainer from './components/Products/ProductsContainer'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import CheckoutForm from './components/Checkout/CheckoutForm'

import { clientLoggedIn, isAdmin, getCart } from './ducks/reducer'


class App extends Component {

  componentDidMount(){
    axios.get('/auth/currentClient').then(res => {
      if(res.data.email) {
        this.props.clientLoggedIn(res.data)
        axios.get('/api/cart').then(res => {
          this.props.getCart(res.data)
        })
      }
      if (res.data.email === 'maria@gmail.com'){
        this.props.isAdmin()
      }
    })
  }

  render() {
    return (
    <StripeProvider apiKey="pk_test_20rim5Rs9tOcoUv23igpp9nk">
      <div>
        <div>
          <Header/>
        </div>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/lashcare' component={LashCare}/>
            <Route path='/products' component={ProductsContainer}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/cart' component={Cart}/>
            <Elements>
              <Route path='/checkout' component={CheckoutForm}/>
            </Elements>
          </Switch>
        </div>
      </div>
    </StripeProvider>
    );
  }
}

export default withRouter(connect(null, { clientLoggedIn, isAdmin, getCart })(App));
