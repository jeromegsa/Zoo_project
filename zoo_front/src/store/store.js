import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import registerReducer from "../features/register/RegisterSlice"
import  especeReducer from "../features/espece/EspeceSlice"
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
      register: registerReducer,
      especes: especeReducer
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(authMiddleware),
  });