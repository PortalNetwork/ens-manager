import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger, } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas'; 

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

  switch(process.env.NODE_ENV) {
    case 'production':
      return ({
        ...createStore(
          rootReducer,
          composeEnhancers(applyMiddleware(sagaMiddleware))
        ),
        runSaga: sagaMiddleware.run(rootSaga)
      });
      break;
    default:
      return ({
        ...createStore(
          rootReducer,
          composeEnhancers(applyMiddleware(sagaMiddleware, createLogger()))
        ),
        runSaga: sagaMiddleware.run(rootSaga)
      });
      break;
  }
};

export default configureStore;