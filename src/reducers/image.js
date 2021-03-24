import * as types from '../constants/image';
import * as modalTypes from '../constants/modal';
import { toastError, toastSuccess } from '../helpers/toastHelper';
var initialState = {
    images: [],
    loading: false,
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.UPLOAD_IMAGE:
            return {
                ...state,
            }
        case types.UPLOAD_IMAGE_SUCCESS: {
            const data = action.payload;
            for(let i=0; i< data.length ; i++){
                state.images.push(data[i])
            }
            if (state.images && state.images.length > 0) {
                toastSuccess('Upload ảnh thành công!')
            }
            return {
                ...state,
                images: state.images,
            };
        }
        case types.UPLOAD_IMAGE_FAIL: {
            const error = action.payload;
            toastError(error);
            return {
                ...state,
            };
        }
        case types.DELETE_IMAGE_SUCCESS:
            console.log(action)
            return {
                ...state,
                images: [...state.images.filter(image => image.filename !== action.payload)]
            }
        case types.CLEAN_IMAGES:
        case modalTypes.HIDE_MODAL:
            return {
                ...state,
                images: [],
            }
        default: return state;
    }
}
export default myReducer;