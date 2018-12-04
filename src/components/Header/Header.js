import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import axios from 'axios' 
import { connect } from 'react-redux' 
import { clientLoggedOut, resetCart, getCart } from '../../ducks/reducer'


class Header extends Component {

    logout = () => {
        axios.get('/auth/logout').then(res => {
            this.props.clientLoggedOut()
        })
        this.props.resetCart()
    }

    render(){
        return (
            <header>
                <Link to='/' className='link home'>Home</Link>
                <Link to='/lashcare' className='link'>Lash Care</Link>
                <Link to='/products' className='link'>Products</Link>
                <div>
                    {this.props.isAuthenticated ? 
                        <Link to='/login' className='link' onClick={this.logout}>Logout</Link> :
                        <Link to='/login' className='link'>Login</Link>
                    }
                </div>

                    {this.props.isAdmin ?
                        <Link to='/orders' className='link'>Orders</Link> 
                        :
                        <Link to='/cart' className='link'>
                            <i class="fas fa-shopping-cart"></i> {this.props.cart.length}
                        </Link>
                    }



                {/* <button className='bookNow'>Book Now!</button> */}
                <i className="fa fa-bars" aria-hidden="true"></i>
            </header>
        )
    }
}

function mapStateToProps(state){
    let { isAuthenticated, client, cart, isAdmin } = state
    return{
        isAuthenticated,
        client,
        cart,
        isAdmin
    }
}

export default connect(mapStateToProps, { clientLoggedOut, resetCart, getCart })(Header)