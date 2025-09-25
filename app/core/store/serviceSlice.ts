import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceKey } from "../data/services";

type ServiceState = {
	selected: ServiceKey | null;
};

const initialState: ServiceState = {
	selected: null,
};

const serviceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {
		setService: (state, action: PayloadAction<ServiceKey>) => {
			state.selected = action.payload;
		},
	},
});

export const { setService } = serviceSlice.actions;
export default serviceSlice.reducer;
