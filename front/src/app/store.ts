import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../store/user/userSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { galleryReducer } from '../store/gallery/gallerySlice.ts';

const userPersistConfig = {
  key: 'gallery:user',
  storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  gallery: galleryReducer
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
