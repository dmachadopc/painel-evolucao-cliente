import {
  Search,
  Palette,
  LayoutTemplate,
  Database,
  ShieldCheck,
  Smartphone,
  Target,
  Landmark,
  Globe,
  Plug
} from 'lucide-react';
import {
  ProjectInfo,
  Milestone,
  Release,
  Comparison,
  RoadmapItem,
  Achievement,
  HistoryEntry,
  DocumentRef
} from '../types';

export const project: ProjectInfo = {
  name: 'Ravem ERP',
  status: 'Em desenvolvimento',
  lastUpdated: '22 de julho de 2026',
  owner: 'Equipe de Engenharia de Software Ravem',
  version: '0.8.7-dev',
  phase: 'Fase 2 — Consolidação da Experiência (UX/UI)'
};

export const milestones: Milestone[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Técnico e de Produto',
    description: 'Levantamento completo do cenário atual, mapeamento de processos manuais (ClickUp, planilhas) e definição da visão de produto do ERP.',
    status: 'done',
    icon: Search,
    date: 'Fase 0'
  },
  {
    id: 'fundacao-tecnica',
    title: 'Fundação Técnica',
    description: 'Base arquitetural do frontend (Vite, React, TypeScript) e do backend (Supabase), roteamento, layouts e shell da aplicação.',
    status: 'done',
    icon: LayoutTemplate,
    date: 'Fase 0'
  },
  {
    id: 'banco-de-dados',
    title: 'Banco de Dados',
    description: 'Schema PostgreSQL no Supabase com tabelas de perfis, pessoas, auditoria, políticas de segurança (RLS) e triggers.',
    status: 'done',
    icon: Database,
    date: 'DB-001'
  },
  {
    id: 'autenticacao',
    title: 'Autenticação & Controle de Acessos',
    description: 'Login real com Supabase Auth, proteção de rotas por papel (RBAC), painel de gestão de acessos e trilha de auditoria.',
    status: 'done',
    icon: ShieldCheck,
    date: 'AUTH-001 / RBAC-002'
  },
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Tokens semânticos de cor, tipografia e espaçamento, componentes reutilizáveis (Card, Button, Badge) e suporte nativo a Dark Mode.',
    status: 'done',
    icon: Palette,
    date: 'DS-001'
  },
  {
    id: 'nucleo-operacional',
    title: 'Núcleo Operacional (MVP)',
    description: 'Migração dos processos principais da Ravem Engenharia — Pessoas, CRM, Propostas, Engenharia, REURB e Financeiro — para o ERP.',
    status: 'done',
    icon: Target,
    date: 'Fase 1'
  },
  {
    id: 'responsividade',
    title: 'Responsividade Mobile',
    description: 'Auditoria completa de UX/UI, arquitetura responsiva adaptada (320px–768px), navegação mobile e Sidebar unificada.',
    status: 'in_progress',
    icon: Smartphone,
    date: 'UX-002'
  },
  {
    id: 'crm-financeiro',
    title: 'CRM & Financeiro Avançado',
    description: 'Evolução do pipeline comercial e do módulo financeiro com relatórios, DRE detalhado e automações de cobrança.',
    status: 'upcoming',
    icon: Landmark
  },
  {
    id: 'portal-cliente',
    title: 'Portal do Cliente',
    description: 'Ambiente dedicado para que os clientes acompanhem o andamento de seus processos de forma autônoma.',
    status: 'upcoming',
    icon: Globe
  },
  {
    id: 'integracoes',
    title: 'Integrações & Automações',
    description: 'Conexões com WhatsApp, E-mail, assinatura eletrônica, GIS avançado e emissão de boletos e notas fiscais.',
    status: 'upcoming',
    icon: Plug
  }
];

export const releases: Release[] = [
  {
    id: 'padrao-visual-premium',
    title: 'Padrão Visual Premium',
    date: '22/07/2026',
    description: 'Camada prática de aplicação do Design System com menos ruído visual, hierarquia mais clara e microinterações discretas.',
    category: 'Design System'
  },
  {
    id: 'centro-comando',
    title: 'Centro de Comando Operacional',
    date: '22/07/2026',
    description: 'A Home evolui de uma grade de indicadores para um painel que orienta decisões diárias com contexto e fila operacional.',
    category: 'Novo Dashboard'
  },
  {
    id: 'arquitetura-modular',
    title: 'Arquitetura Modular do Frontend',
    date: '21/07/2026',
    description: 'Reorganização completa de `src/` em módulos isolados por domínio, com serviços, páginas e tipos próprios.',
    category: 'Nova Arquitetura'
  },
  {
    id: 'dashboard-executivo',
    title: 'Dashboard Executivo',
    date: '21/07/2026',
    description: 'Painel consolidado com métricas em tempo real de Engenharia, CRM, Propostas, REURB, Financeiro e RH.',
    category: 'Novo Dashboard'
  },
  {
    id: 'modulo-financeiro',
    title: 'Módulo Financeiro',
    date: '21/07/2026',
    description: 'Contas a pagar, contas a receber e lançamentos financeiros persistidos diretamente no PostgreSQL via Supabase.',
    category: 'Novo Módulo'
  },
  {
    id: 'login-acessos',
    title: 'Sistema de Login e Controle de Acessos',
    date: '20/07/2026',
    description: 'Autenticação real com Supabase Auth, bloqueio de rotas por perfil e painel de gestão de convites e permissões.',
    category: 'Novo Sistema de Login'
  }
];

export const comparisons: Comparison[] = [
  {
    id: 'ravem-gravacao-tela',
    title: 'Fluxo Operacional e Usabilidade do Sistema',
    description: 'Comparação em vídeo demonstrando a evolução da navegação, fluidez de carregamento e facilidade de uso do novo Ravem ERP em relação à versão antiga.',
    result: 'Redução drástica no tempo de execução de tarefas rotineiras e interface moderna.',
    beforeLabel: 'Sistema Antigo',
    afterLabel: 'Sistema Atual',
    beforeVideoUrl: '/videos/sistema-antigo.webm',
    afterVideoUrl: '/videos/sistema-atual.webm'
  },
  {
    id: 'home-centro-comando',
    title: 'Página Inicial → Centro de Comando',
    description: 'A Home saiu de uma grade estática de indicadores independentes para um painel que prioriza a leitura em menos de cinco segundos, com ação recomendada e fila operacional viva.',
    result: 'Decisões diárias mais rápidas, com contexto e hierarquia visual clara.',
    beforeLabel: 'Home v1 (grade de indicadores)',
    afterLabel: 'Centro de Comando Operacional',
    beforeImageUrl: '/assets/pagina-inicial-antiga.png',
    afterImageUrl: '/assets/pagina-inicial-atual.png'
  },
  {
    id: 'gestao-acessos',
    title: 'Planilhas de Controle → Painel de Acessos',
    description: 'O controle manual de quem tinha acesso a quais sistemas foi substituído por um painel de gestão de contas, convites, colaboradores e auditoria dentro do próprio ERP.',
    result: 'Zero dependência de planilhas para conceder ou revogar acessos.',
    beforeLabel: 'Controle manual (planilha)',
    afterLabel: 'Painel de Gestão de Acessos',
    afterImageUrl: '/assets/gestao-acessos-atual.png'
  },
  {
    id: 'financeiro-clickup',
    title: 'ClickUp → Módulo Financeiro Nativo',
    description: 'Contas a pagar, a receber e o fluxo de caixa deixam de depender de quadros no ClickUp e passam a existir como registros reais no banco de dados da empresa.',
    result: 'Dados financeiros seguros, auditáveis e centralizados no ERP.',
    beforeLabel: 'ClickUp (quadro genérico)',
    afterLabel: 'Painel Financeiro Ravem'
  },
  {
    id: 'responsividade-mobile-1',
    title: 'Mobile: Menu & Sidebar Adaptada',
    description: 'Navegação redesenhada para smartphones. Menu lateral retrátil e cabeçalho otimizado evitam que a interface fique espremida.',
    result: 'Acesso rápido a todos os módulos com facilidade de toque.',
    beforeLabel: 'Versão Mobile Antiga',
    afterLabel: 'Novo Menu Responsivo',
    beforeImageUrl: '/assets/mobile-antiga.png',
    afterImageUrl: '/assets/mobile-atual-1.jpeg'
  },
  {
    id: 'responsividade-mobile-2',
    title: 'Mobile: Dashboard & Indicadores',
    description: 'Os blocos de estatísticas e gráficos passam de colunas horizontais fixas para pilhas verticais flexíveis e redimensionadas.',
    result: 'Visualização completa de dados operacionais sem necessidade de zoom lateral.',
    beforeLabel: 'Visualização Desktop no Celular',
    afterLabel: 'Blocos de Informação Otimizados',
    afterImageUrl: '/assets/mobile-atual-2.jpg'
  },
  {
    id: 'responsividade-mobile-3',
    title: 'Mobile: Listagens e Ações Rápidas',
    description: 'Tabelas densas foram transformadas em cards independentes com botões de ação contextuais visíveis e de fácil clique.',
    result: 'Operação do ERP no celular com a mesma agilidade do computador.',
    beforeLabel: 'Tabelas largas inacessíveis',
    afterLabel: 'Cards Mobile com Ações Diretas',
    afterImageUrl: '/assets/mobile-atual-3.jpg'
  },
  {
    id: 'responsividade-mobile-4',
    title: 'Mobile: Formulários e Filtros',
    description: 'Campos de entrada e menus de seleção redimensionados para largura cheia para evitar zoom forçado na hora do preenchimento.',
    result: 'Preenchimento rápido e sem barreiras de acessibilidade.',
    beforeLabel: 'Formulários desconfigurados',
    afterLabel: 'Filtros e Inputs Alinhados',
    afterImageUrl: '/assets/mobile-atual-4.jpg'
  }
];

export const roadmap: RoadmapItem[] = [
  {
    id: 'responsividade-mobile',
    title: 'Responsividade Mobile',
    description: 'Finalizar auditoria de UX/UI mobile e homologar a navegação adaptada em todos os módulos do sistema.',
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: 'crm-evolucao',
    title: 'Evolução do CRM',
    description: 'Aprimorar o pipeline comercial com automações de follow-up e relatórios de conversão de leads.',
    status: 'planned',
    priority: 'high'
  },
  {
    id: 'financeiro-relatorios',
    title: 'Financeiro — Relatórios e DRE',
    description: 'Expandir o módulo financeiro com relatórios gerenciais detalhados e Demonstrativo de Resultado do Exercício.',
    status: 'planned',
    priority: 'medium'
  },
  {
    id: 'portal-do-cliente',
    title: 'Portal do Cliente',
    description: 'Criar ambiente exclusivo para que clientes acompanhem processos de engenharia e REURB de forma autônoma.',
    status: 'not_started',
    priority: 'medium'
  },
  {
    id: 'integracoes-externas',
    title: 'Integrações Externas',
    description: 'Conectar WhatsApp, e-mail transacional, assinatura eletrônica e emissão de boletos e notas fiscais.',
    status: 'not_started',
    priority: 'low'
  }
];

export const achievements: Achievement[] = [
  {
    id: 'design-system-100',
    title: 'Design System 100% migrado para tokens semânticos',
    description: 'Todos os módulos utilizam a mesma paleta, tipografia e componentes Shadcn/Tailwind, com suporte nativo a Dark Mode.'
  },
  {
    id: 'zero-erros-build',
    title: 'Build com zero erros de TypeScript',
    description: 'O sistema é validado continuamente via `npm run lint` e `tsc --noEmit` antes de cada entrega.'
  },
  {
    id: 'arquitetura-modular',
    title: 'Arquitetura 100% modular por domínio',
    description: 'Cada área de negócio (Pessoas, CRM, Engenharia, REURB, Financeiro, RH, Admin) tem seus próprios tipos, serviços e páginas.'
  },
  {
    id: 'seguranca-rls',
    title: 'Segurança em nível de linha (RLS) no banco de dados',
    description: 'Todas as tabelas sensíveis possuem políticas de acesso configuradas diretamente no PostgreSQL.'
  },
  {
    id: 'auditoria-completa',
    title: 'Trilha de auditoria completa',
    description: 'Toda alteração de permissão ou papel de usuário fica registrada com justificativa obrigatória.'
  },
  {
    id: 'mobile-adaptado',
    title: 'Navegação adaptada para dispositivos móveis',
    description: 'Header, menu e telas operacionais reorganizados para uso confortável entre 320px e 768px de largura.'
  }
];

export const history: HistoryEntry[] = [
  {
    id: '2026-07-22',
    date: '22/07/2026',
    items: [
      { id: 'h1', title: 'Padrão Visual Premium (UX-004)', description: 'Camada prática de aplicação do Design System.' },
      { id: 'h2', title: 'Centro de Comando Operacional (UX-003)', description: 'Evolução da Home para painel orientado a decisões.' }
    ]
  },
  {
    id: '2026-07-21',
    date: '21/07/2026',
    items: [
      { id: 'h3', title: 'Arquitetura Modular do Frontend concluída', description: 'Remoção de re-exports legados e consolidação em `src/modules`.' },
      { id: 'h4', title: 'Dashboard Executivo', description: 'Métricas consolidadas de Engenharia, CRM, Propostas, REURB, Financeiro e RH.' },
      { id: 'h5', title: 'Módulo Financeiro', description: 'Contas a pagar, a receber e lançamentos persistidos no Supabase.' },
      { id: 'h6', title: 'Módulo REURB', description: 'Núcleos, lotes e beneficiários migrados para o banco de dados.' }
    ]
  },
  {
    id: '2026-07-20',
    date: '20/07/2026',
    items: [
      { id: 'h7', title: 'Autenticação real com Supabase Auth', description: 'Login, logout e carregamento de perfil de usuário.' },
      { id: 'h8', title: 'Controle de visibilidade por papel (RBAC-001)', description: 'Restrição de menus e rotas por perfil de acesso.' },
      { id: 'h9', title: 'Migração inicial do banco de dados', description: 'Schema PostgreSQL com RLS e triggers de auditoria.' }
    ]
  }
];

export const documents: DocumentRef[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Técnico',
    description: 'Levantamento inicial de processos, dores e oportunidades identificadas para o ERP.',
    status: 'available',
    href: '/docs/diagnostico.md'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    description: 'Planejamento de fases e entregas funcionais do produto (ROADMAP.md).',
    status: 'available',
    href: '/docs/roadmap.md'
  },
  {
    id: 'plano-tecnico',
    title: 'Plano Técnico',
    description: 'Especificações técnicas detalhadas das reorganizações e módulos do sistema.',
    status: 'available',
    href: '/docs/plano-tecnico.md'
  },
  {
    id: 'arquitetura',
    title: 'Arquitetura',
    description: 'Visão geral da arquitetura modular do frontend e do backend Supabase.',
    status: 'available',
    href: '/docs/arquitetura.md'
  },
  {
    id: 'decisoes-tecnicas',
    title: 'Decisões Técnicas',
    description: 'Registro histórico das decisões de engenharia tomadas ao longo do projeto (DECISOES_TECNICAS.md).',
    status: 'available',
    href: '/docs/decisoes-tecnicas.md'
  },
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Manual de identidade visual, tipografia, paleta de cores e guia de componentes do ERP.',
    status: 'available',
    href: '/docs/design-system.md'
  },
  {
    id: 'gestao-acessos-doc',
    title: 'Gestão de Acessos',
    description: 'Mapeamento de papéis, permissões de usuários e fluxos operacionais de acesso no painel.',
    status: 'available',
    href: '/docs/gestao-acessos.md'
  },
  {
    id: 'auditoria-ux-ui',
    title: 'Auditoria de UX/UI',
    description: 'Levantamento completo de melhorias de interface, ergonomia visual e experiência de uso no ERP.',
    status: 'available',
    href: '/docs/auditoria-ux-ui.md'
  },
  {
    id: 'arquitetura-responsiva',
    title: 'Arquitetura Responsiva',
    description: 'Planejamento e especificações técnicas de breakpoints, menus e layouts mobile (UX-002).',
    status: 'available',
    href: '/docs/arquitetura-responsiva.md'
  },
  {
    id: 'padrao-visual-premium',
    title: 'Padrão Visual Premium',
    description: 'Especificações de refinamento estético, microinterações e padrão visual do ERP (UX-004).',
    status: 'available',
    href: '/docs/padrao-visual-premium.md'
  },
  {
    id: 'contrato',
    title: 'Contrato',
    description: 'Documento contratual do projeto de desenvolvimento do Ravem ERP.',
    status: 'coming_soon'
  }
];
