# UX-004 - Padrao Visual Premium do ERP

> Documento de governanca para elevar a percepcao visual do Ravem ERP sem alterar a identidade do produto.

---

## 1. Objetivo

O `UX-004` define como novas telas e refatores devem aplicar a identidade visual evoluida do ERP: mais maturidade, menos ruido, melhor hierarquia e maior sensacao de produto premium.

Este padrao nao substitui o Design System canonico em `docs/10-design-system.md`. Ele detalha como aplicar esse Design System em telas reais.

---

## 2. Principios

1. **Restraicao visual e sinal claro**: cada borda, sombra, cor e bloco precisa ajudar a leitura ou decisao.
2. **Menos caixas, mais hierarquia**: nem toda secao precisa de card. Usar titulo, divisor e espacamento quando o agrupamento ja for claro.
3. **Contexto antes de volume**: indicadores devem explicar o que o numero significa.
4. **Cores com funcao semantica**: azul informa e orienta; verde, amarelo, laranja e vermelho comunicam estado.
5. **Movimento discreto**: microinteracoes devem confirmar interacao, nao chamar atencao para si.
6. **Operacao acima de marketing**: telas internas devem parecer ferramentas de trabalho, nao landing pages.

---

## 3. Hierarquia Recomendada

Telas operacionais devem organizar informacao por importancia:

1. **Cabecalho ou Centro de Comando**: briefing rapido, data/contexto e acao primaria quando necessaria.
2. **Prioridade recomendada**: o que fazer primeiro e por que isso importa.
3. **Fluxo principal**: fila, tabela, kanban, agenda ou formulario central da tela.
4. **Panorama operacional**: KPIs com contexto e tendencia.
5. **Informacoes complementares**: atividade recente, historico, avisos e detalhes secundarios.

Evitar grades homogeneas onde todos os blocos competem pelo mesmo peso visual.

---

## 4. Composicao Visual

### Quando usar card

Usar card quando o bloco:

- contem acao clicavel importante;
- agrupa dados que precisam de limite visual claro;
- representa um item repetido de lista;
- funciona como modal, drawer ou painel destacado.

### Quando nao usar card

Preferir titulo, divisor e espacamento quando:

- a secao ja esta clara pelo contexto;
- o conteudo e apenas complementar;
- varios cards em sequencia criariam a sensacao de "muitas caixas";
- o modulo ja possui navegacao ou atalhos globais equivalentes.

### Borda, sombra e fundo

- Blocos primarios: `bg-card`, `rounded-2xl`, `shadow-soft`, borda sutil quando o fundo for muito proximo.
- Blocos secundarios: `bg-card/70`, `shadow-flat` ou apenas divisor.
- Itens de lista: evitar borda em todos os itens; usar `divide-y`, hover leve ou fundo alternado.
- Modais: podem usar sombra mais forte, pois precisam separar figura/fundo.

---

## 5. Semantica de Cores

Estados devem ser consistentes:

| Estado | Uso | Cor |
| --- | --- | --- |
| Saudavel | Tudo em dia, resultado positivo, fluxo sob controle | `success` |
| Atencao | Requer acompanhamento, mas sem urgencia critica | `warning` |
| Aguardando | Depende de decisao, aprovacao ou resposta | laranja controlado |
| Critico | Bloqueio, atraso relevante ou risco operacional | `destructive` |
| Informativo | Contexto neutro, navegacao, foco e acao primaria | `primary` / `info` |

Regras:

- Nao usar azul para todos os estados.
- Nao usar vermelho fora de risco real.
- Nao usar verde como decoracao.
- Badges e textos devem usar pares semanticos de fundo/texto definidos em `src/index.css`.

---

## 6. Numeros e Indicadores

KPIs premium devem responder tres perguntas:

1. **Qual e o numero?**
2. **Isso e bom, ruim ou neutro?**
3. **Qual acao ou contexto decorre disso?**

Padrao recomendado:

- label pequeno e discreto;
- numero com alto contraste e peso forte;
- badge semantico curto;
- descricao de uma linha explicando contexto;
- tendencia quando existir dado comparativo.

Exemplos:

- `3 criticos` - "Leads aguardando retorno ha mais de 48h."
- `Saldo saudavel` - "Receita liquida acima das despesas registradas."
- `4 docs` - "Documentos bloqueando avancos de REURB."

---

## 7. Texto e Linguagem

Preferir comunicacao objetiva e operacional:

- "Resumo operacional do dia."
- "3 leads exigem retorno."
- "Documentacao bloqueia andamento."
- "Sem aprovacao pendente."

Evitar:

- textos institucionais longos;
- explicacoes obvias da interface;
- titulos genericos como "Dados", "Resumo", "Informacoes";
- frases que nao ajudem o usuario a decidir ou agir.

---

## 8. Microinteracoes

Microinteracoes devem ser curtas e discretas:

- hover: 120ms a 180ms;
- preferir `transform`, `opacity`, `box-shadow` e `background-color`;
- evitar animar layout complexo;
- respeitar `prefers-reduced-motion`;
- nao usar movimento decorativo continuo em telas operacionais.

Padroes recomendados:

- card clicavel: leve elevacao ou sombra;
- linha de lista: fundo sutil no hover;
- icone de navegacao: pequeno deslocamento horizontal;
- botao: contraste imediato em hover/focus.

---

## 9. Loading, Vazio e Feedback

Telas premium nao devem parecer quebradas durante ausencia de dados.

### Skeleton

Usar skeleton quando:

- dados carregam de forma assincroma;
- o layout final e previsivel;
- a tela possui KPIs, tabelas ou listas.

### Estado vazio

Estados vazios devem ser positivos e acionaveis:

- "Tudo em dia por aqui."
- "Nenhum lead critico no momento."
- "Sem solicitacoes aguardando decisao."

Evitar mensagens frias como "Nenhum registro encontrado" quando houver uma leitura operacional melhor.

---

## 10. Checklist de Revisao Visual

Antes de concluir uma nova tela ou refator visual:

- [ ] A tela tem uma prioridade visual clara?
- [ ] Existe menos de um elemento competindo como foco principal?
- [ ] Cards foram usados apenas onde ajudam a agrupar ou acionar?
- [ ] Secoes secundarias usam divisores e espacamento em vez de caixas desnecessarias?
- [ ] Numeros importantes explicam contexto, estado e proximo passo?
- [ ] Cores de status seguem a semantica aprovada?
- [ ] Hover, foco, loading e vazio foram considerados?
- [ ] O texto e direto e operacional?
- [ ] A tela funciona em tema claro e escuro?
- [ ] `npm.cmd run lint` e `npm.cmd run build` passaram quando houve alteracao de codigo.

---

## 11. Modulo Piloto Recomendado

Apos a Home, o proximo modulo recomendado para aplicar o `UX-004` e o **Financeiro**.

Motivos:

- alto impacto na percepcao de maturidade do ERP;
- dados numericos se beneficiam fortemente de hierarquia visual;
- permite validar KPIs, tabelas, formularios, estados e semantica de cores;
- serve como referencia para CRM, REURB, Propostas e RH.

Ordem sugerida:

1. Financeiro
2. CRM
3. REURB
4. Propostas
5. RH

---

## 12. Referencias

- Design System canonico: `docs/10-design-system.md`
- Decisoes tecnicas: `DECISOES_TECNICAS.md`
- Tokens visuais: `src/index.css`
- Componentes base: `src/components/ui`
- Home de referencia: `src/modules/dashboard/pages/HomePage.tsx`
