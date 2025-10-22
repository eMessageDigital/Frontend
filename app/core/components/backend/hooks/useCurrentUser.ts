"use client";

import { useQuery } from "@tanstack/react-query";
import { toastMessageHandler } from "../utils/toast-message-handler";

export interface CurrentUser {
	id: string;
	email: string;
	displayName?: string;
	role: "REGULAR" | "ADMIN";
}

export const fetchCurrentUser = async (): Promise<CurrentUser> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
		credentials: "include",
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: "Не удалось получить пользователя" }));
		toastMessageHandler(error.message);
		throw new Error(error.message || "Не удалось получить пользователя");
	}

	return res.json();
};

export const useCurrentUser = () => {
	return useQuery<CurrentUser, Error>({
		queryKey: ["currentUser"],
		queryFn: fetchCurrentUser,
		staleTime: 1000 * 60 * 5,
	});
};
