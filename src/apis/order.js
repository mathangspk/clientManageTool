import { getWithToken, postWithToken, deleteWithToken, patchWithToken } from '../commons/utils/apiCaller';

export const getAllOrder = (token, data) => {
    return getWithToken('api/orders', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}
export const searchOrder = (token, data) => {
    return getWithToken('api/orders/search', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}
export const getIdOrder = (token, id) => {
    return getWithToken('api/orders/' + id, token).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const addOrderRequest = (token, data) => {
    return postWithToken('api/orders', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const deleteOrderRequest = (token, id) => {
    return deleteWithToken('api/orders', token, id).then(res => {
        return res;
    }).catch(err => {
        return err.response
    });
}
export const patchOrderRequest = (token, id, orderEditting) => {
    return patchWithToken('api/orders', token, id, orderEditting).then(res => {
        return res;
    }).catch(err => {
        return err.response
    });
}




