# Arquitetura Responsiva (UX-002)

## 1. Visão Geral
O Ravem ERP adota uma arquitetura **Mobile Adapted**, focada em produtividade. O ambiente Desktop permanece sendo a experiência primária e completa de operação, enquanto o Mobile e Tablet recebem interfaces próprias, em vez de apenas "encolher" as telas de desktop. A inspiração primária vem de sistemas como Notion, Linear e ClickUp.

## 2. Separação de Cabeçalhos (Headers)

Para manter o código limpo e a experiência otimizada, a estrutura de cabeçalho foi dividida de acordo com o breakpoint:

- **Desktop (`TopHeader`)**:
  - Utilizado em conjunto com a Sidebar atual fixa.
  - Preserva a experiência operacional completa e atalhos rápidos de navegação.
  
- **Mobile (`MobileHeader`)**:
  - Oculta o `TopHeader` e a Sidebar fixa.
  - Possui design mais compacto.
  - O componente Hamburguer Menu assume o protagonismo, abrindo o `MobileDrawer`.
  - Não exibe a "Central de Aplicativos" (Grid de 9 pontos), já que o Drawer é a própria navegação central.

- **Tablet**:
  - Experiência intermediária. Pode reutilizar o `MobileHeader` com uma variante específica (Drawer ou Sidebar compacta/recolhível), dependendo do contexto da tela. Não assume obrigatoriamente o mesmo comportamento do Mobile.

## 3. Fonte Única da Navegação (Single Source of Truth)

O sistema deve ter apenas uma árvore de módulos e rotas. A Sidebar (Desktop), o botão de Módulos e o Drawer (Mobile) consumirão a mesma configuração centralizada.

- **Arquivo**: `src/config/navigation.config.ts` (ou equivalente na arquitetura).
- **Estrutura Conceitual**:
  ```ts
  type NavigationItem = {
    id: string;
    label: string;
    title: string;
    path: string;
    icon: LucideIcon;
    section: NavigationSection;
    order: number;
    permission?: string;
    badge?: string | number;
    keywords?: string[];
    hidden?: boolean;
  };
  ```

## 4. Substituição da "Central de Aplicativos"
A "Central de Aplicativos" deixa de ser tratada como uma feature à parte. Ela é, na verdade, a própria **Navegação (Módulos)**.
- **Desktop**: O ícone de 9 pontos no `TopHeader` atua como um atalho secundário ou visualização em grid da Sidebar atual, consumindo a mesma fonte de dados.
- **Mobile/Tablet**: O botão não existe no Header. O Drawer centraliza o menu completo, sem duplicação de funcionalidades. A nomenclatura padronizada passa a ser "Módulos" ou "Menu de Módulos".
