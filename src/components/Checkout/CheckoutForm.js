import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Axios from 'axios';
import { connect } from 'react-redux' 
import { updateTotal, getCart } from '../../ducks/reducer'

class CheckoutForm extends Component {
  constructor() {
    super();

    this.state = {
      complete: false,
      total: 0
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    
  }

  calculateTotal

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token)
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });

    let response = await Axios.post('/charge', {headers:{'Content-Type': 'text/plain'}, data:{token: token.id}, amount: 2000})

    console.log(response)
    console.log('Payment Success!')

    if (response.status === 200) {
      this.setState({
        complete: true
      })
    }
  }

  render() {

    
    return !this.state.complete ? 

        <div className="checkout">
          <h1>Total: ${this.state.total}</h1>
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Send</button>
        </div>:

        <h1>Payment Successful!</h1> 
        
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