import { combineReducers } from 'redux';
import taskReducer from './task';
import uiReducer from './ui';
import modalReducer from './modal';
import auth from './authReducer';
import errorReducer from './errorReducer';
import orders from './order';
import customers from './customer';
import tools from './tool';
import images from './image';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  task: taskReducer,
  ui: uiReducer,
  modal: modalReducer,
  form: formReducer,
  auth,
  error: errorReducer,
  orders,
  customers,
  tools,
  images,

});

export default rootReducer;
