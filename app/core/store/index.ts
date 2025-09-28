import { configureStore } from "@reduxjs/toolkit";
import { serviceReducer, modalReducer, authReducer, formReducer } from "./slices/index";

export const store = configureStore({
	reducer: {
		service: serviceReducer,
		modal: modalReducer,
		auth: authReducer,
		form: formReducer,
	},
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
