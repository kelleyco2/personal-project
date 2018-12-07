import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import { connect } from 'react-redux' 
import './MobileNav.css'


class MobileNav extends Component {
    render(){
        return (
            <div id='sidenav' className='mobileNav'>
                <p className='x' onClick={this.props.mobileNav}>
                    X
                </p>
                    <Link to='/products' className='sidenavLinks'>Products</Link>
                    {
                        this.props.isAuthenticated ?
                        <Link to='/login' onClick={this.logout} className='sidenavLinks'>Logout</Link>
                        :
                        <Link to='/login' className='sidenavLinks'>Login</Link>
                    }
                    {
                        this.props.isAdmin ?
                        <Link to='/orders' className='sidenavLinks'>Orders</Link>
                        :
                        <Link to='cart' className='sidenavLinks'>
                           <i class="fas fa-shopping-cart"></i> {this.props.cart.length}
                        </Link>
                    }
                </div>
        )
    }
}

function mapStateToProps(state){
    let { isAuthenticated, isAdmin, cart} = state
    return {
        isAdmin,
        isAuthenticated,
        cart
    }
}

export default connect(mapStateToProps)(MobileNav)
