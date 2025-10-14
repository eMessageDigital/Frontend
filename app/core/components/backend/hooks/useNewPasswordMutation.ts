import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeNewPasswordSchema } from "../schemas";
import { passwordRecoveryService } from "../services";
import { toastMessageHandler } from "../utils/toast-message-handler";
import { useRouter, useSearchParams } from "next/navigation";

export function useNewPasswordMutation() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ["reset password"],
		mutationFn: ({ values, recaptcha }: { values: TypeNewPasswordSchema; recaptcha: string }) =>
			passwordRecoveryService.newpass(values, token, recaptcha),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["user"] });

			toastMessageHandler("Пароль успешно изменён!");
			router.push("/dashboard/profile");
		},
		onError(error) {
			toastMessageHandler(error);
		},
	});

	return { newPassword, isLoadingNew };
}
