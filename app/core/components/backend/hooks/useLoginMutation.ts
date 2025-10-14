import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services";
import { TypeLoginSchema } from "../schemas";
import { toastMessageHandler } from "../utils/toast-message-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/slices/modalSlice";

export function useLoginMutation() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ["login user"],
		mutationFn: ({ values, recaptcha }: { values: TypeLoginSchema; recaptcha: string }) =>
			authService.login(values, recaptcha),
		onSuccess(user) {
			queryClient.setQueryData(["profile"], user);
			queryClient.invalidateQueries({ queryKey: ["profile"] });

			toast.success("Успешная авторизация");
			dispatch(closeModal());

			router.push("/dashboard");
		},
		onError(error) {
			toastMessageHandler(error);
		},
	});

	return { login, isLoadingLogin };
}
