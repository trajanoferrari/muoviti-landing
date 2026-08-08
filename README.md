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

### ⚠️ A pegadinha das duas chaves do Email

Em *Authentication → Sign In / Providers* existem **duas** chaves parecidas,
e confundir uma com a outra tranca você fora do `/admin`:

| Chave | Deve estar | O que faz |
|---|---|---|
| **Enable Email provider** | ✅ **LIGADA** | permite entrar com e-mail e senha |
| **Allow new users to sign up** | ❌ desligada | impede estranhos de criar conta |

Aconteceu de verdade: desligar o provedor inteiro em vez de só o cadastro
produziu `422: email_provider_disabled` no login **e** no envio do e-mail
de recuperação de senha — então nem apagar e recriar o usuário resolvia.

**Como diagnosticar rápido** se o login voltar a falhar: os logs de
autenticação do Supabase dizem o motivo exato. Pelo MCP,
`get_logs(service: "auth")`; no painel, *Logs → Auth*. Foi assim que este
caso foi resolvido, sem precisar de print de tela.

Nota sobre o e-mail: o SMTP compartilhado do plano free é limitado e
costuma falhar. Recuperação de senha por e-mail não é caminho confiável
aqui — para trocar a senha, apagar e recriar o usuário no painel
(digitando a senha na hora) funciona sempre. Nada está ligado ao usuário:
a tabela `posts` não guarda referência a quem escreveu.

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

## Vídeos: o que falta e como trocar

O mapeamento reel → seção está em **`src/lib/video.ts`**. Os arquivos
definitivos ainda não estão no repositório: hoje as sete posições são
servidas pelos dois MP4 provisórios que já existiam.

| Seção | Nome do arquivo esperado | Reel |
|---|---|---|
| 3 · Guarda | `principale.mp4` | `DU0e_W8Dfwk` |
| 4 · Metodo | `sala-1.mp4` | `DbP7sZRs2jN` |
| 4 · Metodo | `sala-2.mp4` | `DOjDmMYDCYl` |
| 4 · Metodo | `coreografia.mp4` | `DWwtYhGDYEG` |
| 7 · Cosa dicono | `testimonianza-1.mp4` | `DXusLJrjbIj` |
| 7 · Cosa dicono | `testimonianza-2.mp4` | `DXwicdjjLYN` |
| 7 · Cosa dicono | `testimonianza-3.mp4` | `DX08K9HEYLX` |

Reservas da seção 4, fora do site: `DADTtFqsM9J`, `C_41k9BM0Jb`.

**Para trocar:** salve o MP4 em `public/video/` com o nome da coluna do
meio e, em `src/lib/video.ts`, troque `src` para o valor de `file`. Uma
linha por vídeo. Nenhum componente precisa ser tocado.

**Sem embed do Instagram, por decisão do briefing (5.1):** script de
terceiro pesa, quebra quando o post muda e instala cookie de terceiro —
o que obrigaria a banner de consentimento GDPR. Auto-hospedar elimina os
três problemas de uma vez.

Recodificar antes de subir: H.264 720p, CRF ~24, áudio 96 kbps, algo
entre 2 e 4 MB por arquivo.

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

### ⚠️ O site NÃO está ligado ao GitHub

O projeto `wonderful-liger-b703cf` (domínio `trajanoferrari.it`) foi criado
por **Netlify Drop** — arrastando uma pasta. Todos os deploys aparecem como
*"Build from drop deployment"*, e o último é de 8 de julho.

Consequência: **`git push` não publica nada.** Não há build acontecendo no
Netlify, o `netlify.toml` não é lido, e as variáveis de ambiente não têm
efeito — elas só valem durante um build.

Eu havia marcado a fase 0 como concluída por ter configurado o
`netlify.toml`, mas o critério do briefing é *"página no ar no domínio via
`git push`"*, e isso nunca chegou a funcionar. Não era verificável do lado
do Claude: não há acesso à API do Netlify nesta sessão.

**Para resolver**, no painel:

1. *Project configuration → Build & deploy → Continuous deployment →*
   **Link repository** → GitHub → `muoviti-landing`, branch `main`
2. Build command e publish directory: deixar como vêm — estão no
   `netlify.toml`
3. *Project configuration → Environment variables*: cadastrar as duas
   variáveis acima
4. *Deploys → Trigger deploy → Deploy site*

Se a opção de ligar repositório não existir para um site criado por Drop,
o caminho é criar um site novo a partir do GitHub e mover o domínio
`trajanoferrari.it` para ele.

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
| 3 · Movimento | (sem skill) | contador, reveals, interstícios | ✅ feito |
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

1. [~] Reels: o mapeamento por seção **está feito** (ver acima). Faltam os
   **arquivos MP4** — não é possível baixar do Instagram do ambiente do
   Claude, e o site não usa embed por decisão do briefing
2. [ ] **Foto de hero com 2400px de largura ou mais** — conduzindo a aula,
   gente em movimento ao fundo. **Bloqueia o hero da fase 2.** Nenhuma das
   19 fotos do repositório serve: a de conteúdo certo tem 399px
3. [ ] Selecionar as fotos de Chi sono (3) e Percorso (1)
4. [ ] Confirmar a média de alunas fora do verão, se for maior que 18
5. [x] ~~Criar projeto Supabase, gerar as chaves e verificar o schema~~ — feito
6. [x] ~~Confirmar o número de WhatsApp~~ — `+39 320 056 8927`
   → `https://wa.me/393200568927`

Acrescentadas na fase 0:

7. [x] ~~Desativar o cadastro público no Supabase~~ — feito
   *(não verificável pelo Claude: a config fica na plataforma, não no banco)*
8. [x] ~~Criar o usuário único do `/admin`~~ — `trajanoferrari@gmail.com`,
   confirmado, com senha
9. [x] ~~Liberar escrita do repositório para o Claude no GitHub~~ — feito
   *(faltava instalar o GitHub App, não uma permissão do app OAuth)*
10. [x] ~~Juntar o trabalho no `main`~~ — feito
11. [ ] 🔴 **Ligar o Netlify ao repositório do GitHub** — ver seção Netlify.
    É o que trava tudo: hoje `git push` não publica
12. [ ] 🔴 Cadastrar as duas variáveis de ambiente no Netlify
13. [ ] Mandar os 7 MP4 dos reels *(ver seção Vídeos)*
14. [x] ~~Reconectar o conector Supabase na conta pessoal~~ — feito
15. [ ] Apagar o projeto antigo na conta `crosscardioitalia@gmail.com`
16. [ ] Pedir ao Edmar Cruz o original do hero em alta, sem marca d'água
