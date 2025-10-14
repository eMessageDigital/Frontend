import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contractorService, IContractor } from "../features/user/services/contractor.service";

export function useContractors() {
	return useQuery<IContractor[], Error>({
		queryKey: ["contractors"],
		queryFn: () => contractorService.getContractors(),
		retry: false,
	});
}

export function useCreateContractorMutation() {
	const queryClient = useQueryClient();

	const { mutate: createContractor, isPending: isCreating } = useMutation<
		IContractor,
		Error,
		Partial<IContractor>
	>({
		mutationKey: ["create contractor"],
		mutationFn: (body) => contractorService.createContractor(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contractors"] }),
	});

	return { createContractor, isCreating };
}

export function useUpdateContractorMutation() {
	const queryClient = useQueryClient();

	const { mutate: updateContractor, isPending: isUpdating } = useMutation<
		IContractor,
		Error,
		{ id: string; body: Partial<IContractor> }
	>({
		mutationKey: ["update contractor"],
		mutationFn: ({ id, body }) => contractorService.updateContractor(id, body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contractors"] }),
	});

	return { updateContractor, isUpdating };
}

export function useDeleteContractorMutation() {
	const queryClient = useQueryClient();

	const { mutate: deleteContractor, isPending: isDeleting } = useMutation<
		{ id: string },
		Error,
		string
	>({
		mutationKey: ["delete contractor"],
		mutationFn: (id) => contractorService.deleteContractor(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contractors"] }),
	});

	return { deleteContractor, isDeleting };
}
