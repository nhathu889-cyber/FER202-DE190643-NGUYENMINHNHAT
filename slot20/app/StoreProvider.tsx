'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { hydrate } from '@/lib/actions';
import { loadState, saveState, selectPersisted } from '@/lib/persist';
import { makeStore, type AppStore } from '@/lib/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current === null) storeRef.current = makeStore();

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    const savedState = loadState();
    if (savedState) store.dispatch(hydrate(savedState));
    const unsubscribe = store.subscribe(() => {
      saveState(selectPersisted(store.getState()));
    });
    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
