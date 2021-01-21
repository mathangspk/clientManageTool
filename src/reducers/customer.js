import * as types from '../constants/customer';
import { toastError, toastSuccess } from '../helpers/toastHelper';
var initialState = {
    customers: [],
    loading: false,
    isCreateSuccess: false,
    customerEditting: null,
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                loading: false
            }
        case types.ADD_CUSTOMER:
            return {
                ...state,
            }
        case types.ADD_CUSTOMER_SUCCESS: {
            const  data  = action.payload.user;
            toastSuccess('Thêm mới người dùng thành công!')
            return {
                ...state,
                customers: [data, ...state.customers],
            };
        }
        case types.ADD_CUSTOMER_FAIL: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
            };
        }
        case types.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [...state.customers.filter(customer => customer._id !== action.payload)]
            }
        case types.SET_CUSTOMER_EDITING: {
            const { customer } = action.payload;
            return {
                ...state,
                customerEditting: customer,
            };
        }
        case types.UPDATE_CUSTOMER: {
            return {
                ...state,
            };
        }
        case types.UPDATE_CUSTOMER_SUCCESS: {
            const  customerEditting  = action.payload;
            const { customers } = state;
            const index = customers.findIndex((item) => item._id === customerEditting._id);
            if (index !== -1) {
                const newList = [
                    ...customers.slice(0, index),
                    customerEditting,
                    ...customers.slice(index + 1),
                ];
                // toastSuccess('Cập nhật người dùng thành công')
                return {
                    ...state,
                    customers: newList,
                };
            }
            return { ...state, }
        }
        case types.UPDATE_CUSTOMER_FAIL: {
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