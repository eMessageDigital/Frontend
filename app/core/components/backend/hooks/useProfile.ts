import { useQuery } from "@tanstack/react-query";
import { userService } from "../features/user/services";

export function useProfile() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["profile"],
		queryFn: () => userService.findProfile(),
		retry: false,
	});

	const user = isError ? undefined : data;

	return {
		user,
		isLoading,
	};
}
