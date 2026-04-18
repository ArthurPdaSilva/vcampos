import { z } from "zod";

const positiveNumericField = z
	.string()
	.trim()
	.min(1, "Altura e largura devem ser números válidos")
	.refine((value: string) => !Number.isNaN(Number.parseFloat(value)), {
		message: "Altura e largura devem ser números válidos",
	})
	.refine((value: string) => Number.parseFloat(value) > 0, {
		message: "Altura e largura devem ser maiores que zero",
	});

export const glassCalculationSchema = z.object({
	height: positiveNumericField,
	width: positiveNumericField,
});

export type GlassCalculationFormData = z.infer<typeof glassCalculationSchema>;
