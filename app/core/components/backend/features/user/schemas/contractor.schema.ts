import { z } from "zod";

export const ContractorSchema = z.object({
	name: z.string().min(2, { message: "Введите название организации" }),
	inn: z
		.string()
		.trim()
		.min(10, { message: "ИНН должен содержать минимум 10 цифр" })
		.max(12, { message: "ИНН не может быть длиннее 12 цифр" })
		.regex(/^\d+$/, { message: "ИНН должен содержать только цифры" }),
	kpp: z
		.string()
		.trim()
		.min(9, { message: "КПП должен содержать 9 цифр" })
		.max(9, { message: "КПП должен содержать 9 цифр" })
		.regex(/^\d+$/, { message: "КПП должен содержать только цифры" }),
	ogrn: z
		.string()
		.trim()
		.min(13, { message: "ОГРН/ОГРНИП должен содержать минимум 13 цифр" })
		.max(15, { message: "ОГРН/ОГРНИП не может быть длиннее 15 цифр" })
		.regex(/^\d+$/, { message: "ОГРН/ОГРНИП должен содержать только цифры" }),
});

export type TypeContractorSchema = z.infer<typeof ContractorSchema>;
