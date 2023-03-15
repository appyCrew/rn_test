import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './../redux/index';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [thunk, logger];
} else {
  middleware = [thunk];
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
});
let persistor = persistStore(store);

export {store, persistor};
