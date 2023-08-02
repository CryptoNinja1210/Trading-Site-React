import {
    GET_STOCK, 
    STOCK_ERROR,
} from '../actions/types';
  
const initialState = {
    stock:null,
    loading:true,
    error: {},
};

function stockReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case GET_STOCK:
        return {
        ...state,
        stock: payload,
        loading: false
        };
    case STOCK_ERROR:
        return {
        ...state,
        error: payload,
        loading: false
        };
    default:
        return state;
    }
}

export default stockReducer;
  