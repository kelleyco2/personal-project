import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setProducts } from '../../ducks/reducer'

class ProductsContainer extends Component {
    componentDidMount(){
        axios.get('/api/products').then(res => {
            this.props.setProducts(res.data)
        })
    }

    render(){
        return(
            this.props.products.map(product => {
                return this.props.isAdmin ?
                    <div key={product.id}>

                        <img src={product.img} alt='' height='250px' width='250px'/>

                        <div>
                            {product.title}
                        </div>

                        <div>
                            {product.description}
                        </div>

                        <div>
                            ${product.price}
                        </div>

                        <button>
                            Update
                        </button>

                        <button>
                            Delete
                        </button>

                    </div>:

                    <div key={product.id}>

                    <img src={product.img} alt='' height='250px' width='250px'/>

                    <div>
                        {product.title}
                    </div>

                    <div>
                        {product.description}
                    </div>

                    <div>
                        ${product.price}
                    </div>

                    </div>
                
            })
        )
    }
}

function mapStateToProps(state){
    let { products, isAdmin } = state
    return {
        products,
        isAdmin
    }
}

export default connect(mapStateToProps, { setProducts })(ProductsContainer)