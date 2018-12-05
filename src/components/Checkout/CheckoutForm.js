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

    let orderSummary = this.props.cart.map((item, i) => {
      return (
        <div key={i}>

          <ul className='w3-ul w3-border-bottom'>
            <li className='w3-bar'>
              <span className='w3-bar-item w3-right'>
                ${item.price}
              </span>
              <span className='w3-bar-item'>
                {item.title} x {item.quantity}
              </span>
            </li>
          </ul>

        </div>
      )
    })
    
    return !this.state.complete ? 
        <div className='checkoutContainer'>
          <div className="checkout">

            <h1>Total: ${this.props.total}</h1>

            <CardElement/>

            <input placeholder='Address 1' className='w3-input'/>
            <input placeholder='Address 2' className='w3-input'/>
            <input placeholder='City' className='w3-input'/>
            <input placeholder='State' className='w3-input'/>

            <button className='w3-button w3-black w3-hover-pale-red' style={{
              height: '40px',
              fontSize: '24px'
            }}onClick={this.submit}>Pay</button>


          </div>
            <div className='orderSummary'>
              {orderSummary}
            </div>
        </div>
        :
        <div className='success'>

          <div className='w3-card' style={{width: '80vw', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', padding: '250px'}}>
            <h1>Payment Successful!</h1>

            <p>
              An email with your order summary will be sent right away.
            </p>
            
          </div>
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