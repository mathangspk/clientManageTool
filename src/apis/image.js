import { postImagesWithToken, deleteImageWithToken } from '../commons/utils/apiCaller';

export const uploadImagesRequest = (token, listFile) => {
    return postImagesWithToken('api/upload/upload-photos', token, listFile).then(res => {
        return res;
    }).catch(err => { return err.response });
};

export const deleteImageRequest = (token, filename) => {
    return deleteImageWithToken('api/upload/image', token, filename).then(res=> {
        return res;
    }).catch(err => {return err.response});
}



