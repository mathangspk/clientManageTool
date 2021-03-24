import axios from 'axios';
import { returnErrors } from './errorActions';
import {API_ENDPOINT as URL} from '../constants';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN
} from '../constants/ActionTypes';

//check token & load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING })
    axios.get(`${URL}/users/user`, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        })).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

//setup config/headers and token
export const tokenConfig = getState => {
    //get token from localStoreage
    const token = getState().auth.token;
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //if token, add to headers
    if (token) {
        config.headers['auth-token'] = token;
    }
    return config;
}

// //register user
// export const register = newUser => dispatch => {
//     //headers 
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }

//     //request body
//     const body = newUser;

//     console.log(body)
//     axios.post(`${URL}/users/register`, body, config)
//         .then(
//             res => dispatch({
//                 type: REGISTER_SUCCESS,
//                 payload: res.data
//             })
//         ).catch(err => {
//             console.log(err.response.data)
//             dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
//             dispatch({
//                 type: REGISTER_FAIL
//             })
//         })
// }
//login user
// export const login = user => dispatch => {
//     //headers 
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }

//     //request body
//     const body = user;
//     axios.post(`${URL}/users/login`, body, config)
//         .then(
//             res => dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: res.data
//             })
//         ).catch(err => {
//             console.log(err.response.data)
//             dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
//             dispatch({
//                 type: LOGIN_FAIL
//             })
//         })
// }

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const loginAction =(user)=> {
    return{
        type: LOGIN,
        payload: user
    }
}

export const loginSuccess = (data)=> {
    return{
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const loginFail = (err) => {
    return{
        type: LOGIN_FAIL,
        payload: err
    }
}