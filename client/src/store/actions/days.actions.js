export const FETCH_DAY = 'FETCH_DAY';

export function fetchCurrentDay(payload) {
  return {
    type: FETCH_DAY,
    payload,
  };
}
