import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

class Home extends Component {
    render(){
        return (
            <div>
                <div className='logo'>
                    <Link to='/' className='logoLink'>
                        <p>Maria Kelley Lashes</p>
                    </Link>
                </div>
                <div className='heroImage'>

                    <Link to='/products'>
                        <button style={{
                            fontSize: '32px'
                        }}
                        className='w3-btn w3-black'
                        >
                            SHOP NOW
                        </button>
                    </Link>

                </div>

            </div>
        )
    }
}

export default Home