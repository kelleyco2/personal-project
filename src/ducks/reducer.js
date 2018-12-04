
const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    client: {},
    products: [],
    cart: [],
    total: 0,
    orders: []
}

const CLIENT_LOGGED_IN = 'CLIENT_LOGGED_IN'
const CLIENT_LOGGED_OUT = 'CLIENT_LOGGED_OUT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const IS_ADMIN = 'IS_ADMIN'
const GET_CART = 'GET_CART'
const RESET_CART = 'RESET_CART'
const TOTAL = 'TOTAL'
const GET_ORDERS = 'GET_ORDERS'

export default function reducer(state = initialState, action){
    switch (action.type) {

        case CLIENT_LOGGED_IN:
            return { ...state, isAuthenticated: true, client: action.payload}

        case CLIENT_LOGGED_OUT:
            return { ...state, isAuthenticated: false, isAdmin: false, client: {} } 

        case SET_PRODUCTS:
            return { ...state, products: action.payload }

        case IS_ADMIN:
            return { ...state, isAdmin: true}

        case GET_CART:
            return { ...state, cart: action.payload }

        case RESET_CART:
            return { ...state, cart: []}

        case TOTAL:
            return { ...state, total: action.payload}

        case GET_ORDERS:
            return { ...state, orders: action.payload}

        default:
            return state;
    }
}

export function clientLoggedIn(client){
    return {
        type: CLIENT_LOGGED_IN,
        payload: client
    }
}

export function clientLoggedOut(){
    return {
        type: CLIENT_LOGGED_OUT
    }
}

export function isAdmin(){
    return {
        type: IS_ADMIN
    }
}

export function setProducts(products){
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

export function getCart(cart){
    return {
        type: GET_CART,
        payload: cart
    }
}

export function resetCart(){
    return {
        type: RESET_CART
    }
}

export function updateTotal(total){
    return {
        type: TOTAL,
        payload: total
    }
}

export function getOrders(orders){
    return {
        type: GET_ORDERS,
        payload: orders
    }
}