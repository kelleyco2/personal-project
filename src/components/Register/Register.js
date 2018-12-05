import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { clientLoggedIn } from '../../ducks/reducer'
import { Redirect } from 'react-router-dom'
import './Register.css'

class Register extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
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
        }).catch(err => {
            this.setState({
                error: 'An account already exists with that email'
            })
        })
    }


    render(){
        return this.props.isAuthenticated ?
            <Redirect to='/'/> :
            <div className='registerContainer'>
                <div className='registering'>
                    <h1 style={{fontSize: '32px'}}>Register</h1>

                    <input 
                    className='w3-input '
                    placeholder='Name'
                    onChange={(e) => this.handleChange(e.target.value, 'name')}
                    value={this.state.name}/>

                    <input 
                    className='w3-input'
                    placeholder='Email'
                    onChange={(e) => this.handleChange(e.target.value, 'email')}
                    value={this.state.email}
                    />

                    <input 
                    className='w3-input'
                    type='password'
                    placeholder='Password'
                    onChange={(e) => this.handleChange(e.target.value, 'password')}
                    value={this.state.password}
                    />

                    <button onClick={this.handleClick} className='w3-button w3-black w3-hover-pale-red'>
                        Register
                    </button>

                    <p>{this.state.error}</p>
                </div>
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