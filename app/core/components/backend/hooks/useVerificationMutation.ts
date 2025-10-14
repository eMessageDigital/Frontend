import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verificationService } from "../services";
import { toastMessageHandler } from "../utils/toast-message-handler";

export function useVerificationMutation() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate: verification } = useMutation({
		mutationKey: ["new verification"],
		mutationFn: (token: string | null) => verificationService.newVerification(token),
		onSuccess() {
			toastMessageHandler("Почта успешно подтверждена"),
				queryClient.invalidateQueries({ queryKey: ["profile"] });

			router.push("/dashboard/profile");
		},
		onError() {
			router.push("/");
		},
	});

	return { verification };
}
