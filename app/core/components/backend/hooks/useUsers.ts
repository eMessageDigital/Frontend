import { useQuery } from "@tanstack/react-query";
import { toastMessageHandler } from "../utils/toast-message-handler";

export interface User {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	phone?: string;
	ordersCount: number;
	role: string;
}

export interface UsersResponse {
	data: User[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

interface UseUsersParams {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: "createdAt" | "ordersCount";
	order?: "asc" | "desc";
	role?: string;
}

const fetchUsers = async ({
	page = 1,
	limit = 10,
	search = "",
	sortBy = "createdAt",
	order = "desc",
	role = "",
}: UseUsersParams): Promise<UsersResponse> => {
	const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
	url.searchParams.append("page", page.toString());
	url.searchParams.append("limit", limit.toString());
	url.searchParams.append("sortBy", sortBy);
	url.searchParams.append("order", order);
	if (search) url.searchParams.append("search", search);
	if (role) url.searchParams.append("role", role);

	const res = await fetch(url.toString(), { credentials: "include" });

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Ошибка при загрузке пользователей" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось загрузить пользователей");
	}

	const json = await res.json();

	return {
		...json,
		data: json.data.map((user: any) => ({
			id: user.id,
			firstName: user.displayName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			ordersCount: user.ordersCount,
			role: user.role,
		})),
	};
};

export const useUsers = ({
	page = 1,
	limit = 10,
	search = "",
	sortBy = "createdAt",
	order = "desc",
	role = "",
}: UseUsersParams = {}) => {
	return useQuery<UsersResponse, Error>({
		queryKey: ["users", page, limit, search, sortBy, order, role],
		queryFn: () => fetchUsers({ page, limit, search, sortBy, order, role }),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		placeholderData: (prev) => prev,
	});
};
