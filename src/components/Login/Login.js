import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import Axios from 'axios';
import { connect } from 'react-redux'
import { clientLoggedIn, isAdmin } from '../../ducks/reducer'
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
        Axios.post('/auth/login', this.state).then(res => {
            let client = res.data
            this.props.clientLoggedIn(client)
            if(client.email === 'maria@gmail.com'){
                this.props.isAdmin()
            }
            console.log('Logged In')
        })
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

export default connect(mapStateToProps, { clientLoggedIn, isAdmin })(Login)