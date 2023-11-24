import {createSlice} from "@reduxjs/toolkit";

export type LocalDataPayload<T> = {key: string; value: T};

const initialState = {
	data: {
		autoLogin: false,
	} as Record<string, any>,
};

const sliceStore = createSlice({
	name: "localStore",
	initialState,
	reducers: {
		setData: (state, action: {payload: LocalDataPayload<any>}) => {
			const {payload} = action;
			console.log(payload);
			state.data.autoLogin = payload;
			// state.data[payload.key] = payload.value;
		},
	},
});

export const {setData} = sliceStore.actions;
export default sliceStore.reducer;
