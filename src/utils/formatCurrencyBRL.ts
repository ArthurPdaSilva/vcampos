export const formatCurrencyBRL = (value: number) => {
	if (!Number.isFinite(value)) return "R$ 0,00";

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};
