const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    client: {},
    products: []
}

const CLIENT_LOGGED_IN = 'CLIENT_LOGGED_IN'
const CLIENT_LOGGED_OUT = 'CLIENT_LOGGED_OUT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const IS_ADMIN = 'IS_ADMIN'

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