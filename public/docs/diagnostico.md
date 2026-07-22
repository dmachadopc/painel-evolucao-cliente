# Estado Atual e Diagnóstico Técnico

## Tecnologias e Infraestrutura
- **Frontend**: React (v19), Vite, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend & Banco de Dados**: Supabase (PostgreSQL, Auth com JWT, Row Level Security - RLS, Triggers de Timestamp, Trilha de Auditoria com Sanitização).

## Módulos Persistidos em Supabase (Fase 1 em andamento)
- **Autenticação & RBAC (`RBAC-002`)**: Usuários autenticados no Supabase Auth com 6 papéis estritos (`admin`, `manager`, `employee`, `partner`, `client`, `pending`) e RPC de gestão `update_user_role_status`.
- **Design System & UX (`DS-001` / `UX-000`)**: Tokens unificados em `src/index.css`, componentes base em `src/components/ui/` e suporte nativo a Dark/Light Mode.
- **Pessoas (`CRM-001`)**: Tabela `people` com soft-delete e auditoria.
- **CRM Comercial (`CRM-002` / `CRM-003`)**: Tabela `crm_opportunities` integrada a pessoas e Kanban funcional.
- **Propostas Comerciais (`PROP-001`)**: Tabelas `commercial_proposals` e `commercial_proposal_items` com calculador e visualizador timbrado.
- **Engenharia & Projetos (`ENG-001`)**: Tabelas `engineering_projects` e `engineering_project_stages` com gestão de etapas e progresso visual.

## Módulos Conceituais (Baseados em Mocks residuais)
- REURB Operacional, Painel Financeiro, Módulo Jurídico, RH Administrativo e Calendário do Escritório.

## Diagnóstico da Arquitetura do Frontend (`FE-ARCH-001`)
A inspeção técnica identificou a necessidade de uma **reorganização modular do frontend**:
- **Acoplamento em `Pages.tsx`**: Monólito de 777 linhas concentrando wrappers de páginas e sub-abas.
- **Subordinação de Pessoas**: O cadastro de Pessoas/Clientes está dentro da pasta `src/modules/crm/`.
- **Serviços em `shared/lib/`**: Serviços específicos de domínio estão centralizados na pasta compartilhada.
- **Monólito de Tipos (`src/types.ts`)**: 386 linhas concentrando tipos de todos os domínios.
- **Sidebar**: Mistura categorias funcionais e permissões hardcoded.

## Plano de Ação (`FE-ARCH-001`)
Foi elaborado o plano técnico formal em [`docs/11-plano-reorganizacao-arquitetura-frontend.md`](./11-plano-reorganizacao-arquitetura-frontend.md) e a [`ADR-001`](./adr/ADR-001-arquitetura-modular-do-frontend.md) (Status: `Proposto`), decompondo a futura refatoração em 8 subtarefas incrementais e seguras (`FE-ARCH-001-A` a `H`).

