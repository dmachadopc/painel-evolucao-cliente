# Arquitetura Proposta

## Visão Geral
Adotar um **Monólito Modular** com o frontend separado do backend. A stack definitiva ainda carece de aprovação.

## 1. Frontend
- **Problema**: O frontend atual não separa UI de lógica e falta roteamento.
- **Alternativas**: React SPA, Next.js.
- **Recomendação**: React com Vite (manter) + React Router + React Query.
- **Vantagens**: Reaproveita o código atual.
- **Riscos**: Dívida técnica do App.tsx precisa ser paga.
- **Pendentes**: Definir gerenciamento de estado global.

## 2. Backend
- **Problema**: Inexistente.
- **Alternativas**: Node.js (NestJS, Express), Python, C#.
- **Recomendação**: Node.js (NestJS ou Express) em TypeScript.
- **Vantagens**: Mesma linguagem do front (TS), facilita tipagem ponta a ponta.
- **Riscos**: Curva de escalabilidade se mal desenhado.
- **Pendentes**: Aprovação da linguagem.

## 3. Banco de Dados
- **Problema**: Persistência estruturada, relacional vs não relacional.
- **Alternativas**: PostgreSQL, MySQL, MongoDB.
- **Recomendação**: PostgreSQL.
- **Vantagens**: Integridade forte para ERP, excelente suporte GIS (PostGIS).
- **Riscos**: Maior rigidez em mudanças de schema.
- **Pendentes**: ORM a utilizar (Prisma, Drizzle ou TypeORM).

## 4. Autenticação e Permissões
- **Recomendação**: JWT com controle baseado em papéis (RBAC).

## 5. Armazenamento (Storage)
- **Problema**: Guardar PDFs, imagens (dossiês).
- **Recomendação**: Object Storage (AWS S3 ou similar).
- **Vantagens**: Escalável, metadados fáceis.

## 6. Logs e Auditoria
- **Recomendação**: Tabela dedicada no banco de dados, excluindo arquivos pesados do log direto, ou ferramenta externa (ELK/Datadog) no futuro.

## 7. Integrações
- **Recomendação**: Padrão Adapter/Portas para encapsular dependências de WhatsApp, Assinatura Eletrônica e GIS.

## 8. Hospedagem e Ambientes
- **Recomendação**: Deploy automatizado (CI/CD) com ambientes de DEV, STG e PRD. Nuvem: AWS, GCP ou VPS como Render/DigitalOcean.
