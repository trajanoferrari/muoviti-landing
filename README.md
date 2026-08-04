# trajanoferrari.it

Site do Trajano Ferrari — Cardio Dance Brasil, Catania.
Público-alvo: donos e diretores técnicos de academia em Catania.
Ação única: ligar ou mandar mensagem no WhatsApp.

**Idioma:** o site é **só em italiano**. Esta documentação e os
comentários do código são em português.

---

## Stack

| Camada | Escolha |
|---|---|
| Framework | Astro 7, TypeScript strict, sem framework de UI |
| CSS | CSS nativo com custom properties. Sem Tailwind |
| Banco / Auth / Storage | Supabase (plano free) |
| Hospedagem | Netlify, build automático via GitHub |
| Vídeo | MP4 auto-hospedado em `public/video`. Zero embed do Instagram |
| Analytics | nenhum nesta versão |

Sem embed de terceiro: pesa, quebra quando o post muda e instala cookie
de terceiro — o que obrigaria a banner de consentimento GDPR.

---

## Rodar na sua máquina

```bash
npm install
cp .env.example .env    # depois preencher as duas chaves do Supabase
npm run dev             # abre em http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera o site final em `dist/` |
| `npm run preview` | serve o `dist/` localmente |
| `npm run check` | verifica erros de tipo (Astro + TypeScript) |

---

## Variáveis de ambiente

Precisam existir no `.env` local **e** no Netlify
(*Site configuration → Environment variables*):

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

São `PUBLIC_` porque o cliente Supabase roda no navegador: a chave anon
foi feita para ser exposta. O que protege os dados é a RLS, não o sigilo
da chave. A chave `service_role` nunca entra neste repositório.

---

## Estrutura

```
src/
  pages/
    index.astro           ← home (fase 2)
    diario/index.astro    ← lista de posts
    diario/post.astro     ← post individual (ver nota abaixo)
    admin/index.astro     ← login + editor
    grazie.astro          ← destino do formulário sem JS
  components/             ← uma seção por componente (fase 2)
  styles/
    tokens.css            ← única fonte de cor e tipografia
    base.css              ← reset e bases de acessibilidade
  lib/
    supabase.ts           ← cliente + tipo Post + slugify
    contatto.ts           ← número de WhatsApp, em um lugar só
    diario.ts             ← consultas do diário, com teto de espera
    markdown.ts           ← markdown simples, escrito à mão
    countUp.ts            ← contador dos números (fase 3)
    reveal.ts             ← reveal de seção (fase 3)
supabase/
  migrations/             ← schema do banco, já aplicado
public/
  img/  video/  robots.txt
```

---

## Supabase

Projeto em uso:

| | |
|---|---|
| Conta | `trajanoferrari@gmail.com`, organização **Trajano Ferrari** |
| URL | `https://ojmccvnopinkbnpbgrof.supabase.co` |
| Painel | https://supabase.com/dashboard/project/ojmccvnopinkbnpbgrof |
| Plano | free, € 0/mês |

O schema fica em `supabase/migrations/`, e as migrações são idempotentes:
podem ser rodadas de novo no *SQL Editor* sem estragar nada.

- `0001_posts.sql` — tabela `posts` + RLS
- `0002_storage_blog.sql` — bucket `blog` + policies

### Verificação

O schema foi criado à mão no *SQL Editor* e depois conferido no banco.
Estrutura: tabela `posts`, RLS ligada, 2 policies em `posts`, bucket
`blog` público, 4 policies no bucket, índice de data. Todo presente.

Comportamento testado assumindo cada papel:

- [x] `anon` lê apenas os posts com `pubblicato = true`
- [x] `anon` tentando escrever é recusado
- [x] `authenticated` consegue inserir *(era o bug do SQL do briefing)*
- [x] bucket `blog` existe e é público

O auditor de segurança do Supabase levanta dois avisos, ambos conhecidos
e aceitos:

1. `auth full access` é permissiva para qualquer autenticado. É o desenho
   pedido no briefing — um único usuário admin. **Só é segura com o
   cadastro público desligado** (ver abaixo).
2. O bucket `blog` permite listar arquivos. A policy está restrita a
   `authenticated`, ou seja, só o admin lista. Visitante não.

### Projeto antigo, a apagar

Existe um `trajanoferrari-it` idêntico na conta `crosscardioitalia@gmail.com`
(`xjtwzhavbyiiwsivvcst`), criado antes de saber qual conta era a certa.
**Deve ser apagado**: dois projetos com o mesmo schema é o tipo de coisa
que faz o site apontar para o banco errado sem ninguém perceber.

### ⚠️ Dois passos manuais, antes de o site ir ao ar

1. **Desativar o cadastro público.**
   https://supabase.com/dashboard/project/ojmccvnopinkbnpbgrof/auth/providers
   → **Email** → desligar **“Allow new users to sign up”** → Save.
   O Supabase deixa isso **ligado** por padrão, e a policy de escrita vale
   para qualquer usuário autenticado: com o cadastro aberto, qualquer
   pessoa poderia se registrar e ganhar acesso de escrita no diário.
   Este é o mais importante dos dois.
2. **Criar o usuário único do `/admin`.**
   https://supabase.com/dashboard/project/ojmccvnopinkbnpbgrof/auth/users
   → **Add user** → **Create new user**, marcando “auto confirm”.
   A senha não deve passar pelo chat.

Depois do passo 2, reforço recomendado: na policy `auth full access`,
trocar os `true` por `auth.uid() = '<uid-do-usuário>'`. Assim a escrita
fica amarrada àquele usuário, e não ao papel em geral.

### Três correções em relação ao SQL do briefing

1. **`with check` na policy autenticada.** O briefing escrevia
   `for all using (auth.role() = 'authenticated')`. No `INSERT` o
   Postgres avalia `with check`, não `using`: sem `with check` a policy
   permite os `SELECT` mas **recusa qualquer inserção**, e o `/admin` não
   conseguiria publicar. Adicionado `with check (true)`.
   Verificado no banco: com a policy na forma do briefing, o `INSERT`
   como `authenticated` é recusado; com `with check`, passa.
2. **`to authenticated` em vez de `auth.role()`.** `auth.role()` está
   deprecado; o alvo de papel nativo faz o mesmo e é mais rápido
   (avaliado antes da linha, não linha por linha).
3. **Sem SELECT público no bucket `blog`.** O bucket é `public`, então as
   URLs dos arquivos já abrem sem policy: liberar o `SELECT` para `anon`
   só acrescentaria a possibilidade de listar todos os arquivos enviados.
   O `SELECT` fica com os autenticados, para a lista no `/admin`.

---

## Diário: por que `post.astro` e não `[slug].astro`

A Parte 5.2 do briefing prevê `diario/[slug].astro`. O arquivo se chama
`post.astro` por um motivo que vale registrar.

Com saída estática, `[slug].astro` exige `getStaticPaths`, que roda no
**build**. Um post novo só apareceria depois de uma nova build no
Netlify — e o critério de conclusão da fase 4 é justamente publicar pelo
`/admin` e ver no ar **sem rebuild**.

Então: uma única página, e uma reescrita em `netlify.toml` manda
`/diario/qualquer-slug` para ela com status 200 (a URL não muda). A
página lê o slug do caminho e busca no Supabase. Arquivo estático tem
precedência sobre redirect no Netlify, então `/diario` continua servindo
a própria lista.

Consequência para desenvolvimento local: em `astro preview` a reescrita
não existe, então um post se abre por
`/diario/post/?slug=nome-do-post`. Em produção o caminho limpo funciona.

O que é buscado no navegador, e não no build: a lista de `/diario`, o
post individual e a seção Diario da home. Ler é seguro de expor — a
policy `public read published` do Postgres só devolve linhas com
`pubblicato = true`, então um rascunho não sai nem se alguém chamar a API
na mão. Isso foi testado.

## Netlify

O `netlify.toml` já está configurado: build `npm run build`, publish
`dist`. Falta fazer uma vez, no painel:

1. *Add new site → Import from GitHub* → este repositório
2. Cadastrar as duas variáveis de ambiente acima
3. Ligar o domínio `trajanoferrari.it`

---

## Fases de construção

O projeto é feito em 6 fases, **uma por sessão limpa**.
Regra crítica: **nunca duas skills de design na mesma sessão** — elas se
contradizem sobre tipografia, paleta e espaçamento.

| Fase | Skill | Entrega | Status |
|---|---|---|---|
| 0 · Fundação | nenhuma | repo, Astro, Supabase, Netlify | ✅ feito |
| 1 · Plano | ~~`UI UX PRO MAX`~~ | `PLANO.md`, nenhum código | ✅ feito |
| 2 · Visual | ~~`FRONTEND-DESIGN`~~ | tokens + seções estáticas | ✅ feito |
| 3 · Movimento | `MOTION DESIGN SKILL` | contador, reveals, interstícios | a fazer |
| 4 · Diário | nenhuma | Supabase, `/admin`, `/diario` | ✅ feito |
| 5 · Auditoria | `WEB DESIGN GUIDELINES` | relatório + correções | a fazer |
| 6 · Refino | `IMPECCABLE` | remoção de ruído visual | a fazer |

Cada fase termina com um commit. Nenhuma fase começa sem a anterior
commitada.

> **Nenhuma das cinco skills de design está instalada nesta conta.** As
> fases 1 e 2 foram feitas sem elas, seguindo a especificação do
> briefing e conferindo cada decisão contra a lista de proibições da
> Parte 2.1. É substituição, não a coisa pedida — está registrado aqui
> para quem ler o repositório depois saber.

### O que a fase 2 mediu, em vez de estimar

| | |
|---|---|
| Contraste | 10 pares em uso, todos passam AA. A primeira paleta reprovava em 4 |
| Altura no celular | 11 065 px = **13,1 telas**, dentro da estimativa de 13–15 do plano |
| Rolagem horizontal | nenhuma, em 390 / 1280 / 1440 px |
| CTA do hero na dobra | sim, nos três tamanhos |
| Acessibilidade | 1 `h1`, zero saltos de título, zero imagem sem `alt`, zero campo sem `label`, zero alvo de toque < 44 px |
| Peso no celular | **329 KB** (169 KB fontes + 160 KB imagens) |
| Imagens | WebP a q72: 453 KB → 304 KB (−33%) |

---

## Débito conhecido, para as fases seguintes

- **Os vídeos estão pesados demais: `aula.mp4` 25 MB, `entrevista.mp4`
  19 MB.** Com `preload="none"` eles não afetam o LCP, mas quem aperta
  play no 4G espera demais. Precisam ser recodificados (H.264 720p,
  CRF ~24, áudio 96 kbps → algo entre 2 e 4 MB) antes de ir ao ar.
- **A foto do hero tem 960 px de largura.** Serve no celular, mas não
  cobre uma faixa sangrando no desktop — daí a coluna de 46%. A foto tem
  marca d'água *EDMAR CRUZ FOTOGRAFIA*; pedir o original em alta ao
  fotógrafo resolve resolução e uso de uma vez. Ver PLANO.md, seções G e H.
- **As imagens usadas já estão em WebP** (q72, −33%). O acervo em
  `public/img/` continua em JPG/PNG: é fonte, não é servido.
- `public/img/` contém todo o material disponível, não a seleção final:
  escolher é pendência do Trajano (ver abaixo).
- `directives/` e `execution/` são restos do antigo fluxo de empacotar
  zip, que não é mais usado. Podem ser removidos quando o Trajano
  confirmar que não servem mais.

---

## Pendências do Trajano

Sem estes itens o site não vai ao ar:

1. [ ] Baixar os 12 reels em MP4 e indicar qual entra em qual seção
2. [ ] **Foto de hero com 2400px de largura ou mais** — conduzindo a aula,
   gente em movimento ao fundo. **Bloqueia o hero da fase 2.** Nenhuma das
   19 fotos do repositório serve: a de conteúdo certo tem 399px
3. [ ] Selecionar as fotos de Chi sono (3) e Percorso (1)
4. [ ] Confirmar a média de alunas fora do verão, se for maior que 18
5. [x] ~~Criar projeto Supabase, gerar as chaves e verificar o schema~~ — feito
6. [x] ~~Confirmar o número de WhatsApp~~ — `+39 320 056 8927`
   → `https://wa.me/393200568927`

Acrescentadas na fase 0:

7. [ ] Desativar o cadastro público no Supabase *(ver acima — é o item
   mais urgente da lista)*
8. [ ] Criar o usuário único do `/admin`
9. [x] ~~Liberar escrita do repositório para o Claude no GitHub~~ — feito
   *(faltava instalar o GitHub App, não uma permissão do app OAuth)*
10. [ ] Juntar a branch da fase 0 no `main`, para o Netlify publicar
11. [ ] Cadastrar as duas variáveis de ambiente no Netlify
12. [ ] Recodificar os dois vídeos: 25 MB e 19 MB são demais para 4G
13. [x] ~~Reconectar o conector Supabase na conta pessoal~~ — feito
14. [ ] Apagar o projeto antigo na conta `crosscardioitalia@gmail.com`
