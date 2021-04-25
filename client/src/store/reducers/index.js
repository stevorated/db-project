import { combineReducers } from 'redux';
import { currentDayReducer } from './currentDayReducer';
import { fetchCurrentDay } from '../actions';

export const rootReducer = combineReducers({
  current: currentDayReducer,
});

export function mapStateToProps({ current }) {
  return ({ current });
}
export function mapDispatchToProps(dispatch) {
  return ({
    fetchCurrentDispatch: (payload) => dispatch(fetchCurrentDay(payload)),
  });
}
