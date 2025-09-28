import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
	files: File[];
}

const initialState: FormState = {
	files: [],
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
	},
});

export const { addFiles, removeFiles, clearFiles } = formSlice.actions;
export default formSlice.reducer;
