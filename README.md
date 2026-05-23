# VCampos - Sistema de Vidraçaria

Aplicativo mobile em React Native (Expo) criado para apoiar a operação da vidraçaria VCampos.

O objetivo do projeto é centralizar o cadastro de vidros, facilitar o cálculo de preços para medidas personalizadas e manter um estoque simples salvo localmente no celular.

## Visão Geral

O app possui 4 abas principais:

- Cálculo: calcula preço final de vidros com base em altura, largura, tipo e regras de negócio.
- Cadastro: cadastra novos tipos/modelos de vidro com nome, tipo e preço.
- Estoque: lista os vidros cadastrados e permite editar ou apagar itens.
- Orçamento: permite criar novos orçamentos, salvar histórico de propostas, listar orçamentos salvos e gerar PDF para compartilhamento com o cliente.

## Funcionalidades

- Cadastro de vidro com validação de campos:
  - Nome obrigatório
  - Preço numérico e maior que zero
- Edição de vidro no estoque:
  - Atualização de nome e preço
  - Validação de nome obrigatório
  - Validação de preço numérico e maior que zero
- Classificação por tipo de vidro:
  - Temperado
  - Comum
- Cálculo de preço final por medida (altura e largura)
- Exibição opcional de detalhes do cálculo (ocultar/mostrar)
- Adição de itens ao orçamento a partir da tela de Cálculo
- Gerenciamento do orçamento:
  - Atualização de quantidade e descrição dos itens
  - Remoção de itens
  - Cálculo automático do valor total com descontos
  - Opção para salvar a proposta (com nome do orçamento, cliente e endereço)
  - Listagem do histórico de orçamentos salvos (com exclusão e geração de PDF)
- Geração de orçamento em PDF
- Compartilhamento do PDF (quando disponível no dispositivo)
- Validação de formulários com React Hook Form + Zod
- Schemas separados por formulário para centralizar regras de validação
- Persistência local com AsyncStorage (dados continuam salvos após fechar o app)
- Exibição de moeda no padrão brasileiro (pt-BR)

## Regras de Negócio do Cálculo

As regras estão centralizadas em [src/types.ts](src/types.ts):

- Tamanho da chapa: `GLASS_SHEET_SIZE = 3.38`
- Percentual de gastos: `EXPENSES_PERCENTAGE = 0.75` (75%)
- Percentual de lucro: `PROFIT_PERCENTAGE = 0.25` (25%)

### Fórmula

1. Área:

```text
area = altura * largura
```

2.Preço base:

```text
Se tipo = Temperado:
  basePrice = area * preco_do_vidro

Se tipo = Comum:
  basePrice = preco_do_vidro * (area / GLASS_SHEET_SIZE)
```

3.Gastos, lucro e preço final:

```text
expenses = basePrice * 0.75
profit = basePrice * 0.25
finalPrice = basePrice + expenses + profit
```

## Tecnologias

- React Native
- Expo
- TypeScript
- React Hook Form
- Zod
- @hookform/resolvers (zodResolver)
- React Navigation (Bottom Tabs)
- Zustand + persist middleware
- AsyncStorage

## Estrutura do Projeto

```text
src/
  components/      # Componentes reutilizáveis de UI
  routes/          # Regras de navegação por Tabs e Stacks
  schemas/         # Schemas Zod para validação dos formulários
  screens/         # Telas principais da aplicação
  stores/          # Estado global e persistência (Zustand)
  utils/           # Funções utilitárias (ex.: moeda BRL, gerador PDF)
  types.ts         # Tipos e constantes de negócio
```

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- npm (ou yarn/pnpm)
- Expo Go no celular (opcional para teste rápido)

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run start
```

### Atalhos disponíveis

```bash
npm run android
npm run ios
npm run web
```

## Build (EAS)

Para gerar um build de preview para Android, utilize:

```bash
eas build -p android --profile preview
```

## Scripts

Os scripts estão definidos em [package.json](package.json):

- `start`: inicia o Expo
- `android`: inicia direto no Android
- `ios`: inicia direto no iOS
- `web`: inicia no navegador

## Persistência de Dados

A persistência é feita com Zustand + AsyncStorage em [src/stores/GlassStore.ts](src/stores/GlassStore.ts), usando a chave:

- `glass-storage`

Para os dados de orçamento, a persistência é feita em [src/stores/BudgetStore.ts](src/stores/BudgetStore.ts), usando a chave:

- `budget-storage`

## Formatação de Moeda

O formatador de moeda BRL está em [src/utils/formatCurrencyBRL.ts](src/utils/formatCurrencyBRL.ts) e é utilizado nas telas/componentes para exibir valores como `R$ 1.234,56`.

## Fluxo Principal de Uso

1. Cadastrar os vidros na aba Cadastro.
2. Informar medidas na aba Cálculo e escolher o tipo.
3. Visualizar preço final e detalhes (gastos/lucro).
4. Adicionar itens ao orçamento diretamente a partir do cálculo.
5. Iniciar um **Novo Orçamento** na aba respectiva, podendo ajustar quantidades, adicionar descontos e revisar totais.
6. Gerar e compartilhar o PDF do orçamento atual ou **Salvá-lo**.
7. Gerenciar orçamentos passados na **Lista de Orçamentos Salvos**.
8. Gerenciar itens cadastrados na aba Estoque (editar ou remover).

## Aba de Orçamento

A aba Orçamento agora possui uma navegação em formato *Stack*, contendo:

Principais recursos:

- Menu de opções: "Novo Orçamento" e "Orçamentos Salvos".
- Listagem dos itens adicionais pendentes no orçamento atual.
- Salvamento em histórico pedindo dados extras (Cliente e Endereço).
- Listagem de Orçamentos Salvos, permitindo rever propostas antigas.
- Geração de PDF e compartilhamento do arquivo gerado para qualquer proposta salva.

O PDF é montado em [src/utils/buildBudgetPdfHtml.ts](src/utils/buildBudgetPdfHtml.ts) e usa dados da empresa via variáveis de ambiente:

- `EXPO_PUBLIC_COMPANY_ADDRESS`
- `EXPO_PUBLIC_COMPANY_CNPJ`
- `EXPO_PUBLIC_COMPANY_PHONE`
- `EXPO_PUBLIC_COMPANY_INSTAGRAM`

## Observações

- Os dados ficam salvos localmente no dispositivo.
- O projeto atualmente não possui testes automatizados.

## Autor

Projeto desenvolvido para a vidraçaria VCampos.

Criador do app: Arthur Pereira da Silva

Portfólio: <https://github.com/ArthurPdaSilva>
