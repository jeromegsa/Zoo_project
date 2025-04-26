import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import registerReducer from "../features/user/UserSlice"
import  especeReducer from "../features/espece/EspeceSlice"
import annonceReducer  from "../features/annonce/AnnonceSlice"
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
      especes: especeReducer,
      annonces: annonceReducer
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(authMiddleware),
  });