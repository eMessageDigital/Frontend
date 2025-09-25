import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./serviceSlice";

export const store = configureStore({
	reducer: {
		service: serviceReducer,
	},
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
