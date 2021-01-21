import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  loginSuccess,
  loginFail,
} from '../actions/authActions';

import { login } from '../apis/auth';

import * as authTypes from '../constants/ActionTypes';

import { STATUS_CODE, } from '../constants';
import { returnErrors } from '../actions/errorActions';


function* loginSaga({ payload }) {
  const user = payload;
  const resp = yield call(login, user)
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(loginSuccess(data));
  } else {
    yield put(loginFail(resp))
    yield put(returnErrors(data, status, 'LOGIN_FAIL'))
  }
}

function* loginActionSaga() {
  yield takeLatest(authTypes.LOGIN, loginSaga);
}

export default (loginActionSaga);
