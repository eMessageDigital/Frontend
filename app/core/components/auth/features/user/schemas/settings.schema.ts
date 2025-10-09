import { z } from "zod";

export const SettingsSchema = z.object({
	name: z.string().min(2, {
		message: "Введите имя",
	}),
	lastName: z.string().optional(),
	email: z.string().email({
		message: "Некорректная почта",
	}),
	phone: z
		.string()
		.optional()
		.refine(
			(value) =>
				!value || /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(value),
			{ message: "Некорректный номер телефона" }
		),
});

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>;
