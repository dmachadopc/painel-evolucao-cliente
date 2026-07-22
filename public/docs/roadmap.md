# ROADMAP.md — Ravem ERP

> Representação exclusiva da evolução funcional do produto.

---

## Fase 0 — Fundação Técnica e de Produto

- **Objetivo**: Criar toda a base arquitetural e de design necessária para suportar o ERP da Ravem.
- **Status**: ✅ Concluída
- **Dependências**: Nenhuma
- **Tarefas de Fundação Técnica**:
  - `DS-001`: Design System Foundation (Concluído)
  - `RBAC-002`: Gestão de Acessos & Permissões (Concluído)
  - `UX-000`: Base Visual Operacional (Concluído)
  - `FE-ARCH-001`: Reorganização da Arquitetura Modular do Frontend (implementada de forma incremental)
    - **Objetivo**: Reorganizar o diretório `src/` em módulos funcionais isolados (`src/modules/[dominio]/`), descentralizar rotas do `Pages.tsx`, desacoplar a Sidebar das permissões e isolar o Portal do Cliente e o Playground Dev.
    - **Prioridade**: Alta | **Risco**: Médio/Alto | **Impacto Visual**: Nenhum (Preservar `UX-000`).
    - **Subtarefas Planejadas**: `FE-ARCH-001-A` (Rotas & Shell), `FE-ARCH-001-B` (Pessoas), `FE-ARCH-001-C` (CRM & Propostas), `FE-ARCH-001-D` (Engenharia), `FE-ARCH-001-E` (Admin), `FE-ARCH-001-F` (Legados & Mocks), `FE-ARCH-001-G` (Portal & Dev), `FE-ARCH-001-H` (Types & Consolidação).
    - **Status de Retomada**: estrutura modular em uso em `src/modules`, rotas em `src/app/router.tsx` e navegacao centralizada em `src/config/navigation.config.ts` / `src/app/navigation/sidebarConfig.ts`.

---

## Fase 1 — Núcleo Operacional (MVP)

- **Objetivo**: Migrar os processos principais da Ravem Engenharia (Pessoas, CRM, Propostas, Contratos, Engenharia, REURB, Financeiro inicial, Gestão documental básica, Calendário e Notificações) para o ERP, permitindo descontinuar o ClickUp. Todos os módulos utilizam o Design System criado na Fase 0.
- **Status**: ✅ Concluída
- **Dependências**: Fase 0 concluída

---

## Fase 2 — Consolidação da Experiência (UX/UI)

- **Objetivo**: Refinar a usabilidade e a experiência do usuário após a estabilização do MVP (padronização visual, refinamento do Design System, responsividade, estados de loading, tratamento de erros e acessibilidade), sem criação de novas funcionalidades.
- **Status**: ✅ Concluída até `UX-006`
- **Dependências**: Fase 1 estável em produção
- **Entregas concluídas**:
  - `UX-002`: shell, componentes base, responsividade e rotas operacionais.
  - `UX-003`: Home como Centro de Comando Operacional.
  - `UX-004`: Padrao Visual Premium Incremental documentado.
  - `UX-005`: Financeiro como modulo piloto premium.
  - `UX-006`: Aplicacao transversal do padrao premium nos demais modulos.
- **Proximo passo recomendado**: rodada de QA visual guiada por prints em tema claro/escuro para corrigir contrastes pontuais, estados vazios e skeletons.

---

## Fase 3 — Integrações e Automações

- **Objetivo**: Expandir o ecossistema do ERP por meio de integrações (WhatsApp, E-mail, Portal do Cliente, Assinatura Eletrônica, GIS avançado, emissão de boletos e Notas Fiscais).
- **Status**: ⬜ Próxima fase
- **Dependências**: Fase 1 e Fase 2 concluídas

---

## Fase 4 — Inteligência, Dados e Evolução

- **Objetivo**: Adicionar inteligência e automações avançadas baseadas nos dados operacionais consolidados (Inteligência Artificial/OCR, BI, Wiki/Fórum interno, assistentes inteligentes e aplicativo móvel avançado).
- **Status**: ⬜ Não iniciado
- **Dependências**: Fase 3 concluída

---

## 📌 Observações sobre Dependências e Execução Paralela

As fases representam a prioridade estratégica do projeto. Conforme a maturidade do sistema, atividades de fases posteriores poderão ser iniciadas em paralelo sempre que não houver dependências técnicas bloqueantes.

---

## 📈 Diretriz de Crescimento e Escala (Crescimento Interno)

A evolução de escala do sistema desconsidera qualquer arquitetura B2B SaaS, multiempresa, multi-tenant ou marketplace. O planejamento de crescimento é focado exclusivamente na expansão operacional interna da Ravem Engenharia, considerando:

1. **Volume de Dados**: Crescimento da base de dados (PostgreSQL) decorrente do acúmulo de novos beneficiários, lotes, contratos, arquivos de REURB e propostas.
2. **Usuários Simultâneos**: Aumento da quantidade de colaboradores internos ativos (técnicos, engenheiros, gerentes, colaboradores administrativos e comerciais).
3. **Novos Departamentos**: Abertura de novos setores e áreas dentro da estrutura organizacional da Ravem.
4. **Novos Processos**: Expansão e refinamento dos procedimentos internos de Engenharia e fluxos de REURB municipal.
5. **Expansão Territorial**: Atuação em novos municípios e projetos de regularização fundiária de maior porte.

