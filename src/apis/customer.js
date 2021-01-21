import { getWithToken, postWithToken, deleteWithToken, patchWithToken } from '../commons/utils/apiCaller';

export const getAllCustomer = (token) => {
    return getWithToken('users', token).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const addCustomerRequest = (token, data) => {
    return postWithToken('users/register', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const deleteCustomerRequest = (token, id) => {
    return deleteWithToken('users', token, id).then(res => {
        return res;
    }).catch(err => {
        return err.response
    });
}
export const patchCustomerRequest = (token, id, customerEditting) => {
    return patchWithToken('users', token, id, customerEditting).then(res => {
        return res;
    }).catch(err => {
        return err.response
    });
}




