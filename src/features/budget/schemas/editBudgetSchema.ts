import { z } from "zod";

export const editBudgetSchema = z.object({
	name: z
		.string()
		.min(1, "O nome do orçamento é obrigatório.")
		.max(50, "O nome do orçamento deve ter no máximo 50 caracteres."),
	clientName: z
		.string()
		.min(1, "O nome do cliente é obrigatório.")
		.max(100, "O nome do cliente deve ter no máximo 100 caracteres."),
	address: z
		.string()
		.min(1, "O endereço é obrigatório.")
		.max(200, "O endereço deve ter no máximo 200 caracteres."),
});

export type EditBudgetFormData = z.infer<typeof editBudgetSchema>;
