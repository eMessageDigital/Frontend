import { configureStore } from "@reduxjs/toolkit";
import {
	serviceReducer,
	modalReducer,
	authReducer,
	formReducer,
	profileReducer,
	orderReducer,
} from "./slices/index";

export const store = configureStore({
	reducer: {
		service: serviceReducer,
		modal: modalReducer,
		auth: authReducer,
		form: formReducer,
		profile: profileReducer,
		orders: orderReducer,
	},
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
