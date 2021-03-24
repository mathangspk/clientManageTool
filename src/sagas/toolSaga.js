import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  listAllToolsSuccess,
  listAllToolsFail,
  searchToolsSuccess,
  searchToolsFail,
  getIdToolSuccess,
  getIdToolFail,
  addToolSuccess,
  addToolFail,
  deleteToolFail,
  updateToolSuccess,
  updateToolFail,
} from '../actions/toolActions';

import {
  updateOrderSuccess
} from '../actions/orderActions';

import { getAllTool, searchTools, getIdTool, addToolRequest, deleteToolRequest, patchToolRequest } from '../apis/tool';
import { getToken } from '../apis/auth';

import * as toolTypes from '../constants/tool';

import { STATUS_CODE, } from '../constants';

import { showLoading, hideLoading } from '../actions/ui';

import { hideModal } from '../actions/modal';

import { returnErrors } from '../actions/errorActions';


function* getAllToolSaga({ payload }) {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(getAllTool, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(listAllToolsSuccess(data))
  } else {
    yield put(listAllToolsFail(data))
    yield put(returnErrors(data, status, 'LIST_ALL_TOOLS_FAIL'))
  }
  yield put(hideLoading());
}

function* searchToolsSaga({ payload }) {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(searchTools, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(searchToolsSuccess(data, payload))
  } else {
    yield put(searchToolsFail(data))
    yield put(returnErrors(data, status, 'SEARCH_TOOLS_FAIL'))
  }
  yield put(hideLoading());
}

function* getIdToolSaga({ payload }) {
  yield put(showLoading());
  const token = yield call(getToken);
  const resp = yield call(getIdTool, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(getIdToolSuccess(payload))
  } else {
    yield put(getIdToolFail(payload))
    yield put(returnErrors(payload, status, 'GET_ID_TOOL_FAIL'))
  }
  yield put(hideLoading());
}

function* addToolSaga({ payload }) {
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(addToolRequest, token, payload);
  const { data, status } = resp;
  
  if (status === STATUS_CODE.SUCCESS) {
    yield put(addToolSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addToolFail(data));
    yield put(returnErrors(data, status, 'ADD_TOOLS_FAIL'));
  }
  yield put(hideLoading());
}

function* deleteToolSaga({ payload }) {
  const { _id } = payload;
  const token = yield call(getToken);
  yield put(showLoading());
  const resp = yield call(deleteToolRequest, token, _id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const _resp = yield call(getAllTool, token, {params: {}});
    if (_resp.status === STATUS_CODE.SUCCESS) {
      yield put(listAllToolsSuccess(_resp.data))
    }
  } else {
    yield put(deleteToolFail(data));
    yield put(returnErrors(data, status, 'DELETE_TOOLS_FAIL'));
  }
  yield put(hideLoading());
}

function* updateToolSaga({ payload }) {
  const token = yield call(getToken);
  const toolEdited = payload;
  const toolEditting = yield select((state) => state.tools.toolEditting);
  //console.log(toolEditting)
  //yield put(uploadImagesSuccess())
  const { _id } = toolEditting || toolEdited;
  const toolSendReducer = { _id, ...toolEdited }
  yield put(showLoading());
  const resp = yield call(
    patchToolRequest,
    token, _id, toolEdited
  );
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(updateToolSuccess(toolSendReducer));
    if (payload.woInfo && payload.woInfo._id) {
      yield put(updateOrderSuccess(payload.woInfo));
    }
    yield put(hideModal());
  } else {
    yield put(updateToolFail(data));
    yield put(returnErrors(data, status, 'UPDATE_TOOLS_FAIL'));
  }
  yield put(hideLoading());
}

function* toolSaga() {
  yield takeLatest(toolTypes.GET_ALL_TOOLS, getAllToolSaga);
  yield takeLatest(toolTypes.SEARCH_TOOLS, searchToolsSaga);
  yield takeLatest(toolTypes.GET_ID_TOOL, getIdToolSaga);
  yield takeLatest(toolTypes.ADD_TOOL, addToolSaga);
  yield takeLatest(toolTypes.DELETE_TOOL, deleteToolSaga);
  yield takeLatest(toolTypes.UPDATE_TOOL, updateToolSaga);
}

export default (toolSaga);
