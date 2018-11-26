import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import axios from 'axios' 
import { connect } from 'react-redux' 
import { clientLoggedOut } from '../../ducks/reducer'


class Header extends Component {

    logout = () => {
        axios.get('/auth/logout').then(res => {
            this.props.clientLoggedOut()
            console.log('Logged Out')
        })
    }

    render(){
        return (
            <header>
                <Link to='/' className='link home'>Home</Link>
                <Link to='/lashcare' className='link'>Lash Care</Link>
                <Link to='/products' className='link'>Products</Link>
                <Link to='/login' className='link'>Login</Link>
                <button className='bookNow'>Book Now!</button>
                <Link to='/login' className='link' onClick={this.logout}>Logout</Link>
                {/* <button className='bookNow' onClick={this.logout}>
                    Log Out
                </button> */}
                <i className="fa fa-bars" aria-hidden="true"></i>
            </header>
        )
    }
}

function mapStateToProps(state){
    let { isAuthenticated } = state
    return{
        isAuthenticated
    }
}

export default connect(mapStateToProps, { clientLoggedOut })(Header)