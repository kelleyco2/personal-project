import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setProducts } from '../../ducks/reducer'
import { getCart } from '../../ducks/reducer'
import './Products.css'
import { Link } from 'react-router-dom' 

class Products extends Component {
    constructor(props){
        super(props)

        this.state = {
            update: false,
            img: props.product.img,
            title: props.product.title,
            description: props.product.description,
            price: props.product.price,
            updateClass: 'adminProductBoxUpdateFalse',
            accordion: 'w3-hide w3-container',
            productBox: 'productBoxSmall',
            show: 'w3-show'
        }
    }

    componentDidMount(){
        axios.get('/api/cart').then(res => {
            this.props.getCart(res.data)
        })
    }

    update = () => {
        this.setState({
            update: true,
            updateClass: 'adminProductBoxUpdateTrue'
        })
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val
        this.setState(obj)
    }

    resetState = () => {
        this.setState({
            update: false,
            img: '',
            title: '',
            description: '',
            price: 0
        })
    }

    addToCart = (id) => {
         axios.post(`/api/cart/${id}`).then(res => {
            this.props.getCart(res.data)
        })
        this.componentDidMount()
    }

    accordion = () => {
        if(this.state.accordion === 'w3-hide w3-container'){
            this.setState({
                accordion: 'w3-show w3-container'
            })
        } else {
            this.setState({
                accordion: 'w3-hide w3-container'
            })
        }
        if(this.state.productBox === 'productBoxSmall'){
            this.setState({
                productBox: 'productBoxBig'
            })
        } else {
            this.setState({
                productBox: 'productBoxSmall'
            })
        }
        if(this.state.show === 'w3-show'){
            this.setState({
                show: 'w3-hide'
            })
        } else {
            this.setState({
                show: 'w3-show'
            })
        }
    }
    

    render(){
        let { product } = this.props
        return(
            this.props.isAdmin ?
                    <div key={product.id} className={this.state.updateClass}>

                        <img className={this.state.show} src={product.img} alt='' height='250px' width='250px'/><br/>

                        <div>
                            {product.title}
                        </div><br/>

                        {/* <div>
                            {product.description}
                        </div><br/> */}
                        <button onClick={this.accordion} className='w3-button w3-black'>
                            Details
                        </button><br/>

                        <div className={this.state.accordion}>
                            <p style={{}}>{product.description}</p>
                        </div><br/>

                        <div>
                            ${product.price}
                        </div><br/>

                        <div>
                            <div>
                                {!this.state.update ?
                                    <button onClick={this.update} className='w3-button w3-black w3-hover-pale-red'>
                                        Update
                                    </button>:
                                    null
                                }
                            </div><br/>

                        </div>
                        
                        { this.state.update ?
                        <div className='update'>
                        <input 
                        type='text'
                        value={this.state.img}
                        placeholder='Image URL'
                        onChange={(e) => this.handleChange(e.target.value, 'img')}
                        />

                        <input 
                        type='text'
                        value={this.state.title}
                        placeholder='Title'
                        onChange={(e) => this.handleChange(e.target.value, 'title')}
                        />

                        <textarea 
                        value={this.state.description}
                        placeholder='Description'
                        onChange={(e) => this.handleChange(e.target.value, 'description')}
                        />

                        <input 
                        type='number'
                        value={this.state.price}
                        placeholder='Price'
                        onChange={(e) => this.handleChange(e.target.value, 'price')}
                        />

                        <button onClick={() => {
                            let { img, title, description, price } = this.state
                            axios.put(`/api/products/${product.id}`, {img, title, description, price}).then(res => {
                                this.props.setProducts(res.data)
                            })
                            this.setState({
                                update: false,
                                img: '',
                                title: '',
                                description: '',
                                price: 0,
                                updateClass: 'adminProductBoxUpdateFalse'
                            })
                        }}
                        className='w3-button w3-black w3-hover-pale-red'>
                            Submit
                        </button>
                        
                        <button onClick={() => {
                            this.setState({
                                update: false,
                                updateClass: 'adminProductBoxUpdateFalse'
                            })
                        }}
                        className='w3-button w3-black w3-hover-pale-red'>
                            Cancel
                        </button>

                        </div>
                    :
                    null
                    }
                    </div>
                    :

                    <div key={product.id} className={this.state.productBox}>

                    <img src={product.img} alt='' height='250px' width='250px'/><br/>

                    <div>
                        {product.title}
                    </div><br/>

                    <button onClick={this.accordion} className='w3-button w3-black'>
                        Details
                    </button><br/>

                    <div id='details' className={this.state.accordion}>
                        <p>{product.description}</p>
                    </div><br/>

                    <div>
                        ${product.price}
                    </div><br/>

                    {
                        !this.props.isAuthenticated ?
                        <Link to='/login'>
                            <button className='w3-button w3-black w3-hover-pale-red'>
                                Add to cart
                            </button>
                        </Link>
                        :
                        <button onClick={() => this.addToCart(product.id)} className='w3-button w3-black w3-hover-pale-red '>
                            Add to cart
                        </button>
                    }

                    </div> 
        )
    }
}

function mapStateToProps(state){
    let { isAdmin, isAuthenticated, cart } = state
    return {
        isAdmin,
        isAuthenticated,
        cart
    }
}

export default connect(mapStateToProps, { setProducts, getCart })(Products)