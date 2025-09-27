import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
	isOpen: boolean;
	mode: "login" | "register";
}

const initialState: ModalState = {
	isOpen: false,
	mode: "login",
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action: { payload: "login" | "register" }) => {
			state.isOpen = true;
			state.mode = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
		toggleMode: (state) => {
			state.mode = state.mode === "login" ? "register" : "login";
		},
	},
});

export const { openModal, closeModal, toggleMode } = modalSlice.actions;
export default modalSlice.reducer;
