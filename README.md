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
    diario/index.astro    ← lista de posts (fase 4)
    diario/[slug].astro   ← post individual (fase 4)
    admin/index.astro     ← login + editor (fase 4)
  components/             ← uma seção por componente (fase 2)
  styles/
    tokens.css            ← única fonte de cor e tipografia
    base.css              ← reset e bases de acessibilidade
  lib/
    supabase.ts           ← cliente + tipo Post + slugify
    countUp.ts            ← contador dos números (fase 3)
    reveal.ts             ← reveal de seção (fase 3)
supabase/
  migrations/             ← schema do banco, já aplicado
public/
  img/  video/  robots.txt
```

---

## Supabase

Projeto já criado e migrado:

| | |
|---|---|
| Nome | `trajanoferrari-it` |
| Região | `eu-central-1` (Frankfurt) |
| URL | `https://xjtwzhavbyiiwsivvcst.supabase.co` |
| Plano | free, € 0/mês |

As migrações em `supabase/migrations/` já estão aplicadas. São
idempotentes: podem ser rodadas de novo no *SQL Editor* sem estragar
nada.

- `0001_posts.sql` — tabela `posts` + RLS
- `0002_storage_blog.sql` — bucket `blog` + policies

Testado direto no banco, assumindo cada papel:

- `anon` lê apenas os posts com `pubblicato = true` ✓
- `anon` tentando escrever é recusado ✓
- `authenticated` consegue inserir ✓

### ⚠️ Dois passos manuais, antes de o site ir ao ar

1. **Desativar o cadastro público.**
   *Authentication → Sign In / Providers → Email → “Allow new users to
   sign up”: desligar.* O Supabase deixa isso **ligado** por padrão, e a
   policy de escrita vale para qualquer usuário autenticado: com o
   cadastro aberto, qualquer pessoa poderia se registrar e ganhar acesso
   de escrita no diário. Este é o mais importante dos dois.
2. **Criar o usuário único do `/admin`.**
   *Authentication → Users → Add user*, marcando “auto confirm”. A senha
   não deve passar pelo chat.

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
| 1 · Plano | `UI UX PRO MAX` | `PLANO.md`, nenhum código | a fazer |
| 2 · Visual | `FRONTEND-DESIGN` | tokens + seções estáticas | a fazer |
| 3 · Movimento | `MOTION DESIGN SKILL` | contador, reveals, interstícios | a fazer |
| 4 · Diário | nenhuma | Supabase, `/admin`, `/diario` | a fazer |
| 5 · Auditoria | `WEB DESIGN GUIDELINES` | relatório + correções | a fazer |
| 6 · Refino | `IMPECCABLE` | remoção de ruído visual | a fazer |

Cada fase termina com um commit. Nenhuma fase começa sem a anterior
commitada.

---

## Débito conhecido, para as fases seguintes

- **Os vídeos estão pesados demais: `aula.mp4` 25 MB, `entrevista.mp4`
  19 MB.** Com `preload="none"` eles não afetam o LCP, mas quem aperta
  play no 4G espera demais. Precisam ser recodificados (H.264 720p,
  CRF ~24, áudio 96 kbps → algo entre 2 e 4 MB) antes de ir ao ar.
- **As imagens são PNG/JPG não otimizados** (`lifestyle.png` 788 KB,
  `hero.png` 688 KB). Converter para WebP na fase 2, sempre com `width`
  e `height` declarados.
- `public/img/` contém todo o material disponível, não a seleção final:
  escolher é pendência do Trajano (ver abaixo).
- `directives/` e `execution/` são restos do antigo fluxo de empacotar
  zip, que não é mais usado. Podem ser removidos quando o Trajano
  confirmar que não servem mais.

---

## Pendências do Trajano

Sem estes itens o site não vai ao ar:

1. [ ] Baixar os 12 reels em MP4 e indicar qual entra em qual seção
2. [ ] Selecionar as fotos: 1 hero · 3 Chi sono · 1 Percorso
3. [ ] Confirmar a média de alunas fora do verão, se for maior que 18
4. [x] ~~Criar projeto Supabase e gerar as duas chaves~~ — feito
5. [ ] Confirmar o número de WhatsApp que vai no CTA
   *(no site antigo havia só `trajano.ferrari@gmail.com`, nenhum número)*

Acrescentadas na fase 0:

6. [ ] Desativar o cadastro público no Supabase *(ver acima — é o item
   mais urgente da lista)*
7. [ ] Criar o usuário único do `/admin`
8. [ ] Liberar escrita do repositório para o Claude no GitHub
9. [ ] Ligar o repositório ao Netlify e cadastrar as duas variáveis
10. [ ] Recodificar os dois vídeos: 25 MB e 19 MB são demais para 4G
