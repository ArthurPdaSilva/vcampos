import { z } from "zod";

export const saveBudgetSchema = z.object({
	name: z.string().min(1, "O nome do orçamento é obrigatório."),
	clientName: z.string().min(1, "O nome do cliente é obrigatório."),
	address: z.string().min(1, "O endereço é obrigatório."),
});

export type SaveBudgetFormData = z.infer<typeof saveBudgetSchema>;
