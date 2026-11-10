export const selectTodos = (state) => state.todos;
export const selectFilter = (state) => state.filter;
export const selectRemaining = (state) =>
  state.todos.filter((todo) => !todo.done).length;
