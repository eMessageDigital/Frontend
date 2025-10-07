import { z } from "zod";

export const LoginSchema = z.object({
	name: z.string().min(2, {
		message: "Введите имя",
	}),
	email: z.string().email({
		message: "Некорректная почта",
	}),
});

export type TypeSettingsSchema = z.infer<typeof LoginSchema>;
