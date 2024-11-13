// app/providers/ReduxProvider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { initializeAuth } from './features/authSlice';

function StoreInitializer() {
    useEffect(() => {
        store.dispatch(initializeAuth());
    }, []);

    return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <StoreInitializer />
            {children}
        </Provider>
    );
}