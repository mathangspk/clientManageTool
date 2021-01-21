import {
  call,
  put,
  takeLatest,
  select,
  delay,
} from 'redux-saga/effects';

import {
  listAllOrdersSuccess,
  listAllOrdersFail,
  searchOrderSuccess,
  searchOrderFail,
  getIdOrderSuccess,
  getIdOrderFail,
  addOrderSuccess,
  addOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderSuccess,
  updateOrderFail,
} from '../actions/orderActions';

import { getAllOrder, searchOrder, getIdOrder, addOrderRequest, deleteOrderRequest, patchOrderRequest } from '../apis/order';
import { getToken } from '../apis/auth';

import * as orderTypes from '../constants/order';

import { STATUS_CODE, } from '../constants';

import { showLoading, hideLoading } from '../actions/ui';

import { hideModal } from '../actions/modal';

import { returnErrors } from '../actions/errorActions';


function* getAllOrderSaga({ payload }) {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(getAllOrder, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(listAllOrdersSuccess(data))
  } else {
    yield put(listAllOrdersFail(data))
    yield put(returnErrors(data, status, 'GET_ALL_ORDERS_FAIL'))
  }
  yield put(hideLoading());
}

function* searchOrderSaga({ payload }) {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(searchOrder, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(searchOrderSuccess(data, payload))
  } else {
    yield put(searchOrderFail(data))
    yield put(returnErrors(data, status, 'SEARCH_ORDER_FAIL'))
  }
  yield put(hideLoading());
}

function* getIdOrderSaga({ payload }) {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(getIdOrder, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(getIdOrderSuccess(data))
  } else {
    yield put(getIdOrderFail(data))
    yield put(returnErrors(data, status, 'GET_ID_ORDER_FAIL'))
  }
  yield put(hideLoading());
}

function* addOrderSaga({ payload }) {
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(addOrderRequest, token, payload);
  const { data, status } = resp;
  console.log(resp);
  if (status === STATUS_CODE.SUCCESS) {
    window.location = '/admin/order-detail/' + data._id
    // yield put(addOrderSuccess(data));
    // yield put(hideModal());
  } else {
    yield put(addOrderFail(data));
    yield put(returnErrors(data, status, 'ADD_ORDER_FAIL'))
  }
  yield put(hideLoading());
}

function* deleteOrderSaga({ payload }, params) {
  const { _id } = payload;
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(deleteOrderRequest, token, _id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const _resp = yield call(searchOrder, token, {params: payload.params || {}});
    if (_resp.data.Status.StatusCode === STATUS_CODE.SUCCESS) {
      yield put(searchOrderSuccess(_resp.data, {params: payload.params || {}}))
    }
  } else {
    yield put(deleteOrderFail(data));
  }
  yield put(hideLoading());
}

function* updateOrderSaga({ payload }) {
  const token = yield call(getToken);
  const orderEdited = payload;
  const orderEditting = yield select((state) => state.orders.order);
  const { _id } = orderEditting;
  const orderSendReducer = { _id, ...orderEdited }
  yield put(showLoading());
  const resp = yield call(
    patchOrderRequest,
    token, _id, orderEdited
  );
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(updateOrderSuccess(orderSendReducer));
    yield put(hideModal());
  } else {
    yield put(updateOrderFail(data));
  }
  yield put(hideLoading());
}

function* orderSaga() {
  yield takeLatest(orderTypes.GET_ALL_ORDERS, getAllOrderSaga);
  yield takeLatest(orderTypes.SEARCH_ORDER, searchOrderSaga);
  yield takeLatest(orderTypes.GET_ID_ORDER, getIdOrderSaga);
  yield takeLatest(orderTypes.ADD_ORDER, addOrderSaga);
  yield takeLatest(orderTypes.DELETE_ORDER, deleteOrderSaga);
  yield takeLatest(orderTypes.UPDATE_ORDER, updateOrderSaga);
}

export default (orderSaga);
