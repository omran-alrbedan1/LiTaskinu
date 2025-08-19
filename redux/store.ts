import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer from './features/auth/auth-slice';

export const store = configureStore({
    reducer: {
        auth:authReducer,
    }
});

// Infer the type of the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
