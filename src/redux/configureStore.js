import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
//IMPORT SAGA
import loginSaga from '../sagas/login';
import orderSaga from '../sagas/orderSaga';
import customerSaga from '../sagas/customerSaga';
import toolSaga from '../sagas/toolSaga';
import imageSaga from '../sagas/imageSaga';

const composeEnhancers =
  process.env.NODE_ENV !== 'toolion' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [thunk, sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(orderSaga);
  sagaMiddleware.run(customerSaga);
  sagaMiddleware.run(toolSaga);
  sagaMiddleware.run(imageSaga);
  return store;
};
export default configureStore;
