import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { clientLoggedIn } from '../../ducks/reducer'
import { Redirect } from 'react-router-dom'

class Register extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
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
        Axios.post('/auth/register', this.state).then(res => {
            let client = res.data
            this.props.clientLoggedIn(client)
            console.log('Registered')
        })
    }


    render(){
        return this.props.isAuthenticated ?
            <Redirect to='/'/> :
            <div>
                <h1>Register</h1>

                <input 
                placeholder='Name'
                onChange={(e) => this.handleChange(e.target.value, 'name')}
                value={this.state.name}/>

                <input 
                placeholder='Email'
                onChange={(e) => this.handleChange(e.target.value, 'email')}
                value={this.state.email}
                />

                <input 
                placeholder='Password'
                onChange={(e) => this.handleChange(e.target.value, 'password')}
                value={this.state.password}
                />

                <button onClick={this.handleClick}>Register</button>
            </div>
    }
}

function mapStateToProps(state){
     let { isAuthenticated } = state
     return {
         isAuthenticated
     }
}

export default connect(mapStateToProps, { clientLoggedIn })(Register)