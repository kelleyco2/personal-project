import React, { Component } from 'react'
import Products from './Products'
import ProductsForm from './ProductsForm'
import { connect } from 'react-redux'
import axios from 'axios'
import { setProducts } from '../../ducks/reducer'
import './ProductsContainer.css'

class ProductsContainer extends Component{

    componentDidMount(){
        axios.get('/api/products').then(res => {
            this.props.setProducts(res.data)
        })
    }

    render(){
        let products = this.props.products.map(product => {
            return (
                <Products
                product={product}
                key={product.id}
                />
            )
        })
        return this.props.isAdmin ?
            <div>
                <div className='productsContainer'>
                    {products}
                </div><br/>

                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 40}}>                    
                    <ProductsForm />
                </div>
            </div>
            :
            <div className='productsContainer'>
                {products}
            </div>
    }

}

function mapStateToProps(state){
    let { isAdmin, products } = state
    return {
        isAdmin,
        products
    }
}

export default connect(mapStateToProps, { setProducts })(ProductsContainer)