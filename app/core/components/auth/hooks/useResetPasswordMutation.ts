import { useMutation } from "@tanstack/react-query";
import { TypeResetPasswordSchema } from "../schemas";
import { passwordRecoveryService } from "../services";
import { toastMessageHandler } from "../utils/toast-message-handler";

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ["reest password"],
		mutationFn: ({ values, recaptcha }: { values: TypeResetPasswordSchema; recaptcha: string }) =>
			passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toastMessageHandler(
				"Проверьте почту! На вашу почту была отправлена ссылка для подтверждения."
			);
		},
		onError(error) {
			toastMessageHandler(error);
		},
	});

	return { reset, isLoadingReset };
}
