import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  listAllCustomersSuccess,
  listAllCustomersFail,
  addCustomerSuccess,
  addCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  updateCustomerSuccess,
  updateCustomerFail,
} from '../actions/customerActions';

import { getAllCustomer, addCustomerRequest, deleteCustomerRequest, patchCustomerRequest } from '../apis/customer';
import { getToken } from '../apis/auth';

import * as customerTypes from '../constants/customer';

import { STATUS_CODE, } from '../constants';

import { showLoading, hideLoading } from '../actions/ui';

import { hideModal } from '../actions/modal';

import { returnErrors } from '../actions/errorActions';


function* getAllCustomerSaga() {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(getAllCustomer, token);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(listAllCustomersSuccess(data))
  } else {
    yield put(listAllCustomersFail(data))
    yield put(returnErrors(data, status, 'LIST_ALL_CUSTOMERS_FAIL'))
  }
  yield put(hideLoading());
}

function* addCustomerSaga({ payload }) {
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(addCustomerRequest, token, payload);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(addCustomerSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addCustomerFail(data));
  }
  yield put(hideLoading());
}

function* deleteCustomerSaga({ payload }) {
  const { _id } = payload;
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(deleteCustomerRequest, token, _id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const _resp = yield call(getAllCustomer, token);
    if (_resp.status === STATUS_CODE.SUCCESS) {
      yield put(listAllCustomersSuccess(_resp.data))
    }
    // yield put(deleteCustomerSuccess(_id));
  } else {
    yield put(deleteCustomerFail(data));
  }
  yield put(hideLoading());
}

function* updateCustomerSaga({ payload }) {
  const token = yield call(getToken);
  const customerEdited = payload;
  const customerEditting = yield select((state) => state.customers.customerEditting);
  const { _id } = customerEditting;
  const customerSendReducer = { _id, ...customerEdited }
  yield put(showLoading());
  const resp = yield call(
    patchCustomerRequest,
    token, _id, customerEdited
  );
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(updateCustomerSuccess(customerSendReducer));
    yield put(hideModal());
  } else {
    yield put(updateCustomerFail(data));
  }
  yield put(hideLoading());
}

function* customerSaga() {
  yield takeLatest(customerTypes.GET_ALL_CUSTOMERS, getAllCustomerSaga);
  yield takeLatest(customerTypes.ADD_CUSTOMER, addCustomerSaga);
  yield takeLatest(customerTypes.DELETE_CUSTOMER, deleteCustomerSaga);
  yield takeLatest(customerTypes.UPDATE_CUSTOMER, updateCustomerSaga);
}

export default (customerSaga);
