// store/slices/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
	files: File[];
	name: string;
	phone: string;
	telegram: string;
	company: string;
	baseInfo: string;
	offer: string;
	description: string;
	selectedServices: string[];
	launchTime: string;
}

const initialState: FormState = {
	files: [],
	name: "",
	phone: "",
	telegram: "",
	company: "",
	baseInfo: "",
	offer: "",
	description: "",
	selectedServices: [],
	launchTime: "",
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		addFiles: (state, action: PayloadAction<File[]>) => {
			state.files = [...state.files, ...action.payload];
		},
		removeFiles: (state, action: PayloadAction<number>) => {
			state.files = state.files.filter((_, i) => i !== action.payload);
		},
		clearFiles: (state) => {
			state.files = [];
		},
		updateField: (state, action: PayloadAction<{ field: keyof FormState; value: any }>) => {
			state[action.payload.field] = action.payload.value;
		},
		updateSelectedServices: (state, action: PayloadAction<string[]>) => {
			state.selectedServices = action.payload;
		},
		clearForm: () => initialState,
	},
});

export const { addFiles, removeFiles, clearFiles, updateField, updateSelectedServices, clearForm } =
	formSlice.actions;
export default formSlice.reducer;
