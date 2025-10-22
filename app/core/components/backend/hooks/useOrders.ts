import { useQuery } from "@tanstack/react-query";
import { toastMessageHandler } from "../utils/toast-message-handler";

export interface Order {
	id: string;
	userId: string;
	base?: string;
	desiredLaunchAt?: string;
	offer?: string;
	projectDetails?: string;
	status: "CREATED" | "PENDING_APPROVAL" | "ACCEPTED" | "COMPLETED";
	createdAt: string;
	updatedAt: string;
	user?: {
		id: string;
		displayName?: string;
		email?: string;
	};
}

type OrdersResponse = Order[];

// Хук для обычного пользователя — свои заказы
const fetchOrders = async (): Promise<OrdersResponse> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке заказов" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить заказы");
	}

	const json = await res.json();
	return json;
};

export const useOrders = () => {
	return useQuery<OrdersResponse, Error>({
		queryKey: ["orders"],
		queryFn: fetchOrders,
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});
};

// Хук для админа — все заказы
const fetchAllOrders = async (): Promise<OrdersResponse> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/all`, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке всех заказов" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить все заказы");
	}

	const json = await res.json();
	return json;
};

export const useAllOrders = () => {
	return useQuery<OrdersResponse, Error>({
		queryKey: ["orders", "all"],
		queryFn: fetchAllOrders,
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});
};
