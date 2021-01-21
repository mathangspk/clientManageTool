import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  uploadImagesFail,
  uploadImagesSuccess,
  deleteImageSuccess,
  deleteImageFail,
} from '../actions/imageActions';

import { uploadImagesRequest, deleteImageRequest } from '../apis/image';
import { getToken } from '../apis/auth';

import * as imageTypes from '../constants/image';

import { STATUS_CODE, } from '../constants';

import { showLoading, hideLoading } from '../actions/ui';

import { returnErrors } from '../actions/errorActions';

import { hideTempModal, showModal } from '../actions/modal';

function* uploadImagesSaga({ payload }) {
  const token = yield call(getToken);
  yield put(hideTempModal());
  yield put(showLoading());
  console.log(payload)
  const resp = yield call(uploadImagesRequest, token, payload);
  // console.log(resp)
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(uploadImagesSuccess(data.data));
  } else {
    yield put(uploadImagesFail(data));
    yield put(returnErrors(data, status, 'UPLOAD_IMAGES_FAIL'));
  }
  yield put(hideLoading());
  yield put(showModal());
}

function* deleteImageSaga({ payload }) {
  const  filename  = payload;
  console.log(filename);
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(deleteImageRequest, token, filename);
  const { data, status } = resp;
  console.log(resp)
  if (status === STATUS_CODE.SUCCESS) {
    yield put(deleteImageSuccess(filename));
  } else {
    yield put(deleteImageFail(data));
    yield put(returnErrors(data, status, 'DELETE_IMAGE_FAIL'));
  }
  yield put(hideLoading());
}

// function* updateProductSaga({ payload }) {
//   const token = yield call(getToken);
//   const productEdited = payload;
//   const productEditting = yield select((state) => state.products.productEditting);
//   const { _id } = productEditting;
//   const productSendReducer = { _id, ...productEdited }
//   yield put(showLoading());
//   const resp = yield call(
//     patchProductRequest,
//     token, _id, productEdited
//   );
//   const { data, status } = resp;
//   if (status === STATUS_CODE.SUCCESS) {
//     yield put(updateProductSuccess(productSendReducer));
//     yield put(hideModal());
//   } else {
//     yield put(updateProductFail(data));
//     yield put(returnErrors(data, status, 'UPDATE_PRODUCTS_FAIL'));
//   }
//   yield put(hideLoading());
// }

function* imageSaga() {
  yield takeLatest(imageTypes.UPLOAD_IMAGE, uploadImagesSaga);
  yield takeLatest(imageTypes.DELETE_IMAGE, deleteImageSaga);
  // yield takeLatest(imageTypes.DELETE_PRODUCT, deleteProductSaga);
  // yield takeLatest(imageTypes.UPDATE_PRODUCT, updateProductSaga);
}

export default (imageSaga);
