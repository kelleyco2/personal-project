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
                        <button className='w3-button w3-black w3-hover-pale-red' style={{marginRight: '8px'}} onClick={() => this.updateQuantity('down')}>
                            -
                        </button>

                        <button className='w3-button w3-black w3-hover-pale-red' onClick={() => this.updateQuantity('up')}>
                            +
                        </button>
                    </div><br/>

                    <button className='w3-button w3-black w3-hover-pale-red' onClick={() => this.remove(id)}>
                        Remove
                    </button><br/>

                    <p style={{fontSize: '24px'}}>${Math.floor(quantity * price * 100) / 100}</p>
                    

            </div>
        )
    }
}

export default connect(null, { getCart })(CartItem)