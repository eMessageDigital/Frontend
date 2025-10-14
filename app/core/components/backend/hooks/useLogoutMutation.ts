import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services";
import { toastMessageHandler } from "../utils/toast-message-handler";

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	const router = useRouter();

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authService.logout(),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["profile"] });

			toastMessageHandler("Вы успешно вышли из системы");
			router.push("/");
		},
		onError(error) {
			toastMessageHandler(error);
		},
	});

	return {
		logout,
		isLoadingLogout,
	};
}
