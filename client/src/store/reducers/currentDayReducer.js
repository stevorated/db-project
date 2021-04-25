import { FETCH_DAY } from '../actions';

const initialState = {};

export const currentDayReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DAY:
      return payload;
    default:
      return state;
  }
};
