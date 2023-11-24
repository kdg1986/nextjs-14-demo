import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {createMigrate, persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import migrations from "./migrations";
import local from "./store-local";

const VERSION = 0;

/** local Storage config */
const localPersistConfig = {
	key: `$$LOCAL`,
	version: VERSION,
	storage,
	whitelist: ["localDataStore"],
	migrate: createMigrate(migrations, {debug: true}),
};

const rootReducer = combineReducers({
	// partnersStore: storePartners,
	// goodsFilterStore: storeFilter,
	localDataStore: local,
});

const persistedReducer = persistReducer(localPersistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	// devTools: ["development", "local"].indexOf(publicRuntimeConfig.RUNTIME_ENV) > -1,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Define Typed Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;
