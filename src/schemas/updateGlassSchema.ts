import { z } from "zod";

export const updateGlassSchema = z.object({
	name: z.string().trim().min(1, "Preencha nome e preço"),
	price: z
		.string()
		.trim()
		.min(1, "Preencha nome e preço")
		.refine((value) => !Number.isNaN(Number.parseFloat(value)), {
			message: "Preço deve ser um número válido",
		})
		.refine((value) => Number.parseFloat(value) > 0, {
			message: "Preço deve ser maior que zero",
		}),
});

export type UpdateGlassFormData = z.infer<typeof updateGlassSchema>;
