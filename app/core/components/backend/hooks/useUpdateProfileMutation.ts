import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeSettingsSchema } from "../features/user/schemas";
import { userService } from "../features/user/services";

export function useUpdateProfileMutation() {
	const queryClient = useQueryClient();

	const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
		mutationFn: (body: TypeSettingsSchema) => userService.updateProfile(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	return { updateProfile, isUpdating };
}
