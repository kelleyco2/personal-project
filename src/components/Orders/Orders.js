import React, { Component } from 'react' 
import axios from 'axios' 
import { connect } from 'react-redux' 
import { getOrders } from '../../ducks/reducer'
import './Orders.css' 

class Orders extends Component {

    constructor(){
        super()

        this.state = {
            checked: false,
            dates: []
        }
    }


    componentDidMount(){
        axios.get('/api/orders').then(res => {
            let dates = []
            res.data.forEach((o, i) => {
                let date = o.date ? o.date.split('T')[0] : ''
                let index = dates.indexOf(date)
                if(index === -1){
                    dates.push(date)
                } 
                let status = o.status ? o.status : 'No Status'
                this.setState({[`status${o.id}`]: status})
            })
            this.props.getOrders(res.data)
            this.setState({
                dates
            })
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
                            {p.title} x {p.quantity}
                        </p><br/>
                    </div>
                )
            })
            return (
                <div key={i} className='orders'>

                    <p style={{marginLeft: 'auto'}}>
                        Status: {this.state[`status${order.id}`]}
                    </p>

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


                        <select className='w3-select' onChange={(e) => {
                            const {value} = e.target
                            axios.post(`/api/orders/${order.id}`, {status: value}).then(res => {
                                this.setState({[`status${order.id}`]: value})
                            })
                        }}>
                            <option value='' disabled selected>Choose Order Status</option>
                            <option value='Pending'>Pending</option>
                            <option value='Shipped'>Shipped</option>
                            <option value='Picked Up'>Picked Up</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                </div>
            )
        })

        // let dateSelection = this.state.dates.map(date => {
        //     console.log(date)
        //     return (
        //                 <option value='' disabled selected>Select Date</option>
        //                 <option value={date}>{date}</option>

        //     )
        // })


        return (
            <div>
                <select className='w3-input' style={{width: '80vw', margin: 'auto', marginTop: '40px'}} onChange={(e) => {
                    const { value } = e.target
                    if(value === 'All'){
                        axios.get('/api/orders').then(res => {
                            this.props.getOrders(res.data)
                        })
                    } else {
                        axios.post('/api/orders', {date: value}).then(res => {
                            this.props.getOrders(res.data)
                        })
                    }
                }}>
                    <option value='' disable selected>Filter By Date</option>
                    <option value='All'>All Orders</option>
                    {
                        this.state.dates.map(date => {
                            return (
                                <option value={date}>{date}</option> 
                            )
                        })
                    }
                </select>
                <div className='orderContainer'>
                    {orders}
                </div>
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
