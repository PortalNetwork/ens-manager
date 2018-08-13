import { combineReducers } from 'redux';
import count from './counterReducer';
import system from './systemReducer';
import isFetching from './fetchingReducer';
import health from './healthReducer';
import warning from './warningReducer';
import metaMask from './metaMaskReducer';

const appReducer = combineReducers({
  count,
  system,
  isFetching,
  health,
  warning,
  metaMask
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
