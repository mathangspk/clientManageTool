import * as types from '../constants/order';
import { toastError, toastSuccess } from './../helpers/toastHelper';
var initialState = {
    orders: [],
    loading: false,
    isCreateSuccess: false,
    orderEditting: null,
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload.Status.StatusCode === 200 && action.payload.Data.Row || [],
                total: action.payload.Status.StatusCode === 200 && action.payload.Data.Total || 0,
                loading: false
            }
        case types.SEARCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.data.Status.StatusCode === 200 && action.payload.data.Data.Row || [],
                total: action.payload.data.Status.StatusCode === 200 && action.payload.data.Data.Total || 0,
                params: action.payload.params.params || {},
                loading: false
            }
        case types.GET_ID_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
                loading: false
            }
        case types.ADD_ORDER:
            return {
                ...state,
            }
        case types.ADD_ORDER_SUCCESS: {
            const  data  = action.payload;
            toastSuccess('Thêm mới Work Order thành công!')
            return {
                ...state,
                orders: [data, ...state.orders],
            };
        }
        case types.ADD_ORDER_FAIL: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
            };
        }
        case types.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                orders: [...state.orders.filter(order => order._id !== action.payload)]
            }
        case types.SET_ORDER_EDITING: {
            const { order } = action.payload;
            return {
                ...state,
                order,
            };
        }
        case types.UPDATE_ORDER: {
            return {
                ...state,
            };
        }
        case types.UPDATE_ORDER_NOTE: {
            const  orderEditting  = action.payload;
            return {
                ...state,
                order: orderEditting
            };
        }
        case types.UPDATE_ORDER_SUCCESS: {
            const  orderEditting  = action.payload;
            const { orders } = state;
            const index = orders.findIndex((item) => item._id === orderEditting._id);
            if (index !== -1) {
                const newList = [
                    ...orders.slice(0, index),
                    orderEditting,
                    ...orders.slice(index + 1),
                ];
                // toastSuccess('Cập nhật đơn hàng thành công')
                return {
                    ...state,
                    orders: newList,
                    order: orderEditting
                };
            }
            return { ...state, order: orderEditting }
        }
        case types.UPDATE_ORDER_FAIL: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
            };
        }
        default: return state;
    }
}
export default myReducer;