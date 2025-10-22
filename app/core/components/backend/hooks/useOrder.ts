"use client";

import { useQuery } from "@tanstack/react-query";
import { toastMessageHandler } from "../utils/toast-message-handler";

export interface Order {
	id: string;
	userId: string;
	base?: string;
	desiredLaunchAt?: string;
	offer?: string;
	projectDetails?: string;
	status: "CREATED" | "PENDING_APPROVAL" | "ACCEPTED" | "COMPLETED" | string;
	reach?: number;
	ctr?: number;
	conversion?: number;
	contractorIds?: string[];
	createdAt: string;
	updatedAt: string;
	user?: {
		id: string;
		displayName?: string;
		email?: string;
	};
}

export const fetchOrderById = async (id: string): Promise<Order> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${id}`, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке заказа" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить заказ");
	}

	const json = await res.json();
	return json;
};

export const useOrder = (id: string) => {
	return useQuery<Order, Error>({
		queryKey: ["order", id],
		queryFn: () => fetchOrderById(id),
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});
};
