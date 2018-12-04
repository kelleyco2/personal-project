import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Axios from 'axios';
import { connect } from 'react-redux' 
import { updateTotal, getCart } from '../../ducks/reducer'
// import { Redirect } from 'react-router-dom'
import './CheckoutForm.css'


class CheckoutForm extends Component {
  constructor() {
    super();

    this.state = {
      complete: false
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    this.calculateTotal()
  }

  componentDidUpdate(prevProps){
    if(prevProps.cart.length !== this.props.cart.length){
      this.calculateTotal()
    }
  }

  calculateTotal(){
    let total = this.props.cart.reduce((acc, elem) => {
      return acc + (+elem.price * +elem.quantity)
    }, 0)
    this.props.updateTotal(total)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});

    let response = await Axios.post('/charge', {headers:{'Content-Type': 'text/plain'}, data:{token: token.id}, amount: this.props.total * 100})

    console.log(response)
    console.log('Payment Success!')

    if (response.status === 200) {
      
      this.setState({
        complete: true
      })

      // Axios.delete('/api/cart/checkout').then(res => {
      //   this.props.getCart(res.data)
      // })
      console.log('total', this.props.total)

      await Axios.post(`/api/order?total=${this.props.total}`)

      Axios.get('/api/cart').then(res => {
        this.props.getCart(res.data)
      })

    }

  }

  render() {

    // if(this.props.cart.length === 0){
    //   return (
    //     <Redirect to='/products'/>
    //   )
    // }
    
    return !this.state.complete ? 

        <div className="checkout">
          <h1>Total: ${this.props.total}</h1>
          {/* <p>Would you like to complete the purchase?</p> */}
          <CardElement/>
          <button className='w3-btn w3-black' onClick={this.submit}>Pay</button>
        </div>:
        <div>
          <h1>Payment Successful!</h1> 
          {/* <Redirect to='/'/> */}
        </div>
        
  }
}

function mapStateToProps(state){
  let { total, cart } = state
  return {
    total,
    cart
  }
}

export default connect(mapStateToProps, { updateTotal, getCart })(injectStripe(CheckoutForm));