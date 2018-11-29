import React, { Component } from 'react' 
import axios from 'axios' 
import { connect } from 'react-redux' 
import { getCart, updateTotal } from '../../ducks/reducer'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

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
            <div>

                <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    {cart}                
                </div><br/><br/><br/><br/>

                <p>Total ${Math.floor(cartTotal * 100) / 100}</p>

                <Link to='/checkout'>
                    <button onClick={() => {this.updateTotal(Math.floor(cartTotal * 100) / 100)}}>
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