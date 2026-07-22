# Planejamento — Painel Interno de Gestão de Usuários e Permissões

Este documento planeja a implementação de uma interface administrativa interna para gerenciar o papel (`role`) e o status (`status`) dos usuários do Ravem ERP, evitando a necessidade de intervenção direta via SQL Editor ou Supabase Dashboard para tarefas comuns de acesso.

---

## 1. Contexto e Segurança

No banco de dados (através da migration `20260720114200_init_schema.sql`), já possuímos uma função segura para essa finalidade:

```sql
public.update_user_role_status(user_id uuid, new_role app_role, new_status user_status)
```

### Características da Função Existente:
- **SECURITY DEFINER**: Executa com privilégios de superusuário para contornar restrições da tabela `auth.users`.
- **Restrição de Executor**: Apenas usuários com perfil ativo e papel `admin` no banco podem executá-la.
- **Proteção do Último Admin**: Possui uma trava interna que impede que o último administrador do sistema seja desativado ou rebaixado de cargo, prevenindo o bloqueio total do ERP.

---

## 2. Proposta de Interface e Fluxo (UI/UX)

### 2.1 Onde a Gestão será Exibida?
Propomos adicionar uma sub-aba ou área dedicada chamada **"Controle de Acessos"** dentro da tela do **Painel da Gerência (`/centro-comando`)** ou de forma isolada na barra lateral para administradores.
A aba conterá:
1. **Grid de Usuários:** Listagem de todos os perfis cadastrados contendo nome, e-mail (resolvido via metadata do auth se necessário ou puxando do `profiles`/`people`), papel atual e status.
2. **Modal de Edição de Permissões:** Permite alterar o cargo e o status de atividade (Ativo, Inativo, Suspenso).

### 2.2 Protótipo Conceitual do Modal:
```plaintext
+--------------------------------------------------------+
| Gerenciar Acesso: João da Silva                        |
+--------------------------------------------------------+
| Cargo (Papel):                                         |
| ( ) Administrador   ( ) Gerente   (*) Colaborador       |
| ( ) Parceiro        ( ) Cliente                         |
|                                                        |
| Status da Conta:                                       |
| (*) Ativo           ( ) Inativo   ( ) Suspenso          |
+--------------------------------------------------------+
| [Cancelar]                                 [Salvar]    |
+--------------------------------------------------------+
```

---

## 3. Estruturação Técnica do Incremento

Para implementar esta funcionalidade no futuro, os seguintes arquivos serão criados/modificados:

### 3.1 Camada de Dados (`src/shared/lib/adminService.ts`)
- Criar funções chamando a RPC do Supabase para listar perfis e invocar a função `update_user_role_status`.

### 3.2 Componente Visual (`src/modules/admin/AccessControl.tsx`)
- Desenvolver a tabela de gestão e o modal de edição rápida de perfil.
- Restringir visualização e carregamento desse componente apenas para usuários logados cuja role no `useAuth()` seja estritamente `admin`.

---

## 4. Próximo Passo Sugerido para Homologação

Para que você consiga testar o CRUD de Pessoas (`PPL-001`) sem ficar preso no perfil `employee` (sem poder criar novos registros):
1. **Restaurar seu Admin temporariamente no Supabase SQL Editor:**
   ```sql
   UPDATE public.profiles SET role = 'admin', status = 'active' WHERE email = 'sistemaravem@gmail.com';
   ```
2. Após testar a listagem de Pessoas como `admin`, podemos aprovar o commit atual de Pessoas (`PPL-001`).
3. Agendamos a implementação deste Painel de Usuários como a próxima tarefa prioritária da Fase 0.3 ou 1.2.
