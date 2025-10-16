import { z } from "zod";
import { SubmitFormSchema } from "./submitForm.schema";

export const SimpleSubmitFormSchema = SubmitFormSchema.pick({
	type: true,
	client: true,
	project: true,
}).extend({
	type: z.literal("simple"),
	client: z.object({
		phone: SubmitFormSchema.shape.client.shape.phone,
	}),
	project: z.object({
		description: SubmitFormSchema.shape.project.shape.description,
		base: z.string().min(1, "Тематика обязательна"),
	}),
});

export type SimpleSubmitForm = z.infer<typeof SimpleSubmitFormSchema>;
