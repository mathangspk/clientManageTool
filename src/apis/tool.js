import { getWithToken, postWithToken, deleteWithToken, patchWithToken } from '../commons/utils/apiCaller';

export const getAllTool = (token, data) => {
    return getWithToken('api/tools', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const searchTools = (token, data) => {
    return getWithToken('api/tools/search', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const getIdTool = (token, id) => {
    return getWithToken('api/tools/' + id, token).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const addToolRequest = (token, data) => {
    return postWithToken('api/tools', token, data).then(res => {
        return res;
    }).catch(err => { return err.response });
}

export const deleteToolRequest = (token, id) => {
    return deleteWithToken('api/tools', token, id).then(res => {
        return res;
    }).catch(err => {
        return err.response
    });
}
export const patchToolRequest = (token, id, toolEditting) => {
    return patchWithToken('api/tools', token, id, toolEditting).then(res => {
        return res;
    }).catch(err => {
        return err.response
    });
}




