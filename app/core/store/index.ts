import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./slices/serviceSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
	reducer: {
		service: serviceReducer,
		modal: modalReducer,
	},
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
