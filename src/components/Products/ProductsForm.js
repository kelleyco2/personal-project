import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setProducts } from '../../ducks/reducer'

class ProductsForm extends Component {
    constructor(){
        super()

        this.state = {
            img: '',
            title: '',
            description: '',
            price: 0
        }
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val
        this.setState(obj)
    }

    handleClick = () => {
        axios.post('/api/products', this.state).then(res => {
            this.props.setProducts(res.data)
            this.setState({
                img: '',
                title: '',
                description: '',
                price: 0
            })
        })
    }

    render(){
        return (
            <div>

                <input 
                type='text'
                placeholder='Image URL' 
                onChange={(e) => this.handleChange(e.target.value, 'img')} 
                value={this.state.img}
                />

                <input 
                type='text'
                placeholder='Title'
                onChange={(e) => this.handleChange(e.target.value, 'title')}
                value={this.state.title}
                />

                <textarea 
                type='text'
                cols='30'
                rows='10'
                onChange={(e) => this.handleChange(e.target.value, 'description')}
                placeholder='Description'
                value={this.state.description}
                />

                <input 
                type='number'
                placeholder='price'
                onChange={(e) => this.handleChange(e.target.value, 'price')}
                value={this.state.price}
                />

                <button onClick={this.handleClick}>
                    Add
                </button>

            </div>
        )
    }
}

export default connect(null, { setProducts })(ProductsForm)