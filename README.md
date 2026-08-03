# trajanoferrari.it

Sito di Trajano Ferrari — Cardio Dance Brasil, Catania.
Pubblico di riferimento: titolari e direttori tecnici di palestra a Catania.
Azione unica: chiamare o scrivere su WhatsApp.

Lingua del sito: **solo italiano**.

---

## Stack

| Livello | Scelta |
|---|---|
| Framework | Astro 7, TypeScript strict, nessun framework UI |
| CSS | CSS nativo con custom properties. Nessun Tailwind |
| Database / Auth / Storage | Supabase (piano free) |
| Hosting | Netlify, build automatica da GitHub |
| Video | MP4 autoospitato in `public/video`. Nessun embed Instagram |
| Analytics | nessuno in questa versione |

Niente embed di terze parti: pesano, si rompono quando il post cambia e
installano cookie di terza parte — che obbligherebbero al banner GDPR.

---

## Sviluppo locale

```bash
npm install
cp .env.example .env    # poi inserire le due chiavi Supabase
npm run dev             # http://localhost:4321
```

| Comando | Cosa fa |
|---|---|
| `npm run dev` | server di sviluppo |
| `npm run build` | build statica in `dist/` |
| `npm run preview` | serve `dist/` in locale |
| `npm run check` | typecheck di Astro + TypeScript |

---

## Variabili d'ambiente

Servono in `.env` in locale **e** su Netlify
(*Site configuration → Environment variables*):

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

Sono `PUBLIC_` perché il client Supabase gira nel browser: la chiave anon è
pensata per essere esposta. Quello che protegge i dati è la RLS, non il
segreto della chiave. La `service_role` non entra mai in questo repo.

---

## Struttura

```
src/
  pages/
    index.astro           ← home (fase 2)
    diario/index.astro    ← elenco post (fase 4)
    diario/[slug].astro   ← post singolo (fase 4)
    admin/index.astro     ← login + editor (fase 4)
  components/             ← una sezione per componente (fase 2)
  styles/
    tokens.css            ← unica fonte di colore e tipografia
    base.css              ← reset e basi di accessibilità
  lib/
    supabase.ts           ← client + tipo Post + slugify
    countUp.ts            ← contatore numeri (fase 3)
    reveal.ts             ← reveal di sezione (fase 3)
supabase/
  migrations/             ← schema, da applicare sul progetto
public/
  img/  video/  robots.txt
```

---

## Supabase

Progetto già creato e migrato:

| | |
|---|---|
| Nome | `trajanoferrari-it` |
| Regione | `eu-central-1` (Francoforte) |
| URL | `https://xjtwzhavbyiiwsivvcst.supabase.co` |
| Piano | free, 0 €/mese |

Le migrazioni in `supabase/migrations/` sono già applicate. Sono
idempotenti: si possono rieseguire nel *SQL Editor* senza danni.

- `0001_posts.sql` — tabella `posts` + RLS
- `0002_storage_blog.sql` — bucket `blog` + policy

Verificato sul database, impersonando i ruoli:

- `anon` legge solo i post con `pubblicato = true` ✓
- `anon` in scrittura viene rifiutato ✓
- `authenticated` inserisce ✓

### ⚠️ Da fare a mano, prima di andare online

1. **Disattivare la registrazione pubblica.**
   *Authentication → Sign In / Providers → Email → “Allow new users to
   sign up”: off.* Supabase la lascia **attiva** per default, e la policy
   di scrittura vale per qualsiasi utente autenticato: con la
   registrazione aperta, chiunque potrebbe iscriversi e ottenere accesso
   in scrittura al diario. Questo è il punto più importante dei due.
2. **Creare l'utente unico di `/admin`.**
   *Authentication → Users → Add user*, con “auto confirm”. La password
   non deve passare da qui.

Dopo il punto 2, irrobustimento consigliato: sostituire nella policy
`auth full access` i `true` con `auth.uid() = '<uid-dell-utente>'`. Così
la scrittura è legata a quell'utente e non al ruolo in generale.

### Tre correzioni rispetto allo SQL del briefing

1. **`with check` sulla policy autenticata.** Il briefing scriveva
   `for all using (auth.role() = 'authenticated')`. Su `INSERT` Postgres
   valuta `with check`, non `using`: senza `with check` la policy passa i
   `SELECT` ma **rifiuta ogni inserimento**, e `/admin` non riuscirebbe a
   pubblicare. Aggiunto `with check (true)`.
   Verificato sul database: con la policy nella forma del briefing,
   l'`INSERT` come `authenticated` viene rifiutato; con `with check`
   passa.
2. **`to authenticated` invece di `auth.role()`.** `auth.role()` è
   deprecato; il target di ruolo nativo fa la stessa cosa ed è più veloce
   (valutato prima della riga, non per riga).
3. **Nessun SELECT pubblico sul bucket `blog`.** Il bucket è `public`,
   quindi gli URL degli oggetti si aprono già senza policy: aprire il
   `SELECT` ad `anon` avrebbe aggiunto solo la possibilità di elencare
   tutti i file caricati. Il `SELECT` resta agli autenticati, per la
   lista in `/admin`.

---

## Netlify

`netlify.toml` è già configurato: build `npm run build`, publish `dist`.
Da fare una volta sola nella dashboard:

1. *Add new site → Import from GitHub* → questo repo
2. Impostare le due variabili d'ambiente qui sopra
3. Collegare il dominio `trajanoferrari.it`

---

## Fasi di costruzione

Il progetto si costruisce in 6 fasi, **una per sessione pulita**.
Regola critica: **mai due skill di design nella stessa sessione** — si
contraddicono su tipografia, palette e spaziatura.

| Fase | Skill | Consegna | Stato |
|---|---|---|---|
| 0 · Fondazione | nessuna | repo, Astro, Supabase, Netlify | ✅ fatto |
| 1 · Piano | `UI UX PRO MAX` | `PLANO.md`, nessun codice | da fare |
| 2 · Visuale | `FRONTEND-DESIGN` | token + sezioni statiche | da fare |
| 3 · Movimento | `MOTION DESIGN SKILL` | contatore, reveal, interstizi | da fare |
| 4 · Diario | nessuna | Supabase, `/admin`, `/diario` | da fare |
| 5 · Audit | `WEB DESIGN GUIDELINES` | report + correzioni | da fare |
| 6 · Rifinitura | `IMPECCABLE` | togliere rumore visivo | da fare |

Ogni fase si chiude con un commit. Nessuna fase parte se la precedente
non è committata.

---

## Debito noto, da affrontare nelle fasi successive

- **I video sono troppo pesanti: `aula.mp4` 25 MB, `entrevista.mp4` 19 MB.**
  Con `preload="none"` non toccano l'LCP, ma su 4G chi premette play
  aspetta troppo. Da ricodificare (H.264 720p, CRF ~24, audio 96 kbps →
  circa 2–4 MB) prima di andare online.
- **Le immagini sono PNG/JPG non ottimizzati** (`lifestyle.png` 788 KB,
  `hero.png` 688 KB). Da convertire in WebP nella fase 2, con `width` e
  `height` sempre dichiarati.
- `public/img/` contiene tutto il materiale disponibile, non la selezione
  finale: la scelta è una pendenza di Trajano (vedi sotto).
- `directives/` e `execution/` sono resti del vecchio flusso di
  pacchettizzazione zip, non più usato. Si possono rimuovere quando
  Trajano conferma che non servono.

---

## Pendenze di Trajano

Senza questi punti il sito non va online:

1. [ ] Scaricare i 12 reel in MP4 e indicare quale va in quale sezione
2. [ ] Selezionare le foto: 1 hero · 3 Chi sono · 1 Percorso
3. [ ] Confermare la media di iscritte fuori dall'estate, se supera 18
4. [x] ~~Creare il progetto Supabase e generare le due chiavi~~ — fatto
5. [ ] Confermare il numero WhatsApp del CTA
   *(nel vecchio sito c'era solo `trajano.ferrari@gmail.com`, nessun numero)*

Aggiunte in fase 0:

6. [ ] Disattivare la registrazione pubblica su Supabase *(vedi sopra —
   è la voce più urgente della lista)*
7. [ ] Creare l'utente unico di `/admin`
8. [ ] Collegare il repo a Netlify e impostare le due variabili
9. [ ] Ricodificare i due video: 25 MB e 19 MB sono troppi per il 4G
