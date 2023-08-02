import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_STOCK, 
  STOCK_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get stocks
export const getStock = (stockArray) => async (dispatch) => {
  try {
    const res = await api.post('/stock', stockArray);

    dispatch({
      type: GET_STOCK,
      payload: res.data
    });

    dispatch(setAlert('Market Page loaded', 'success'));
  } catch (err) {
    console.log(err)
  }
};


// // Get post
// export const getPost = (id) => async (dispatch) => {
//   try {
//     const res = await api.get(`/posts/${id}`);

//     dispatch({
//       type: GET_POST,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
