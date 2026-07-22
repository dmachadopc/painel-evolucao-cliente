# 11 - Auditoria de Interface, Rotas, Permissões e WCAG 2.2 AA — Ravem ERP

> Inventário completo de todas as rotas e subrotas, auditoria de componentes atuais, estratégia de permissões desacoplada, classificação responsiva e critérios de acessibilidade WCAG 2.2 AA.

---

## 1. Inventário Completo de Rotas e Subrotas

| Rota / Subrota | Módulo / Tela | Perfil Necessário | Permissão Exigida (`hasPermission`) | Ação Principal | Inconsistências & Oportunidades UX |
|---|---|---|---|---|---|
| `/home` | Início / Dashboard Pessoal | `authenticated` | `view_dashboard` | Visualizar tarefas e prioridades do dia | Transição de tela promocional/launchpad para Dashboard Operacional Pessoal. |
| `/centro-comando` | Painel da Gerência | `admin`, `manager` | `view_executive_dashboard` | Acompanhar KPIs consolidados | Consolidação de estatísticas operacionais de todos os módulos. |
| `/pessoas` | Cadastro Central de Pessoas | `authenticated` | `view_people` | Cadastrar Pessoa Física/Jurídica | Módulo piloto para aplicação dos templates por composição. |
| `/pessoas/:id` | Ficha Detalhada da Pessoa | `authenticated` | `view_people_details` | Editar cadastro / Ver histórico | Transição de modal para template de detalhes com abas. |
| `/crm` | Pipeline Comercial | `authenticated` | `view_crm` | Mover oportunidade no Kanban | Adicionar skeletons durante carregamento e feedback visual no drag-and-drop. |
| `/propostas` | Propostas & Contratos | `authenticated` | `view_proposals` | Gerar Orçamento / Contrato | Eliminar modais duplicados e aplicar máscaras de entrada. |
| `/area-trabalho` | Engenharia / Projetos | `authenticated` | `view_engineering` | Criar / Gerenciar Projetos | Responsividade mobile em tabelas de cronogramas. |
| `/reurb` | REURB Operacional | `authenticated` | `view_reurb` | Gerenciar Núcleos / Beneficiários | Ajuste dinâmico de altura do mapa Leaflet e renderização otimizada. |
| `/financeiro` | Financeiro e DRE | `admin`, `manager` | `view_finance` | Lançar Entradas / Saídas | Confirmação de ações destrutivas via `ConfirmDialog`. |
| `/rh` | Recursos Humanos | `admin`, `manager` | `view_hr` | Gerenciar Ponto / Ausências | Paginação e ordenação padronizada nas listas. |
| `/juridico` | Módulo Jurídico | `authenticated` | `view_legal` | Acompanhar Protocolos | Preservação de sub-abas ativas na URL. |
| `/calendario-escritorio` | Calendário | `authenticated` | `view_calendar` | Agendar Compromisso | Grade responsiva adaptada a dispositivos móveis. |
| `/admin/access` | Controle de Acessos | `admin` | `manage_users` | Alterar Roles e Permissões | Tratamento de erros de permissão com Toasts semânticos. |
| `/dev/playground` | Playground Design System | `admin` | `view_playground` | Testar Componentes | Ambiente isolado de homologação de UI. |

---

## 2. Estratégia de Permissões Desacoplada

Para evitar verificações dispersas de `app_role` diretamente nos componentes visuais:

1. **Provedor de Permissões (`PermissionContext` / `usePermission`)**:
   - Centraliza a verificação de regras através do método `hasPermission(permissionKey: Permission)`.
2. **Regra de Exibição vs. Bloqueio**:
   - **Menu e Navegação Principal**: Módulos para os quais o usuário não possui permissão de leitura são **ocultados** da navegação para evitar poluição visual.
   - **Botões de Ação Específica (ex: Editar/Excluir)**: Ficam **desabilitados com tooltip explicativo** ("Você não possui permissão para executar esta ação"), garantindo transparência operacional sem ocultar a existência do recurso.
3. **Componente wrapper `PermissionGuard`**:
   - Envolve trechos ou rotas inteiras retornando o `PermissionState` amigável quando o acesso for restrito.

---

## 3. Classificação do Comportamento Responsivo por Módulo

| Módulo / Rota | Desktop (>= 1280px) | Notebook (1024px - 1279px) | Tablet (768px - 1023px) | Mobile (< 768px) |
|---|---|---|---|---|
| `/home` | Grid 3 colunas | Grid 2 colunas | Grid 1 coluna | Coluna única com rolagem vertical suave |
| `/crm` (Kanban) | 5 colunas horizontais | 3 colunas + scroll horiz. | Carrossel de colunas por aba | Visualização por abas de estágios |
| `/pessoas`, `/financeiro` | Tabela completa | Tabela com colunas ocultas | Cards flexíveis | Cards empilhados com Drawer de detalhes |
| `/reurb` (Mapa) | Mapa + Painel lateral | Mapa + Painel lateral | Mapa superior / Painel inferior | Alternância por abas (Mapa / Lista) |

---

## 4. Critérios de Acessibilidade WCAG 2.2 AA

1. **Contraste de Cores**: Razão mínima de contraste de 4.5:1 para texto normal e 3:1 para texto grande/ícones conforme tokens de `src/index.css`.
2. **Navegação por Teclado**:
   - Todos os elementos interativos possuem suporte a `Tab`, `Enter` e `Space`.
   - Modais e drawers capturam o foco e fecham com a tecla `Esc`.
   - Foco visual nítido utilizando a classe `focus-visible:ring-2 focus-visible:ring-emerald-500`.
3. **Leitores de Tela (Semântica ARIA)**:
   - Uso de `<main>`, `<nav>`, `<header>`, `aria-expanded`, `aria-selected` e `aria-live="polite"` para notificações.
   - Rótulos `aria-label` obrigatórios em botões exclusivamente compostos por ícones.
