import { SET_FILTER } from '../actionTypes.js';

const VALID_FILTERS = new Set(['all', 'active', 'done']);

export default function filterReducer(state = 'all', action) {
  if (action.type === SET_FILTER && VALID_FILTERS.has(action.payload)) {
    return action.payload;
  }

  return state;
}
