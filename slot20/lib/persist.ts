import type { RootState } from './store';
import type { Theme } from './features/ui/uiSlice';
import type { TodosState } from './features/todos/todosSlice';
import type { CartState } from './features/cart/cartSlice';

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
  cart?: CartState;
};

const KEY = 'slot20-state';

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme, todos: state.todos, cart: state.cart };
}

function isPersistedState(value: unknown): value is PersistedState {
  if (typeof value !== 'object' || value === null) return false;
  const state = value as Record<string, unknown>;
  const validTheme = state.theme === undefined || state.theme === 'light' || state.theme === 'dark';
  const validTodos =
    state.todos === undefined ||
    (typeof state.todos === 'object' &&
      state.todos !== null &&
      Array.isArray((state.todos as { items?: unknown }).items) &&
      ['all', 'active', 'done'].includes((state.todos as { filter?: string }).filter ?? ''));
  const validCart =
    state.cart === undefined ||
    (typeof state.cart === 'object' &&
      state.cart !== null &&
      Array.isArray((state.cart as { items?: unknown }).items));
  return validTheme && validTodos && validCart;
}

export function loadState(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    return isPersistedState(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage may be disabled or full; the in-memory Redux state still works.
  }
}
