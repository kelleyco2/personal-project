import React, { Component } from 'react';
import './components/reset.css';
import './App.css'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import LashCare from './components/LashCare/LashCare'
import ProductsContainer from './components/Products/ProductsContainer'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

class App extends Component {
  render() {
    return (
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
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
