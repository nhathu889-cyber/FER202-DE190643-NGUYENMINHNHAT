import { createSelector, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';
import type { Todo, TodoFilter } from '@/types';

export type TodosState = {
  items: Todo[];
  filter: TodoFilter;
};

const initialState: TodosState = { items: [], filter: 'all' };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.unshift(action.payload);
      },
      prepare(text: string) {
        return {
          payload: { id: nanoid(), text: text.trim(), done: false, createdAt: new Date().toISOString() },
        };
      },
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
    todoEdited(state, action: PayloadAction<{ id: string; text: string }>) {
      const todo = state.items.find((item) => item.id === action.payload.id);
      if (todo) todo.text = action.payload.text.trim();
    },
    todoRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    allToggled(state) {
      const allDone = state.items.length > 0 && state.items.every((item) => item.done);
      state.items.forEach((item) => {
        item.done = !allDone;
      });
    },
    completedCleared(state) {
      state.items = state.items.filter((item) => !item.done);
    },
    filterChanged(state, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.todos) return action.payload.todos;
    });
  },
});

export const {
  todoAdded,
  todoToggled,
  todoEdited,
  todoRemoved,
  allToggled,
  completedCleared,
  filterChanged,
} = todosSlice.actions;

export default todosSlice.reducer;

const FILTER_FN: Record<TodoFilter, (todo: Todo) => boolean> = {
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
};

export const selectTodos = (state: RootState) => state.todos.items;
export const selectTodoFilter = (state: RootState) => state.todos.filter;

export const selectVisibleTodos = createSelector([selectTodos, selectTodoFilter], (items, filter) =>
  items.filter(FILTER_FN[filter])
);

export const selectTodoStats = createSelector([selectTodos], (items) => {
  const done = items.filter((todo) => todo.done).length;
  return {
    total: items.length,
    done,
    active: items.length - done,
    percent: items.length ? Math.round((done / items.length) * 100) : 0,
  };
});
