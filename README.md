# Painel de Evolução do Projeto — Ravem ERP (Cliente)

Aplicação standalone (Vite + React + TypeScript + Tailwind v4) que exibe o
painel "Evolução do Projeto" do Ravem ERP para acesso externo do cliente,
sem depender do ERP completo.

## Rodar localmente

```bash
npm install
npm run dev
```

A aplicação sobe em `http://localhost:3002` (ou na porta exibida no terminal).

## Build de produção

```bash
npm run build
```

Isso gera a pasta `dist/`, pronta para ser publicada em qualquer provedor de
hospedagem de site estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages,
S3, etc.). Basta apontar o provedor para o conteúdo de `dist/` — não há
backend, banco de dados ou variáveis de ambiente necessárias.

Para validar o build sem rodar o Vite (útil em ambientes sandbox sem acesso
à internet para reinstalar binários nativos), também é possível checar apenas
os tipos com:

```bash
npx tsc --noEmit
```

## Como trocar a senha de acesso

A página é protegida por um gate de senha simples, client-side (ver seção
"Sobre o gate de senha" abaixo). Para trocar a senha, edite o arquivo:

```
src/config/access.ts
```

e altere o valor da constante `ACCESS_PASSWORD`. Lembre-se de trocar o valor
padrão antes de enviar o link para o cliente.

## Como atualizar o conteúdo do painel

Todo o conteúdo exibido (nome/fase/versão do projeto, etapas, últimas
entregas, comparações antes/depois, roadmap, conquistas, histórico de
atualizações e documentos) vem de um único arquivo de dados mock:

```
src/modules/project-evolution/data/mockProjectEvolution.ts
```

Para adicionar uma nova entrega, marco ou atualizar o status de uma etapa,
basta editar os arrays exportados nesse arquivo (`project`, `milestones`,
`releases`, `comparisons`, `roadmap`, `achievements`, `history`, `documents`).
Não é necessário mexer em nenhum componente visual para isso.

## Sobre o gate de senha

O arquivo `src/config/access.ts` contém um aviso detalhado sobre as
limitações desse mecanismo: é apenas uma barreira de conveniência (evita
indexação/compartilhamento casual do link) e **não** é uma proteção de
segurança real, já que a senha fica visível no bundle JavaScript publicado.
Não use esse mecanismo para proteger informações realmente confidenciais.

## Estrutura

```
src/
  App.tsx                        # Envolve a página com o PasswordGate
  main.tsx                       # Bootstrap do React
  index.css                      # Design tokens (cores, fontes, radius, shadows)
  config/
    access.ts                    # Senha de acesso e aviso de segurança
  components/
    PasswordGate.tsx             # Tela de senha (sessionStorage)
    StandaloneHeader.tsx         # Cabeçalho simples (sem sidebar/menu)
    ui/
      card.tsx
      button.tsx
      badge.tsx
  modules/
    project-evolution/
      types.ts
      data/
        mockProjectEvolution.ts  # Único arquivo a editar para novo conteúdo
      components/                # Seções visuais do painel
      pages/
        ProjectEvolutionPage.tsx
```
