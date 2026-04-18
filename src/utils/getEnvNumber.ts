export const getEnvNumber = (value: string | undefined, fallback: number) => {
	const parsed = Number.parseFloat(value ?? "");

	return Number.isFinite(parsed) ? parsed : fallback;
};
