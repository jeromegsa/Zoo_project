import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'


const authMiddleware = store => next => action => {
    // Si l'action contient notre flag
    if (action.meta?.triggerFetchUser) {
        store.dispatch(fetchCurrentUser());
    }
    return next(action);
};
export const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(authMiddleware),
  });