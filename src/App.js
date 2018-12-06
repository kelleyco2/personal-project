import React, { Component } from 'react';
import './components/reset.css';
import './App.css'
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux' 
import {Elements, StripeProvider} from 'react-stripe-elements';


import Header from './components/Header/Header'
import Home from './components/Home/Home'
import AppointmentInfo from './components/AppointmentInfo/AppointmentInfo'
import ProductsContainer from './components/Products/ProductsContainer'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import CheckoutForm from './components/Checkout/CheckoutForm'
import Orders from './components/Orders/Orders'
import Footer from './components/Footer/Footer'
import MobileNav from './components/MobileNav/MobileNav'

import { clientLoggedIn, isAdmin, getCart } from './ducks/reducer'


class App extends Component {
  constructor(){
    super()

    this.state = {
      mobileNav: false
    }
  }

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

  mobileNav = () => {
    this.setState({
      mobileNav: !this.state.mobileNav
    })
  }


  render() {
    return (
    <StripeProvider apiKey="pk_test_20rim5Rs9tOcoUv23igpp9nk">
      <div className='app'>
        {
          this.state.mobileNav ?
          <MobileNav
          mobileNav={this.mobileNav}
          />
          :
          null
        }
        <div>
          <Header
          mobileNav={this.mobileNav}
          />
        </div>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/information' component={AppointmentInfo}/>
            <Route path='/products' component={ProductsContainer}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/orders' component={Orders}/>
            <Elements>
              <Route path='/checkout' component={CheckoutForm}/>
            </Elements>
          </Switch>
        </div>
          <Footer/>
      </div>
    </StripeProvider>
    );
  }
}

export default withRouter(connect(null, { clientLoggedIn, isAdmin, getCart })(App));
