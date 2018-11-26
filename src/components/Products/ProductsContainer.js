import React from 'react'
import Products from './Products'
import ProductsForm from './ProductsForm'
import { connect } from 'react-redux'

function ProductsContainer(props){
    return props.isAdmin ?
        <div>
            <Products />
            <ProductsForm />
        </div>
        :
        <div>
            <Products />
        </div>

}

function mapStateToProps(state){
    let { isAdmin } = state
    return {
        isAdmin
    }
}

export default connect(mapStateToProps)(ProductsContainer)