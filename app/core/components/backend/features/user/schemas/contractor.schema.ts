import { z } from "zod";

export const ContractorSchema = z.object({
	name: z.string().min(2, { message: "Введите название организации" }),
	inn: z
		.string()
		.min(10, { message: "ИНН должен содержать минимум 10 цифр" })
		.max(12, { message: "ИНН не может быть длиннее 12 цифр" }),
	kpp: z
		.string()
		.min(9, { message: "КПП должен содержать 9 цифр" })
		.max(9, { message: "КПП должен содержать 9 цифр" })
		.optional()
		.or(z.literal("")),
	ogrn: z
		.string()
		.min(13, { message: "ОГРН/ОГРНИП должен содержать минимум 13 цифр" })
		.max(15, { message: "ОГРН/ОГРНИП не может быть длиннее 15 цифр" })
		.optional()
		.or(z.literal("")),
});

export type TypeContractorSchema = z.infer<typeof ContractorSchema>;
