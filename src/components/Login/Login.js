import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import axios from 'axios';
import { connect } from 'react-redux'
import { clientLoggedIn, isAdmin, getCart } from '../../ducks/reducer'
import { Redirect } from 'react-router-dom'

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
            <div>

                <h1>Login</h1>

                <input 
                placeholder='Email' 
                onChange={(e) => this.handleChange(e.target.value, 'email')} 
                value={this.state.email}
                />

                <input 
                placeholder='Password' 
                onChange={(e) => this.handleChange(e.target.value, 'password')} 
                value={this.state.password}
                onKeyPress={this.handleKeyPress}
                /><br/>

                <button onClick={this.handleClick}>Login</button>

                <button>
                    <Link to='/register'>Register</Link>
                </button>

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