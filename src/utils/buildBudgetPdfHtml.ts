import type { BudgetItem } from "../types";
import { formatCurrencyBRL } from "./formatCurrencyBRL";

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

export const buildBudgetPdfHtml = (
	budgetItems: BudgetItem[],
	totalValue: number,
) => {
	const companyAddress = escapeHtml(
		process.env.EXPO_PUBLIC_COMPANY_ADDRESS?.trim() || "Não informado",
	);
	const companyCnpj = escapeHtml(
		process.env.EXPO_PUBLIC_COMPANY_CNPJ?.trim() || "Não informado",
	);
	const companyPhone = escapeHtml(
		process.env.EXPO_PUBLIC_COMPANY_PHONE?.trim() || "Não informado",
	);
	const companyInstagram = escapeHtml(
		process.env.EXPO_PUBLIC_COMPANY_INSTAGRAM?.trim() || "Não informado",
	);

	const rows = budgetItems
		.map((item) => {
			const description = item.description?.trim()
				? escapeHtml(item.description)
				: "Item sem descrição";

			return `
				<tr>
					<td>${item.quantity}</td>
					<td>${description}</td>
					<td>${formatCurrencyBRL(item.value)}</td>
					<td>${formatCurrencyBRL(item.finalValue)}</td>
				</tr>
			`;
		})
		.join("");

	return `
		<!DOCTYPE html>
		<html lang="pt-BR">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Orçamento Vidraçaria</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					margin: 0;
					padding: 0;
				}

				.container {
					width: 95%;
					margin: 16px auto;
					padding: 20px;
					border: 2px solid black;
					box-sizing: border-box;
				}

				header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					gap: 24px;
				}

				.logo-area h1 {
					margin: 0;
					font-size: 24px;
					font-weight: bold;
					text-transform: uppercase;
				}

				.company-info p {
					margin: 2px 0;
					border-bottom: 2px solid #00d2ff;
					width: 280px;
				}

				.section-title {
					text-align: center;
					font-weight: bold;
					margin: 20px 0 10px;
					font-size: 18px;
				}

				.info-table,
				.products-table {
					width: 100%;
					border-collapse: collapse;
				}

				.info-table td {
					padding: 6px;
					border-bottom: 2px solid #00d2ff;
				}

				.products-table th {
					background-color: #00d2ff;
					border: 1px solid black;
					padding: 8px;
					text-align: center;
				}

				.products-table td {
					height: 28px;
					border: 1px solid black;
					padding: 6px;
				}

				.products-table tfoot td {
					font-weight: bold;
				}

				.total-label {
					background-color: #00d2ff;
					text-align: right;
				}

				.signature {
					margin-top: 40px;
				}

				.signature p {
					margin-bottom: 10px;
				}

				.signature-line {
					width: 100%;
					height: 1px;
					background: black;
					margin: 15px 0;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<header>
					<div class="logo-area">
						<h1>ORÇAMENTO VIDRAÇARIA CAMPOS</h1>
					</div>

					<div class="company-info">
						<p><strong>Endereço:</strong> ${companyAddress}</p>
						<p><strong>CNPJ:</strong> ${companyCnpj}</p>
						<p><strong>Telefone:</strong> ${companyPhone}</p>
						<p><strong>Instagram:</strong> ${companyInstagram}</p>
					</div>
				</header>

				<section class="section-title">Dados do Cliente</section>

				<table class="info-table">
					<tr>
						<td><strong>Nome:</strong></td>
						<td></td>
					</tr>
					<tr>
						<td><strong>Telefone:</strong></td>
						<td></td>
					</tr>
					<tr>
						<td><strong>CPF/CNPJ:</strong></td>
						<td></td>
					</tr>
					<tr>
						<td><strong>Endereço:</strong></td>
						<td></td>
					</tr>
				</table>

				<section class="section-title">Relação de produtos</section>

				<table class="products-table">
					<thead>
						<tr>
							<th>Quantidade</th>
							<th>Descrição</th>
							<th>Valor</th>
							<th>Valor Final</th>
						</tr>
					</thead>
					<tbody>
						${rows}
					</tbody>
					<tfoot>
						<tr>
							<td colspan="2"></td>
							<td class="total-label">Total</td>
							<td>${formatCurrencyBRL(totalValue)}</td>
						</tr>
					</tfoot>
				</table>

				<div class="signature">
					<p>Assinatura do Recebedor</p>
					<div class="signature-line"></div>
					<div class="signature-line"></div>
				</div>
			</div>
		</body>
		</html>
	`;
};
