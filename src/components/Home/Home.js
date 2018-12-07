import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppointmentInfo from '../AppointmentInfo/AppointmentInfo'
import { connect } from 'react-redux' 
import { clientLoggedOut, resetCart} from '../../ducks/reducer'

import './Home.css'
import Axios from 'axios';

class Home extends Component {

    logout = () => {
        Axios.get('/auth/logout').then(res => {
            this.props.clientLoggedOut()
        })
        this.props.resetCart()
    }


    render(){
        return (
            <div id='home' className='home'>

                <div className='logo'>
                    <Link to='/' className='logoLink'>
                        <p>Maria Kelley Lashes</p>
                    </Link>
                </div>

                <div className='heroImage'>

                    <div className='heroImageStuff'>
                        <h1>Aftercare</h1>

                        <p>Products now available</p>

                        <Link to='/products'>
                            <button style={{
                                fontSize: '20px'
                            }}
                            className='w3-btn w3-black w3-hide-small'
                            >
                                SHOP NOW
                            </button>
                        </Link>
                    </div>


                </div>

                <div className='info'>
                    <AppointmentInfo/>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    let { isAdmin, isAuthenticated, cart} = state
    return {
        isAdmin,
        isAuthenticated,
        cart
    }
}

export default connect(mapStateToProps, { clientLoggedOut, resetCart })(Home)