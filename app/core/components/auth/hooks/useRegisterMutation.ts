import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import { TypeRegisterSchema } from "../schemas";
import { toastMessageHandler } from "../utils/toast-message-handler";

export function useRegisterMutation() {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ["register user"],
		mutationFn: ({ values, recaptcha }: { values: TypeRegisterSchema; recaptcha: string }) =>
			authService.register(values, recaptcha),
		onSuccess(data: any) {
			toastMessageHandler(data);
		},
		onError(error) {
			toastMessageHandler(error);
		},
	});

	return { register, isLoadingRegister };
}
