/**
 * ATENÇÃO — ISTO NÃO É UMA PROTEÇÃO DE SEGURANÇA REAL.
 *
 * Este arquivo define uma senha de acesso client-side usada apenas como uma
 * barreira de CONVENIÊNCIA: evita que o link desta página seja indexado por
 * buscadores ou compartilhado casualmente sem querer.
 *
 * Qualquer pessoa com acesso ao bundle JavaScript publicado (ex: abrindo o
 * DevTools do navegador, inspecionando os arquivos em `dist/`, ou lendo o
 * código-fonte deste repositório) consegue ler o valor de ACCESS_PASSWORD
 * em texto puro. Não há backend, não há hashing, não há verificação de
 * servidor — a "autenticação" acontece inteiramente no navegador do usuário.
 *
 * Portanto:
 *  - NÃO use este mecanismo para proteger informações confidenciais de verdade.
 *  - Troque o valor abaixo antes de fazer deploy para o cliente.
 *  - Se no futuro for necessário um controle de acesso real, será preciso
 *    implementar autenticação em um backend (ex: Supabase Auth, um endpoint
 *    de verificação, etc.), e não apenas uma constante no frontend.
 */
export const ACCESS_PASSWORD = 'ravem2026';

/** Chave usada no sessionStorage para lembrar que o usuário já se autenticou nesta sessão do navegador. */
export const ACCESS_SESSION_KEY = 'pe_authenticated';
