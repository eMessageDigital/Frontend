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

const fetchOrders = async (
	sortBy: "createdAt" | "updatedAt" = "createdAt",
	order: "asc" | "desc" = "desc"
): Promise<OrdersResponse> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/orders?sortBy=${sortBy}&order=${order}`,
		{ method: "GET", credentials: "include" }
	);

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке заказов" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить заказы");
	}

	return res.json();
};

export const useOrders = ({
	sortBy = "createdAt",
	order = "desc",
}: {
	sortBy?: "createdAt" | "updatedAt";
	order?: "asc" | "desc";
} = {}) => {
	return useQuery({
		queryKey: ["orders", sortBy, order] as const, // 👈 as const важно
		queryFn: () => fetchOrders(sortBy, order),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};

// === Для админа ===
const fetchAllOrders = async (
	sortBy: "createdAt" | "updatedAt" = "createdAt",
	order: "asc" | "desc" = "desc"
): Promise<OrdersResponse> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/all?sortBy=${sortBy}&order=${order}`,
		{ method: "GET", credentials: "include" }
	);

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке всех заказов" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить все заказы");
	}

	return res.json();
};

export const useAllOrders = ({
	sortBy = "createdAt",
	order = "desc",
}: {
	sortBy?: "createdAt" | "updatedAt";
	order?: "asc" | "desc";
} = {}) => {
	return useQuery({
		queryKey: ["orders", "all", sortBy, order] as const,
		queryFn: () => fetchAllOrders(sortBy, order),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};
