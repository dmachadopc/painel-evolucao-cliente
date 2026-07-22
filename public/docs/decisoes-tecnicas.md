# DECISOES_TECNICAS.md — Ravem ERP

> Registro executivo de decisões de arquitetura e regras de negócio permanentes que não devem ser rediscutidas sem justificativa técnica objetiva.

---

## 1. Arquitetura Geral & Modelo de Negócio

### DT-001: Sistema Exclusivo Single-Tenant (Sem SaaS / Workspaces)
- **Contexto**: Definição da arquitetura de isolamento de dados do ERP.
- **Decisão**: O Ravem ERP é um sistema exclusivo para uma única organização (Ravem Engenharia). Não será multi-tenant, SaaS ou baseado em workspaces.
- **Motivação**: Otimizar a complexidade de desenvolvimento e garantir máxima performance sem necessidade de abstração de tenants.
- **Impacto**: O banco PostgreSQL representa a empresa inteira. Não há colunas `tenant_id` ou partições por cliente.
- **Referência**: Diretiva da diretoria / `.agents/memory/ravem-erp.md`.

---

## 2. Stack Tecnológica Definitiva

### DT-002: Stack Base (React + Vite + TypeScript + Supabase)
- **Contexto**: Escolha das tecnologias para frontend, autenticação e banco de dados.
- **Decisão**: Utilizar React (v19) com Vite e TypeScript no frontend; Supabase (PostgreSQL, Auth e Storage) como backend de dados e segurança.
- **Motivação**: Reaproveitar a interface de protótipo existente e acelerar a entrega do MVP com segurança de nível enterprise (RLS).
- **Impacto**: Elimina a necessidade de construir um servidor Node.js intermediário para o CRUD inicial.
- **Referência**: `docs/05-arquitetura-proposta.md` / Migration `20260720114200_init_schema.sql`.

---

## 3. Segurança e Controle de Acesso (RBAC & RLS)

### DT-003: Papéis do Sistema (Enum `app_role`)
- **Contexto**: Definição das permissões e hierarquias de acesso.
- **Decisão**: O sistema utiliza 6 papéis estritos no banco: `admin`, `manager`, `employee`, `partner`, `client` e `pending`.
- **Motivação**: Cobrir desde a diretoria até clientes externos e parceiros sem permitir acessos indevidos.
- **Impacto**: Toda conta criada recebe automaticamente o papel `pending` por padrão no trigger até ser aprovada pela diretoria.
- **Referência**: Migration `20260720114200_init_schema.sql` (`CREATE TYPE public.app_role`).

### DT-004: Prevenção de Recursão em Policies RLS (`get_my_role()`)
- **Contexto**: A tabela `profiles` consulta a si mesma para verificar se o usuário logado é `admin`.
- **Decisão**: A checagem de papel é feita via função dedicada `public.get_my_role()` com `SECURITY DEFINER` e `STABLE`.
- **Motivação**: Políticas RLS diretas na tabela `profiles` geram loops infinitos (recursão de RLS) derrubando o Supabase.
- **Impacto**: Acesso instantâneo e seguro sem erros de runtime nas consultas.
- **Referência**: Migration `20260720114200_init_schema.sql`.

### DT-005: Função Segura de Atualização de Papéis (`update_user_role_status`)
- **Contexto**: Alteração de cargos exige privilégios elevados na tabela interna de autenticação.
- **Decisão**: A alteração de papéis é executada exclusivamente pela RPC `public.update_user_role_status()` restrita a `admin`.
- **Motivação**: Impedir a elevação de privilégios por usuários comuns e proteger o sistema contra a desativação acidental do último administrador.
- **Impacto**: Segurança total na gestão de acessos com trava automatizada.
- **Referência**: Migration `20260720114200_init_schema.sql` / `docs/09-gestao-de-acessos-painel.md`.

---

## 4. Modelagem de Dados e Auditoria

### DT-006: Soft Delete na Tabela de Pessoas (`people`)
- **Contexto**: Necessidade de remover cadastros de clientes/parceiros sem perder histórico de auditoria ou contratos.
- **Decisão**: A exclusão de registros em `people` não utiliza a instrução SQL `DELETE`, mas sim a atualização para `status = 'archived'`, registrando `deleted_at` e `deleted_by`.
- **Motivação**: Cumprimento de exigências legais e preservação da integridade referencial com contratos e propostas.
- **Impacto**: REVOKE DELETE foi aplicado para a role `authenticated` no PostgreSQL.
- **Referência**: Migration `20260720114200_init_schema.sql` (Constraint `chk_people_soft_delete`).

### DT-007: Trilha de Auditoria Automatizada com Sanitização
- **Contexto**: Registro de alterações em tabelas sensíveis sem expor dados confidenciais nos logs.
- **Decisão**: O trigger `public.process_audit_log()` intercepta operações de INSERT, UPDATE e DELETE e grava na tabela `public.audit_logs` removendo automaticamente chaves como `password`, `token`, `secret`, `api_key`.
- **Motivação**: Rastreabilidade completa com conformidade de privacidade.
- **Impacto**: Registro transparente de ações por usuário (`auth.uid()`).
- **Referência**: Migration `20260720114200_init_schema.sql`.

---

## 5. Regras de Desenvolvimento e Variáveis de Ambiente

### DT-008: Chaves de API Permitidas no Frontend
- **Contexto**: Gerenciamento de credenciais de integração do Supabase.
- **Decisão**: Apenas as chaves `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` e `VITE_SUPABASE_ANON_KEY` são permitidas no código do cliente.
- **Motivação**: Segurança e prevenção de vazamento de credenciais administrativas.
- **Impacto**: Nunca utilizar `service_role`, `secret key` ou senhas diretas de banco em arquivos commitados.
- **Referência**: Diretiva de segurança do projeto.

---

## 6. Design System e UX

### DT-009: Design System como Fonte Obrigatoria para Interfaces
- **Contexto**: Padronizacao visual e reducao de divida tecnica de UI durante a evolucao do ERP.
- **Decisao**: Novas telas e refatores visuais devem seguir o Design System oficial documentado em `docs/10-design-system.md`, usando tokens de `src/index.css` e componentes base de `src/components/ui`.
- **Motivacao**: Garantir consistencia, legibilidade em tema claro/escuro, acessibilidade minima e baixa fadiga operacional para usuarios internos.
- **Impacto**: Cores hardcoded, componentes avulsos e padroes visuais fora do Design System precisam de justificativa tecnica objetiva.
- **Referencia**: `docs/10-design-system.md` / rota `/dev/playground`.

---

### DT-011: Home como Centro de Comando Operacional
- **Contexto**: A Home evoluiu de dashboard pessoal para ponto de entrada diario do ERP.
- **Decisao**: A rota `/home` deve priorizar arquitetura de informacao orientada a decisao: resumo operacional, prioridade recomendada, saude geral, fila operacional e atividade recente.
- **Motivacao**: O usuario deve entender rapidamente o que aconteceu, o que exige atencao, o que fazer primeiro e como esta a saude do escritorio.
- **Impacto**: Novas alteracoes na Home devem evitar grades homogeneas de cards, textos institucionais e indicadores sem contexto. A tela deve usar dados existentes para orientar acoes sem criar funcionalidades artificiais.
- **Referencia**: `UX-003` / `src/modules/dashboard/pages/HomePage.tsx` / `docs/10-design-system.md`.

---

### DT-012: Padrao Visual Premium Incremental (`UX-004`)
- **Contexto**: A evolucao visual da Home consolidou uma linguagem mais madura para o ERP, mas novas telas precisam seguir o mesmo nivel sem redesenhar toda a direcao visual do produto.
- **Decisao**: Novas telas e refatores visuais devem aplicar o `UX-004`: menos caixas, hierarquia de importancia clara, status semanticos, numeros contextualizados, microinteracoes discretas, estados vazios e skeletons quando aplicavel.
- **Motivacao**: Elevar a percepcao de qualidade do sistema sem criar inconsistencia, excesso visual ou componentes avulsos.
- **Impacto**: Refatores de modulo devem consultar `docs/19-padrao-visual-premium-ux004.md` alem do Design System canonico. O modulo Financeiro fica recomendado como proximo piloto.
- **Referencia**: `docs/19-padrao-visual-premium-ux004.md` / `docs/10-design-system.md` / `src/index.css`.

---

### DT-013: Financeiro como Modulo Piloto do Padrao Premium (`UX-005`)
- **Contexto**: O Financeiro foi escolhido como primeiro modulo operacional para validar o `UX-004` fora da Home.
- **Decisao**: A tela `/financeiro` deve priorizar briefing de caixa, KPIs contextualizados, panorama de caixa, movimentacoes recentes e DRE complementar, evitando excesso de cards e bordas.
- **Motivacao**: Numeros financeiros exigem hierarquia, contraste e semantica de status mais fortes para acelerar decisao da gestao.
- **Impacto**: Proximos refatores de CRM, REURB, Propostas e RH devem usar o Financeiro como referencia pratica de aplicacao do `UX-004`.
- **Referencia**: `UX-005` / `src/modules/finance/pages/FinancePage.tsx` / `docs/19-padrao-visual-premium-ux004.md`.

---

### DT-014: Aplicacao Transversal do Padrao Premium (`UX-006`)
- **Contexto**: Apos Home e Financeiro, os demais modulos operacionais precisavam reduzir divergencias visuais e adotar a mesma linguagem incremental.
- **Decisao**: CRM, REURB, Propostas, RH, Juridico, Engenharia, Calendario, Pessoas, Admin e painel executivo passam a seguir a camada visual do `UX-004` em cabecalhos, raios, sombras, bordas e linguagem operacional.
- **Motivacao**: Evitar que a nova identidade fique restrita a uma ou duas telas e reduzir a sensacao de produto fragmentado.
- **Impacto**: Novos ajustes visuais nesses modulos devem preservar a direcao premium incremental, evitando retorno a cards pesados, textos genericos e excesso de bordas.
- **Referencia**: `UX-006` / `docs/19-padrao-visual-premium-ux004.md`.

---

## 7. Arquitetura Modular do Frontend

### DT-010: Reorganização Modular Incremental do Frontend (`FE-ARCH-001`)
- **Contexto**: Aceleração da prototipagem inicial gerou acoplamento em `src/modules/Pages.tsx`, centralização de tipos em `types.ts`, subordinação de Pessoas ao CRM e concentração de serviços em `shared/lib/`.
- **Decisão (Preliminar / Proposta)**: A reorganização da arquitetura do frontend adotará o padrão de **Monólito Modular** (`src/modules/[dominio]/`), descentralizando o roteamento, desmembrando os tipos globais, desacoplando Pessoas como cadastro central e organizando a Sidebar via `sidebarConfig.ts`. A execução será estritamente incremental através de 8 subtarefas (`FE-ARCH-001-A` a `H`), sem quebras de banco ou alterações no Supabase.
- **Motivação**: Garantir escalabilidade e manutenibilidade para o desenvolvimento das próximas fases do ERP sem causar regressões funcionais.
- **Impacto**: O código funcional existente e as permissões RLS do Supabase serão integralmente preservados. Nenhuma refatoração visual ou de layout será realizada durante a reorganização estrutural.
- **Referência**: `docs/11-plano-reorganizacao-arquitetura-frontend.md` / `docs/adr/ADR-001-arquitetura-modular-do-frontend.md`.

