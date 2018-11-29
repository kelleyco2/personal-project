import React, { Component } from 'react' 
import axios from 'axios' 
import { connect } from 'react-redux' 
import { getCart } from '../../ducks/reducer' 
import './CartItem.css'

class CartItem extends Component {

    updateQuantity = (update) => {
        let { product_id: id, quantity } = this.props.cartItem
        if(update === 'up'){
            quantity++
        } else if(update === 'down'){
            quantity--
        }
        axios.put(`/api/cart/${id}`, {quantity}).then(res => {
            this.props.getCart(res.data)
        }).catch(err => {
            console.log('error updating quantity', err)
        })
    }

    remove = (id) => {
        axios.delete(`/api/cart/${id}`).then(res => {
            this.props.getCart(res.data)
        })
    }

    render(){
        let { product_id: id, title, price, quantity, img } = this.props.cartItem
        return (
            <div className='cartItem' key={id}>


                    <img src={img} alt='' height='250px' width='250px'/><br/>

                    <h3>{title}</h3><br/>

                    <p>Quantity: {quantity}</p><br/>

                    <div>
                        <button onClick={() => this.updateQuantity('down')}>
                            -
                        </button>

                        <button onClick={() => this.updateQuantity('up')}>
                            +
                        </button>
                    </div><br/>

                    <button onClick={() => this.remove(id)}>
                        Remove
                    </button><br/>

                    <p>${Math.floor(quantity * price * 100) / 100}</p>
                    

            </div>
        )
    }
}

export default connect(null, { getCart })(CartItem)