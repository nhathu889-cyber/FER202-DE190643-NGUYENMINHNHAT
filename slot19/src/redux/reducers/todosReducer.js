import * as T from '../actionTypes.js';

const initialState = [
  { id: 1, text: 'Học Redux cơ bản', done: true },
  { id: 2, text: 'Làm bài tập Todo', done: false },
];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case T.ADD_TODO:
      return [...state, action.payload];
    case T.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      );
    case T.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );
    case T.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case T.CLEAR_COMPLETED:
      return state.filter((todo) => !todo.done);
    default:
      return state;
  }
}
