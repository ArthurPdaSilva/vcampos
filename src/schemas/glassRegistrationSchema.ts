import { z } from "zod";

export const glassRegistrationSchema = z.object({
	name: z.string().trim().min(1, "Preencha todos os campos"),
	price: z
		.string()
		.trim()
		.min(1, "Preencha todos os campos")
		.refine((value) => !Number.isNaN(Number.parseFloat(value)), {
			message: "Preço deve ser um número válido",
		})
		.refine((value) => Number.parseFloat(value) > 0, {
			message: "Preço deve ser maior que zero",
		}),
});

export type GlassRegistrationFormData = z.infer<typeof glassRegistrationSchema>;
