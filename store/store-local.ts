import {createSlice} from "@reduxjs/toolkit";

// export type LocalDataPayload<T> = {key: string; value: T};
export interface localStorageStore {
	autoLogin: boolean;
}

const initialState = {
	data: {
		autoLogin: false,
	} as localStorageStore,
};

const sliceStore = createSlice({
	name: "localStore",
	initialState,
	reducers: {
		setAutoLogin: (state, action: {payload: boolean}) => {
			state.data.autoLogin = action.payload;
		},
	},
});

export const {setAutoLogin} = sliceStore.actions;
export default sliceStore.reducer;
