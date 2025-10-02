import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
	id: string;
	date: string;
	status: string;
	total: number;
	reach: number;
	leads: number;
	ctr: number;
	conversion: number;
	contractorIds: string[];
}

interface OrdersState {
	orders: Order[];
}

const initialState: OrdersState = {
	orders: [
		{
			id: "001",
			date: "2025-09-29",
			status: "В обработке",
			total: 3500,
			reach: 12000,
			leads: 45,
			ctr: 3.2,
			conversion: 4.5,
			contractorIds: ["c1"],
		},
		{
			id: "002",
			date: "2025-09-28",
			status: "Выполнен",
			total: 1200,
			reach: 8000,
			leads: 20,
			ctr: 2.5,
			conversion: 3.0,
			contractorIds: ["c2"],
		},
	],
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		addOrder: (state, action: PayloadAction<Order>) => {
			state.orders.push(action.payload);
		},
		cancelOrder: (state, action: PayloadAction<string>) => {
			const order = state.orders.find((o) => o.id === action.payload);
			if (order) order.status = "Отменён";
		},
	},
});

export const { addOrder, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
