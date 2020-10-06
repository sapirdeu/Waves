import axios from 'axios'
import {
        GET_PRODUCTS_BY_ARRIVAL,
        GET_PRODUCTS_BY_SELL,
} from './Types'
import {PRODUCT_SERVER} from '../../components/utils/Misc'

function getProductsByArrival(){
    //sort by ARRIVAL: /api/product/articles?sortBy=createdAt&order=desc&limit=4
    const request = 
        axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);
    
    return {
        type: GET_PRODUCTS_BY_ARRIVAL, 
        payload: request
    }
}

function getProductsBySell(){
    //sort by SELL: /api/product/articles?sortBy=sold&order=desc&limit=4
    const request = 
        axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);
    
    return {
        type: GET_PRODUCTS_BY_SELL, 
        payload: request
    }
}


export {getProductsByArrival, getProductsBySell}

