import * as imageConstants from '../constants/image';

export const getImage = (params = {}) => {
  return {
    type: imageConstants.GET_IMAGE,
    payload: {
      params,
    }
  }
}
export const getImageSuccess = (data) => {
  return {
    type: imageConstants.GET_IMAGE_SUCCESS,
    payload: data,
  }
}
export const getImageFail = (error) => {
  return {
    type: imageConstants.GET_IMAGE_FAIL,
    payload: {
      error,
    }
  }
}
export const uploadImages = (payload) => {
  return {
    type: imageConstants.UPLOAD_IMAGE,
    payload,
  };
};

export const uploadImagesSuccess = (payload) => {
  return {
    type: imageConstants.UPLOAD_IMAGE_SUCCESS,
    payload,
  };
};

export const uploadImagesFail = (payload) => {
  return {
    type: imageConstants.UPLOAD_IMAGE_FAIL,
    payload,
  };
};

export const deleteImage = (payload) => {
  return {
    type: imageConstants.DELETE_IMAGE,
    payload,
  };
};

export const deleteImageSuccess = (payload) => {
  return {
    type: imageConstants.DELETE_IMAGE_SUCCESS,
    payload,
  };
};

export const deleteImageFail = (payload) => {
  return {
    type: imageConstants.DELETE_IMAGE_FAIL,
    payload,
  };
};

export const cleanImageStore = () => {
  return {
    type: imageConstants.CLEAN_IMAGES,
  };
};