# Design System e UX - Ravem ERP

> Documento canonico de governanca visual, UX e acessibilidade do Ravem ERP.

---

## 1. Objetivo

O Design System do Ravem ERP existe para garantir consistencia visual, reducao de fadiga operacional e velocidade de entrega nos modulos internos da empresa.

Este documento define as regras que devem orientar novas telas, refatores visuais e revisoes antes de commit.

---

## 2. Principios de UX

1. **Interface operacional primeiro**: o ERP deve priorizar leitura rapida, comparacao de dados, repeticao de tarefas e baixa fadiga visual.
2. **Clareza acima de decoracao**: evitar elementos visuais que nao ajudem o usuario a decidir ou executar uma acao.
3. **Consistencia reduz custo cognitivo**: botoes, campos, badges, tabelas e modais devem seguir os mesmos padroes em todos os modulos.
4. **Feedback imediato**: toda acao interativa deve ter estado visual de hover, foco, loading, sucesso ou erro quando aplicavel.
5. **Acessibilidade e contraste sao obrigatorios**: tema claro e tema escuro devem ser legiveis em componentes, alertas, tabelas e formularios.
6. **Restraicao visual como padrao premium**: novas telas devem seguir o `UX-004`, usando menos caixas, hierarquia mais clara, status semanticos e texto operacional objetivo.

---

## 3. Tokens Oficiais

Os tokens oficiais ficam em `src/index.css` e devem ser consumidos por classes semanticas do Tailwind.

### Identidade visual incremental aprovada

Esta evolucao visual nao altera a direcao do produto. Ela consolida uma linguagem operacional mais madura para reduzir a sensacao de "tudo branco" e aumentar consistencia entre modulos.

Diretrizes obrigatorias para novas telas:

- **Fundo geral**: usar `bg-background`, que representa um cinza-azulado muito leve. Evitar `bg-white` como fundo de pagina.
- **Cards leves**: usar `bg-card`, `border-border`, `rounded-xl` ou `rounded-2xl` em paineis de destaque. Cards devem parecer elevados de forma discreta, sem sombras pesadas.
- **Sombras suaves**: preferir `shadow-flat`, `shadow-xs`, `shadow-soft` e `shadow-soft-md`. Evitar `shadow-2xl` fora de modais, drawers e overlays.
- **Cantos mais arredondados**: formularios, cards, filtros e botoes devem usar raio visual consistente (`rounded-lg`, `rounded-xl` ou `rounded-2xl` conforme hierarquia).
- **Mais respiro**: secoes principais devem usar `p-5`, `p-6` ou `p-8`; listas internas podem usar `p-3`/`p-4`. Evitar telas densas sem agrupamento.
- **Azul consistente**: a cor azul institucional (`primary`, `info` e tons `primary/10`) deve ser o acento principal para navegacao, botoes primarios, foco e estados ativos.
- **Status semantico controlado**: verde, amarelo e vermelho continuam reservados para sucesso, alerta e erro/urgencia. Nao usar essas cores como decoracao.
- **Hierarquia operacional**: Home e dashboards devem priorizar "o que precisa de atencao", "indicadores essenciais" e "atalhos de acao"; evitar composicoes de landing page.
- **Padrao premium incremental**: aplicar `docs/19-padrao-visual-premium-ux004.md` em novos modulos e refatores visuais.

### Cores

- Usar `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `border-border`, `text-muted-foreground`.
- Usar `bg-primary`, `text-primary`, `text-primary-foreground` para acoes principais.
- Usar `bg-primary/10`, `border-primary/20` e `text-primary` para destaques informativos e estados ativos leves.
- Usar status semanticos: `success`, `warning`, `destructive` e `info`.
- Para status sutis, sempre usar o par de fundo e texto:
  - `bg-success-subtle` com `text-success-subtle-foreground`
  - `bg-warning-subtle` com `text-warning-subtle-foreground`
  - `bg-destructive-subtle` com `text-destructive-subtle-foreground`
  - `bg-info-subtle` com `text-info-subtle-foreground`

### Tipografia

- Fonte principal: Inter Variable via `@fontsource-variable/inter`.
- Usar escalas compactas para telas operacionais.
- Preferir `text-xs` para conteudo denso, `text-sm` para titulos internos e `text-lg` ou maior apenas em cabecalhos principais.
- Evitar tipos grandes em paineis densos quando prejudicar leitura.

### Padronizacao de Cabecalhos e Breadcrumbs (Obrigatorio)

- **Proibicao da palavra "Modulo"**: Os trilhos de `Breadcrumbs` devem conter apenas a rota direta (ex: `Inicio > Financeiro`, `Inicio > Juridico`, `Inicio > Recursos Humanos`, `Inicio > REURB`, `Inicio > Pessoas`). É expressamente proibido usar prefixos como "Modulo", "Modulo Operacional de" ou "Modulo de".
- **Hierarquia de Titulos (`<h1>` / `<h2>`)**: Todos os titulos principais de cabecalho devem usar rigorosamente `text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-slate-100`.
- **Subtitulos e Descricoes**: Todas as descricoes de cabecalho devem usar `text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl`.
- **Espacamento e Margens**: O container do cabecalho principal em todas as paginas deve usar padding uniforme de `px-6 py-5 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0`.

### Raios e bordas

- Componentes devem usar `rounded-lg`, `rounded-xl` ou `rounded-2xl` conforme a hierarquia.
- Cards simples e controles compactos: `rounded-lg` ou `rounded-xl`.
- Paineis de destaque, Home e blocos de resumo: `rounded-2xl`.
- Bordas devem ser discretas com `border-border`.

### Sombras

- Elementos em repouso: `shadow-flat` ou `shadow-xs`.
- Cards interativos em hover: `shadow-soft`.
- Modais e overlays: `shadow-2xl` permitido.
- Evitar sombra pesada em grids com muitos cards, pois aumenta fadiga visual.

---

## 4. Componentes Base

Componentes reutilizaveis oficiais ficam em `src/components/ui`.

Componentes aprovados:

- `Button`
- `Input`
- `Textarea`
- `Select`
- `Badge`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

Novas telas devem usar esses componentes antes de criar classes avulsas. Criar componente novo somente quando houver repeticao real, padrao recorrente ou comportamento que mereca encapsulamento.

---

## 5. Tema Claro e Escuro

O tema e controlado por `ThemeProvider` em `src/shared/context/ThemeContext.tsx`.

Regras:

- O tema deve alternar pela classe `.dark` no elemento `html`.
- A escolha deve ser persistida em `localStorage`.
- O navegador deve receber `color-scheme` coerente com o tema ativo.
- Componentes novos nao devem depender apenas de classes fixas como `text-slate-*`, `bg-white`, `bg-slate-900`, `text-amber-*` ou `text-rose-*` quando houver token semantico equivalente.
- Toda nova cor usada em dark mode deve ser testada sobre o fundo real.

---

## 6. Estados Obrigatorios

### Formularios

- Todo campo deve ter label visivel ou `aria-label`.
- Inputs de email devem usar `type="email"`.
- Campos obrigatorios devem comunicar obrigatoriedade no label ou validacao.
- Erros devem aparecer proximos ao campo quando houver fluxo de formulario completo.
- Placeholders sao auxiliares, nao substituem labels.

### Botoes

- Usar `Button` para acoes.
- Botoes somente com icone devem ter `aria-label`.
- Acoes destrutivas devem usar variante `destructive` e confirmacao quando houver risco de perda.
- Acoes assincronas devem usar estado `loading`.

### Tabelas

- Usar cabecalhos claros (`thead`, `th`).
- Tabelas largas devem ficar em `overflow-x-auto`.
- Status em tabelas devem usar `Badge`.
- Datas, valores e IDs devem ter hierarquia visual discreta.

### Alertas

- Alertas devem usar tokens semanticos.
- Nunca usar texto escuro fixo sobre fundo escuro.
- Mensagem de erro deve indicar proximo passo quando possivel.

### Modais e overlays

- Fundo deve ter scrim suficiente para separar figura/fundo.
- O modal deve usar `Card` ou componente equivalente.
- Acoes principais devem ficar no rodape.
- Fechamento deve ser claro e acessivel.

---

## 7. Acessibilidade

Checklist minimo:

- Elementos interativos precisam de foco visivel (`focus-visible`).
- Botoes de icone precisam de `aria-label`.
- Labels devem estar associadas aos controles quando o formulario for funcional.
- Contraste deve ser validado em tema claro e escuro.
- Loading textual deve usar reticencias consistentes quando aplicavel.
- Conteudo longo deve usar `truncate`, `line-clamp` ou `break-words`.

---

## 8. Padroes Visuais Proibidos

Evitar:

- Gradientes decorativos sem funcao operacional.
- Cards dentro de cards sem necessidade.
- Cores hardcoded quando existir token semantico.
- `transition-all` em novos componentes.
- `outline-none` sem substituto `focus-visible`.
- Texto com baixo contraste no tema escuro.
- Hero/landing page para funcionalidades internas do ERP.

---

## 9. Playground de Homologacao

O playground oficial fica em `/dev/playground` e deve refletir os componentes e estados aprovados.

Sempre que um token ou componente base mudar:

1. Atualizar o componente em `src/components/ui`.
2. Atualizar os exemplos no playground.
3. Validar tema claro e escuro.
4. Rodar `npm.cmd run lint`.
5. Rodar `npm.cmd run build`.

---

## 10. Checklist Antes de Commit

Antes de commitar alteracoes visuais:

- [ ] Usa tokens semanticos em vez de cores hardcoded sempre que possivel.
- [ ] Funciona em tema claro.
- [ ] Funciona em tema escuro.
- [ ] Estados de hover, foco, disabled e loading foram considerados.
- [ ] Contraste de alertas, badges e textos secundarios foi verificado.
- [ ] `npm.cmd run lint` passou.
- [ ] `npm.cmd run build` passou.
- [ ] O playground foi atualizado quando componente/tokens mudaram.

---

## 11. Referencias Internas

- Tokens: `src/index.css`
- Componentes base: `src/components/ui`
- Tema: `src/shared/context/ThemeContext.tsx`
- Playground: `src/modules/dev/DesignSystemPlayground.tsx`
- Status operacional: `PROJECT_STATUS.md`
- Padrao visual premium: `docs/19-padrao-visual-premium-ux004.md`
