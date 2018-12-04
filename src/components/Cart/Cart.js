import React, { Component } from 'react' 
import axios from 'axios' 
import { connect } from 'react-redux' 
import { getCart, updateTotal } from '../../ducks/reducer'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import './Cart.css'

class Cart extends Component {

    componentDidMount(){
        axios.get('/api/cart').then(res => {
            this.props.getCart(res.data)
        })
    }

    updateTotal = (total) => {
        this.props.updateTotal(total)
    }

    render(){
        let cartTotal = 0
        let cart = this.props.cart.map(item => {
            console.log(item)
            cartTotal += item.price * item.quantity
            return (
                <div>
                    <CartItem
                    cartItem={item}
                    />
                </div>
            )
        })
        return(
            <div className='everythingElse'>

                <div className='cart'>
                    {cart}                
                </div><br/><br/>
                
                <p style={{fontSize: '24px'}}>Total: ${Math.floor(cartTotal * 100) / 100}</p><br/>

                <Link to='/checkout'>
                    <button style={{height: '50px', fontSize: '24px'}} className='w3-button w3-black w3-hover-pale-red' onClick={() => {this.updateTotal(Math.floor(cartTotal * 100) / 100)}}>
                        Checkout
                    </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    let { cart } = state
    return {
        cart
    }
}

export default connect(mapStateToProps, { getCart, updateTotal })(Cart)