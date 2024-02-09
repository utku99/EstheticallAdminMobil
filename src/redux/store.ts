import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["user"]
    // blacklist: ['key3', 'key4'],
};

const rootReducer = combineReducers({
    user: userSlice,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            // immutableCheck: false
        }),
});

export const persistor = persistStore(store);

