import { z } from "zod";

export const SubmitFormSchema = z.object({
	type: z.enum(["simple", "full"]),
	client: z.object({
		name: z.string().min(1, "Имя обязательно"),
		email: z
			.string()
			.min(1, "Email обязателен")
			.email("Некорректный email"),
		phone: z.string().min(1, "Телефон обязателен"),
		telegram: z.string().min(1, "Поле «Где с вами связаться?» обязательно"),
		company: z.string().min(1, "Компания обязательна"),
	}),
	project: z.object({
		base: z.string().min(1, "База обязательна"),
		offer: z.string().min(1, "Оффер обязателен"),
		launchTime: z.string().min(1, "Время запуска обязательно"),
		description: z.string().min(1, "Описание проекта обязательно"),
	}),
	extraServices: z.array(z.string()).optional(),
});

export type TypeSubmitForm = z.infer<typeof SubmitFormSchema>;
