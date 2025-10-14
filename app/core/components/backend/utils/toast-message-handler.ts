import { toast } from "sonner";

type ToastMessageInput = {
	message?: string;
	description?: string;
	status?: "success" | "error" | "info";
};

export function toastMessageHandler(data: ToastMessageInput | Error | string) {
	let message = "Что-то пошло не так";
	let description: string | undefined;
	let status: "success" | "error" | "info" = "error";

	if (typeof data === "string") {
		message = data;
		status = "success";
	} else if (data instanceof Error) {
		message = data.message || message;
		status = "error";
	} else if (typeof data === "object" && data !== null) {
		message = data.message || message;
		description = data.description;
		status = data.status || "success";
	}

	const firstDotIndex = message.indexOf(".");
	if (!description && firstDotIndex !== -1) {
		description = message.slice(firstDotIndex + 1).trim();
		message = message.slice(0, firstDotIndex);
	}

	switch (status) {
		case "success":
			toast.success(message, { description });
			break;
		case "info":
			toast(message, { description });
			break;
		default:
			toast.error(message, { description });
			break;
	}
}
