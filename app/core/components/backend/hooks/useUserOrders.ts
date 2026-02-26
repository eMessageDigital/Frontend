import { useQuery } from "@tanstack/react-query";
import { toastMessageHandler } from "../utils/toast-message-handler";
import type { Order } from "./useOrders";

type OrdersResponse = Order[];

const fetchUserOrders = async (
	userId: string,
	sortBy: "createdAt" | "updatedAt" = "createdAt",
	order: "asc" | "desc" = "desc"
): Promise<OrdersResponse> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/by-user/${userId}?sortBy=${sortBy}&order=${order}`,
		{ method: "GET", credentials: "include" }
	);

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке заказов пользователя" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить заказы пользователя");
	}

	return res.json();
};

export const useUserOrders = ({
	userId,
	sortBy = "createdAt",
	order = "desc",
}: {
	userId: string;
	sortBy?: "createdAt" | "updatedAt";
	order?: "asc" | "desc";
}) => {
	return useQuery({
		queryKey: ["orders", "by-user", userId, sortBy, order] as const,
		queryFn: () => fetchUserOrders(userId, sortBy, order),
		enabled: Boolean(userId),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};
