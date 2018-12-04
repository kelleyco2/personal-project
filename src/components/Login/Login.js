import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import axios from 'axios';
import { connect } from 'react-redux'
import { clientLoggedIn, isAdmin, getCart } from '../../ducks/reducer'
import { Redirect } from 'react-router-dom'

import './Login.css'

class Login extends Component {
    constructor(){
        super()

        this.state={
            email: '',
            password: ''
        }
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val
        this.setState(obj)
    }

    handleClick = () => {
        axios.post('/auth/login', this.state).then(res => {
            let client = res.data
            this.props.clientLoggedIn(client)
            axios.get('/api/cart').then(res => {
                this.props.getCart(res.data)
              })
            if(client.email === 'maria@gmail.com'){
                this.props.isAdmin()
            }
        })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleClick()
        }
    }
    render(){
        return this.props.isAuthenticated ?
            <Redirect to='/'/>:
            <div className='loginContainer'>

                <div className='login'>
                    <h1 style={{fontSize: '32px'}}>Login</h1><br/>

                    <input 
                    className='w3-input'
                    placeholder='Email' 
                    onChange={(e) => this.handleChange(e.target.value, 'email')} 
                    value={this.state.email}
                    /><br/>

                    <input 
                    className='w3-input'
                    type='password'
                    placeholder='Password' 
                    onChange={(e) => this.handleChange(e.target.value, 'password')} 
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}
                    /><br/>

                    <button 
                    className='w3-button w3-black w3-hover-pale-red w3-block'
                    onClick={this.handleClick}
                    >
                    Login
                    </button>
                </div>

                <div className='register'>
                    <h1 style={{fontSize: '32px'}}>Create An Account</h1>
                    <p>
                        Create an account to take adavantage of the features and benefits that make shopping faster and easier.
                    </p><br/>
                    <button className='w3-button w3-black w3-hover-pale-red'>
                        <Link to='/register' style={{ textDecoration: 'none' }}>Register</Link>
                    </button>
                </div>

            </div>
    }
}

function mapStateToProps(state){
    let { isAuthenticated, isAdmin } = state
    return {
        isAuthenticated,
        isAdmin
    }
}

export default connect(mapStateToProps, { clientLoggedIn, isAdmin, getCart })(Login)