import * as types from '../constants/tool';
import { toastError, toastSuccess } from '../helpers/toastHelper';
var initialState = {
    tools: [],
    loading: false,
    isCreateSuccess: false,
    toolEditting: null,
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ALL_TOOLS_SUCCESS:
            return {
                ...state,
                tools: action.payload,
                loading: false
            }
        case types.SEARCH_TOOLS_SUCCESS:
            return {
                ...state,
                // tools: action.payload,
                params: action.payload.params || {},
                loading: false
            }
        case types.GET_ID_TOOL_SUCCESS:
            return {
                ...state,
                tool: action.payload
            }
        case types.ADD_TOOL:
            return {
                ...state,
            }
        case types.ADD_TOOL_SUCCESS: {
            const  data  = action.payload;
            toastSuccess('Thêm mới sản phẩm thành công thành công!')
            return {
                ...state,
                tools: [data, ...state.tools],
            };
        }
        case types.ADD_TOOL_FAIL: {
            const  error  = action.payload;
            toastError(error);
            return {
                ...state,
            };
        }
        case types.DELETE_TOOL_SUCCESS:
            return {
                ...state,
                tools: [...state.tools.filter(tool => tool._id !== action.payload)]
            }
        case types.SET_TOOL_EDITING: {
            const { tool } = action.payload;
            return {
                ...state,
                toolEditting: tool,
            };
        }
        case types.UPDATE_TOOL: {
            return {
                ...state,
            };
        }
        case types.UPDATE_TOOL_SUCCESS: {
            const  toolEditting  = action.payload;
            const { tools } = state;
            const index = tools.findIndex((item) => item._id === toolEditting._id);
            if (index !== -1) {
                const newList = [
                    ...tools.slice(0, index),
                    toolEditting,
                    ...tools.slice(index + 1),
                ];
                // toastSuccess('Cập nhật Work Order thành công')
                return {
                    ...state,
                    tools: newList,
                };
            }
            return { ...state, }
        }
        case types.UPDATE_TOOL_FAIL: {
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