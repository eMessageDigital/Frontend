// store/slices/profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PersonalInfo = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
};

type Contractor = {
	id: string;
	inn: string;
	kpp: string;
	ogrn: string;
	name: string;
};

type ProfileState = {
	personalInfo: PersonalInfo;
	contractors: Contractor[];
};

const initialState: ProfileState = {
	personalInfo: {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	},
	contractors: [],
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
			state.personalInfo = { ...state.personalInfo, ...action.payload };
		},
		addContractor: (state, action: PayloadAction<Contractor>) => {
			state.contractors.push(action.payload);
		},
		updateContractor: (state, action: PayloadAction<Contractor>) => {
			const index = state.contractors.findIndex((c) => c.id === action.payload.id);
			if (index !== -1) {
				state.contractors[index] = action.payload;
			}
		},
		removeContractor: (state, action: PayloadAction<string>) => {
			state.contractors = state.contractors.filter((c) => c.id !== action.payload);
		},
	},
});

export const { updatePersonalInfo, addContractor, updateContractor, removeContractor } =
	profileSlice.actions;

export default profileSlice.reducer;
