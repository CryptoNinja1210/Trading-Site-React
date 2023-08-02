import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_DEFAULT_STRATEGIES,
    GET_STRATEGIES,
    STRATEGIES_ERROR,
    POST_STRATEGY,
    DELETE_STRATEGY,
    POST_STRATEGY_TEST
} from './types'

// Get defaultstrategies
export const getDefaultStrategies = () => async (dispatch) => {
    try {
        const res = await api.get('/backtesting/defaultStrategies');
        dispatch({
            type: GET_DEFAULT_STRATEGIES,
            payload: res.data
        });
        dispatch(setAlert('Default strategies loaded', 'success'));
    } catch (err) {
        dispatch({
            type: STRATEGIES_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get strategies
export const getStrategies = () => async (dispatch) => {
    try {
        const res = await api.get('/backtesting/strategies');
        dispatch({
            type: GET_STRATEGIES,
            payload: res.data
        });
        res.data === [] ?
        dispatch(setAlert('Strategies not exist', 'primary')) :
        dispatch(setAlert('Strategies loaded', 'success'))
    } catch (err) {
        dispatch({
            type: STRATEGIES_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch(setAlert('Strategies load failed', 'danger'));
    }
};

// @route    POST api/backtesting/strategy
// @desc     Create a strategy
// @access   Private
export const addStrategy = () => async (dispatch) => {
    try {
      const res = await api.post('/backtesting/strategy');
      dispatch({
        type: POST_STRATEGY,
        payload: res.data
      });
  
      dispatch(setAlert('Strategy Created', 'success'));
    } catch (err) {
      dispatch({
        type: STRATEGIES_ERROR,
        // payload: { msg: err.response.statusText, status: err.response.status }
      });
      dispatch(setAlert('Creating Strategy Error', 'error'));
    }
};

//put(edit) a strategy
export const postStrategyTest = (testCategory) => async (dispatch) => {
  try {
  //   const res = await api.post('/backtesting/strategy', formData);
  //   console.log(formData)
    console.log(testCategory)
    dispatch({
      type: POST_STRATEGY_TEST,
      payload: testCategory //res.data
    });

    dispatch(setAlert(`${testCategory.strategyName} ${testCategory.testName} Completed` , 'success'));
  } catch (err) {
    dispatch({
      type: STRATEGIES_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Strategy creation Error', 'error'))
  }
};

//delete strategy
export const deleteStrategy = (keys) => async (dispatch) => {
    try {
    //   const res = await api.post('/backtesting/strategy', formData);
    //   console.log(formData)
    // console.log(keys)
        
      dispatch({
        type: DELETE_STRATEGY,
        payload: keys
      });
  
      dispatch(setAlert('Strategy Deleted', 'success'));
    } catch (err) {
      dispatch({
        type: STRATEGIES_ERROR,
        // payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
