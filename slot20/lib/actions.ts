import { createAction } from '@reduxjs/toolkit';
import type { PersistedState } from './persist';

export const hydrate = createAction<PersistedState>('app/hydrate');
