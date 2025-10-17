import React from "react";
import { Users } from "../../core/components";

const users = [
	{
		id: 1,
		firstName: "Иван",
		lastName: "Иванов",
		email: "ivan@example.com",
		phone: "+7 999 123-45-67",
		ordersCount: 12,
	},
	{
		id: 2,
		firstName: "Мария",
		lastName: "Петрова",
		email: "maria@example.com",
		phone: "+7 999 987-65-43",
		ordersCount: 5,
	},
];

export default function page() {
	return <Users users={users} />;
}
