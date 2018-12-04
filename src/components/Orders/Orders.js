import React, { Component } from 'react' 
import axios from 'axios' 
import { connect } from 'react-redux' 
import { getOrders } from '../../ducks/reducer'
import './Orders.css' 

class Orders extends Component {

    constructor(){
        super()

        this.state = {
            checked: false
        }
    }

    componentDidMount(){
        axios.get('/api/orders').then(res => {
            this.props.getOrders(res.data)
        })
    }

    handleClick = (e) => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render(){
        let reducedOrders = this.props.orders.reduce((a, v) => {
            let index = a.findIndex(p => p.id === v.id)
            if(index === -1) {
                let order = {
                    id: v.id,
                    name: v.name, 
                    total: v.total,
                    products: [
                        {
                            title: v.title,
                            quantity: v.quantity
                    }
                ]
                }
                a.push(order)
            } else {
                let product = {
                    title: v.title, 
                    quantity: v.quantity
                }
                a[index].products.push(product)
            }
            return a
        
        }, [])

        let orders = reducedOrders.map((order, i) => {
            let products = order.products.map((p, i) => {
                return (
                    <div key={i}>
                        <p>
                            Product: {p.title}
                        </p><br/>
                        <p>
                            Quantity: {p.quantity}
                        </p><br/>
                    </div>
                )
            })
            return (
                <div key={i} className='orders'>
                    <p>
                        Order ID: {order.id}
                    </p><br/>

                    <p>
                        Client: {order.name}
                    </p><br/>

                    {products}<br/>

                    <p>
                        Total: ${order.total}
                    </p>
                    
                    <div style={{marginLeft: 'auto'}}>        
                        <input type='checkBox' onClick={this.handleClick}/> Completed
                    </div>
                </div>
            )
        })

        return (
            <div>
                {orders}
            </div>
        )
    }
}

function mapStateToProps(state){
    let { orders } = state
    return {
        orders
    }
}

export default connect(mapStateToProps, { getOrders })(Orders)
