# PLANO — trajanoferrari.it

**Fase 1.** Documento de arquitetura de informação. Nenhuma linha de código.
Entrega para aprovação do Trajano antes da Fase 2.

> Escrito **sem** a skill `UI UX PRO MAX` — ela não está instalada na conta.
> O conteúdo segue a especificação da Parte 6 do briefing: hierarquia por
> seção, wireframe ASCII desktop e mobile, pontos de decisão do leitor e
> o que cortar no celular.

---

## 1. O leitor

Uma pessoa, um momento, uma pergunta.

| | |
|---|---|
| **Quem** | Dono ou diretor técnico de academia em Catania |
| **Como chega** | QR code de um currículo impresso |
| **Onde** | Celular, provavelmente 4G |
| **Quando** | Entre duas tarefas. Em pé. Distraído |
| **Pergunta silenciosa** | *"Esse cara enche a minha sala e não me dá trabalho?"* |
| **Ação-alvo** | Ligar ou mandar WhatsApp |

Três consequências que mandam em tudo o que vem abaixo:

1. **Ele não vai ler a página inteira.** Não é preguiça, é contexto. O
   plano tem que funcionar para quem lê 20% e para quem lê 100%.
2. **A pergunta dele tem duas metades**, e a segunda é a mais esquecida.
   "Enche a sala" é atração. "Não me dá trabalho" é risco. Um site de
   professor de dança fala só da primeira. Metade da decisão dele é a
   segunda.
3. **Ele não é o público da aula.** Não decide por gostar de dança.
   Decide por sala cheia em horário morto e por não herdar problema
   burocrático.

---

## 2. Os cinco momentos da decisão

Cada momento é uma pergunta que ele faz antes de continuar rolando. Se a
seção não responder, ele sai.

```
MOMENTO 1 · "isso é pra mim?"          → HERO
            responde: o quê, onde, e a promessa
            se falha aqui, nada mais importa
                                          ↓
MOMENTO 2 · "a prova é real?"          → I NUMERI
            responde: 18 pessoas às 9h em julho
            é o único número que ele não consegue ignorar
                                          ↓
MOMENTO 3 · "isso me custa trabalho?"  → COSA PORTO
            responde: certificações, seguro, italiano
            ►►► PRIMEIRO CTA — aqui a objeção caiu
                                          ↓
MOMENTO 4 · "é bom de verdade?"        → GUARDA · METODO · COSA DICONO
            responde: vídeo, diferenciação, terceiros
            fase de confirmação, não de convencimento
                                          ↓
MOMENTO 5 · "e agora, o que me custa?" → COME LAVORIAMO
            responde: aula-teste grátis, duas semanas
            ►►► SEGUNDO CTA — aqui o risco caiu
                                          ↓
            CONTATTO
            ►►► TERCEIRO CTA + formulário
```

### Mapa de CTA

O CTA aparece onde uma objeção acabou de cair, nunca antes.

| # | Onde | Por que ali | Peso |
|---|---|---|---|
| 1 | Hero | Para quem já decidiu no currículo impresso e só quer o número | forte |
| 2 | Fim de `COSA PORTO` | Depois de *"non ti do lavoro in più"* — a objeção de risco caiu | forte |
| 3 | Fim de `COME LAVORIAMO` | Depois de *"prima lezione gratuita"* — o custo de errar caiu | forte |
| 4 | `CONTATTO` | Captura final, com alternativa para quem não quer WhatsApp | forte |

**Os quatro do briefing estão nos lugares certos.** Não mexo.

**O que falta:** entre o CTA 2 e o CTA 3 há **seis blocos** de conteúdo
(interstício, GUARDA, METODO, interstício, CHI SONO, PERCORSO, COSA
DICONO). No celular isso é um deserto de 6 a 8 telas sem ação possível.
Quem se convence no vídeo tem que rolar muito para agir.

**✅ APROVADO — botão fixo de WhatsApp no celular, só no trecho sem CTA.**

Comportamento definido:

- Aparece quando `GUARDA` entra na tela
- Desaparece quando `COME LAVORIAMO` entra na tela (ali já existe CTA
  próprio, e dois ao mesmo tempo viram ruído)
- **Só no celular.** No desktop a página é curta e os 4 CTAs bastam
- Rodapé, altura contida, sem sombra pesada, sem animação de entrada
  chamativa — o briefing pede tom contido na Parte 2.2

Não aparece no hero (já tem CTA), nem em `CONTATTO` (é a própria ação).

---

## 3. Hierarquia e wireframes

Convenção dos wireframes:
`▓` foto ou vídeo · `▔` texto grande · `─` texto corrido · `[ ]` botão
Largura mobile ≈ 360px. Desktop ≈ 1200px.

---

### 0 · HERO

**Hierarquia**

1. **Onde e o quê** — `Cardio Dance Brasil · Catania`. Localiza em 1 s.
   Ele precisa saber que é local antes de qualquer coisa.
2. **A promessa** — `Un'ora in cui nessuno guarda l'orologio.`
3. **A prova, curta** — `Sala piena tre mattine a settimana, tutto l'anno.`
4. **A ação**.

**Nota de contraste:** o briefing pede foto sangrando na borda. Texto
sobre foto num hero de celular quase sempre reprova no contraste AA. A
solução não é escurecer a foto até virar cinza: é **foto em cima, texto
em bloco sólido embaixo** no celular, e sobreposição só no desktop, onde
há área calma o suficiente para segurar o texto.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                   │
│▓▓▓  Trajano conduzindo      ▓▓▓▓▓│   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  CARDIO DANCE BRASIL · CATANIA    │
│▓▓▓  sala ao fundo           ▓▓▓▓▓│   │▓▓▓                    ▓▓▓│                                   │
│▓▓▓  sangra nas 3 bordas     ▓▓▓▓▓│   │▓▓▓  foto sangra na    ▓▓▓│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │▓▓▓  esquerda e no     ▓▓▓│  Un'ora in cui nessuno            │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │▓▓▓  topo              ▓▓▓│  guarda l'orologio.               │
├──────────────────────────────────┤   │▓▓▓                    ▓▓▓│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │
│ CARDIO DANCE BRASIL · CATANIA    │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                   │
│                                  │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  Cardio Dance Brasil a Catania.   │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  Sala piena tre mattine a         │
│ Un'ora in cui                    │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  settimana, tutto l'anno.         │
│ nessuno guarda                   │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                   │
│ l'orologio.                      │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  [ Parliamone su WhatsApp ]        │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                   │
│                                  │   └──────────────────────────────────────────────────────────────┘
│ Cardio Dance Brasil a Catania.   │
│ Sala piena tre mattine a         │   Assimetria: a foto NÃO é metade exata. Ocupa cerca de
│ settimana, tutto l'anno.         │   42% e o texto respira no resto. O briefing (2.2) pede
│                                  │   assimetria deliberada — é aqui que ela começa.
│ [ Parliamone su WhatsApp ]       │
└──────────────────────────────────┘
```

---

### Os quatro interstícios

Um componente só, `Interstizio.astro`, quatro textos. Altura **menor que
a tela cheia** — é respiro, não seção.

**Hierarquia:** só a frase. Nada mais. Sem kicker, sem número, sem
decoração. Um interstício com enfeite deixa de ser respiro.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│                                  │   │                                                              │
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔        │
│  Ore 9 del mattino.              │   │   Ore 9 del mattino. Tre volte a settimana.                  │
│  Tre volte a settimana.          │   │   Anche a luglio.                                            │
│  Anche a luglio.                 │   │   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔        │
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │                                                              │
│                                  │   │   Alinhado à esquerda, nunca centralizado (briefing 2.1).    │
└──────────────────────────────────┘   └──────────────────────────────────────────────────────────────┘
   ~55% da altura da tela                  ~45% da altura da tela
```

---

### 1 · I NUMERI

**Hierarquia**

1. **`18`** — é o número que decide. "18 pessoas às 9h da manhã em julho"
   é o fato que o diretor não consegue explicar de outra forma.
2. **`3` mattine, tutto l'anno** — constância. Ele já viu professor
   encher em setembro e esvaziar em novembro.
3. **`13` anni** — experiência.
4. **`500+` istruttori** — autoridade, mas é a que menos importa para
   ele. Formar instrutor no Brasil não enche sala em Catania.
5. **A legenda** — é ela que transforma número em argumento.

**Contra o briefing, uma sugestão:** a ordem `13 · 500 · 18 · 3` põe o
número mais forte em terceiro lugar. No celular, empilhado, o terceiro é
o que menos gente vê. Sugiro `18 · 3 · 13 · 500` — do que decide para o
que decora. Ver seção 7.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ I NUMERI                         │   │ I NUMERI                                                     │
│                                  │   │                                                              │
│  ┌────────────┐  ┌────────────┐  │   │   18          3           13          500+                   │
│  │    18      │  │     3      │  │   │   ──          ──          ──          ────                   │
│  │ persone di │  │ mattine a  │  │   │   persone di  mattine a   anni        istruttori             │
│  │ media, a   │  │ settimana, │  │   │   media, a    settimana,  davanti a   formati                │
│  │ luglio     │  │ tutto      │  │   │   luglio      tutto       una sala                           │
│  └────────────┘  └────────────┘  │   │               l'anno                                         │
│  ┌────────────┐  ┌────────────┐  │   │                                                              │
│  │    13      │  │   500+     │  │   │   Le nove del mattino, in piena estate, sono l'ora in cui    │
│  │ anni       │  │ istruttori │  │   │   le sale si svuotano. La mia no.                            │
│  │ davanti a  │  │ formati    │  │   │                                                              │
│  │ una sala   │  │            │  │   └──────────────────────────────────────────────────────────────┘
│  └────────────┘  └────────────┘  │
│                                  │   2x2 no celular, 4 colunas no desktop.
│ Le nove del mattino, in piena    │   Sem card, sem borda, sem ícone. O número
│ estate, sono l'ora in cui le     │   é grande o suficiente para ser o próprio
│ sale si svuotano. La mia no.     │   elemento gráfico.
└──────────────────────────────────┘
```

**Para a Fase 3:** o contador é o momento de movimento mais importante da
página (spec 3.1). O valor final tem que estar no HTML como texto, para
leitor de tela e para o caso de o JS falhar.

---

### 2 · COSA PORTO NELLA TUA SALA

**A seção mais importante da página.** É a única que responde a pergunta
inteira, incluindo a metade que os outros esquecem.

**Hierarquia**

1. **`Non ti do lavoro in più`** — deveria vir **primeiro**, não terceiro.
   É a objeção real de quem contrata: burocracia, seguro, comunicação em
   sala. É o que o concorrente dele não resolve.
2. **`Riempio la sala — e resta piena`** — a prova de atração.
3. **`Le persone tornano`** — a prova de retenção.
4. **CTA.**

**Nota:** o briefing ordena atração → retenção → burocracia. Faz sentido
retórico (constrói e fecha). Mas o leitor está com pressa, e a burocracia
é o que ele não espera ouvir — surpresa positiva funciona melhor no
início. **Sugestão, não imposição.** Ver seção 7.

**O que não fazer aqui:** três colunas com ícone circular no topo. É o
padrão que o briefing proíbe na Parte 2.1 e é exatamente onde a tentação
aparece.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔        │
│ Tre cose che un direttore        │   │ Tre cose che un direttore tecnico vuole sapere               │
│ tecnico vuole sapere prima       │   │ prima di tutto.                                              │
│ di tutto.                        │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔        │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │                                                              │
│                                  │   │  01 ──────────────────────────────────────────────           │
│ 01                               │   │     Non ti do lavoro in più.                                 │
│ Non ti do lavoro in più.         │   │     ────────────────────────────────────────────────────     │
│ ──────────────────────────────   │   │     Certificazioni attive, assicurazione in regola,          │
│ Certificazioni attive,           │   │     cittadinanza italiana, italiano fluente.                 │
│ assicurazione in regola,         │   │                                                              │
│ cittadinanza italiana,           │   │  02 ──────────────────────────────────────────────           │
│ italiano fluente. Nessuna        │   │     Riempio la sala — e resta piena.                         │
│ pratica da sistemare. Si parte.  │   │     ────────────────────────────────────────────────────     │
│                                  │   │     A luglio, alle nove del mattino, la media resta          │
│ 02                               │   │     di 18 persone. [...]                                     │
│ Riempio la sala — e resta        │   │                                                              │
│ piena.                           │   │  03 ──────────────────────────────────────────────           │
│ ──────────────────────────────   │   │     Le persone tornano.                                      │
│ A luglio, alle nove del          │   │     ────────────────────────────────────────────────────     │
│ mattino, la media resta di 18    │   │     [...]                                                    │
│ persone. [...]                   │   │                                                              │
│                                  │   │              [ Parliamone su WhatsApp ]                      │
│ 03                               │   │                                                              │
│ Le persone tornano.              │   └──────────────────────────────────────────────────────────────┘
│ ──────────────────────────────   │
│ [...]                            │   Empilhado nos dois. Número grande na fonte
│                                  │   utilitária como marcador — não ícone, não bolinha.
│ [ Parliamone su WhatsApp ]       │   No desktop o número fica na coluna estreita à
└──────────────────────────────────┘   esquerda: assimetria de novo, mesma lógica do hero.
```

---

### 3 · GUARDA

**Hierarquia**

1. **O vídeo.** Sem parágrafo antes. `Un minuto vale più di una pagina.`
   é o título e já explica.
2. **A legenda** — *"Questo è il livello di energia. Ogni lezione."*
   A palavra que trabalha é **ogni**: promete constância, não pico.

**Técnico:** `poster` obrigatório, `preload="none"`, controles visíveis,
sem autoplay com som. O `poster` é o que o leitor vê 100% das vezes — o
vídeo, só se ele decidir. Então o poster tem que ser uma foto boa, não um
frame congelado feio.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                    │
│ Un minuto vale più di            │   │ Un minuto vale più di una pagina.                            │
│ una pagina.                      │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                    │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │                                                              │
│                                  │   │ ┌──────────────────────────────────────────────────────────┐ │
│ ┌──────────────────────────────┐ │   │ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │   │ │▓▓▓▓▓▓▓▓▓  poster + botão de play  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│ │▓▓▓  poster + play  ▓▓▓▓▓▓▓▓▓▓│ │   │ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │   │ └──────────────────────────────────────────────────────────┘ │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │   │ Questo è il livello di energia. Ogni lezione.                │
│ └──────────────────────────────┘ │   │                                                              │
│ Questo è il livello di energia.  │   └──────────────────────────────────────────────────────────────┘
│ Ogni lezione.                    │
└──────────────────────────────────┘   Vídeo largo, quase sangrando. Legenda pequena
                                       abaixo, à esquerda, na fonte utilitária.
```

---

### 4 · CARDIO DANCE BRASIL

**Hierarquia**

1. **`Non è Zumba.`** — o título faz o trabalho todo. O leitor italiano
   tem Zumba como referência default; negar é a forma mais rápida de
   posicionar.
2. **`Cosa cambia`** — *"Nessuna coreografia da imparare a memoria"*.
   Este é o argumento comercial de verdade: aula sem barreira de entrada
   = aluna nova não desiste na primeira vez = sala que enche.
3. **`È un metodo mio`** — propriedade.
4. **`Perché funziona qui`** — *"non si compra a licenza"*. Argumento de
   exclusividade: a academia da esquina não consegue copiar.
5. **Os três vídeos.**

**Nota:** o briefing lista `metodo mio` antes de `cosa cambia`. Inverti
porque "não precisa decorar coreografia" é o que o diretor traduz
imediatamente em retenção de aluna. "É meu" é orgulho do professor, não
benefício do cliente.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                                              │
│ Non è Zumba.                     │   │ Non è Zumba.                                                 │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                                              │
│                                  │   │                                                              │
│ Cosa cambia.                     │   │ Cosa cambia.          │ È un metodo mio.                     │
│ ──────────────────────────────   │   │ ───────────────────   │ ─────────────────────────            │
│ I ritmi sono brasiliani —        │   │ I ritmi sono          │ Nato in Brasile, costruito           │
│ samba, funk, axé, forró — ma     │   │ brasiliani [...]      │ in dodici anni di sala [...]         │
│ la costruzione della lezione     │   │ Si entra e si va,     │                                      │
│ è pensata per chi non sa         │   │ dal primo minuto.     │ Perché funziona qui.                 │
│ ballare. [...]                   │   │                       │ ─────────────────────────            │
│                                  │   │                       │ [...] non si compra a licenza.       │
│ È un metodo mio.                 │   │                                                              │
│ ──────────────────────────────   │   │ ┌────────┐ ┌────────┐ ┌────────┐  →  arrasta                │
│ [...]                            │   │ │▓▓▓▓▓▓▓▓│ │▓▓▓▓▓▓▓▓│ │▓▓▓▓▓▓▓▓│                            │
│                                  │   │ │ vídeo 1│ │ vídeo 2│ │ vídeo 3│                            │
│ Perché funziona qui.             │   │ └────────┘ └────────┘ └────────┘                            │
│ ──────────────────────────────   │   │                                                              │
│ [...]                            │   └──────────────────────────────────────────────────────────────┘
│                                  │
│ ┌──────────┐ ┌────── →           │   Duas colunas de texto no desktop, com a
│ │▓▓▓▓▓▓▓▓▓▓│ │▓▓▓▓▓▓             │   coluna esquerda mais larga. Carrossel
│ │  vídeo 1 │ │ vídeo             │   horizontal com scroll nativo, sem biblioteca.
│ └──────────┘ └──────             │
│ arrasta para o lado →            │
└──────────────────────────────────┘
```

---

### 5 · CHI SONO

**Hierarquia**

1. **`Non venivo dal fitness: venivo dal marketing e dagli eventi.`** —
   é a frase mais forte da seção e está enterrada no meio do primeiro
   parágrafo. Explica por que a aula dele enche: ele pensa a aula como
   espetáculo, não como treino. Deve virar **destaque visual**.
2. **`Nel 2022 sono arrivato in Italia [...] con tutto da ricominciare`** —
   humildade concreta. Vale mais que qualquer adjetivo.
3. **Urban Mix, 500 instrutores** — escala.
4. **`E ho ancora spazio in agenda.`** — última frase, e é um CTA
   disfarçado. Deve ficar sozinha, não colada no parágrafo.

**Fotos:** Brasil, com a data visível. A data é o que faz a foto virar
prova em vez de decoração.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ CHI SONO                         │   │ CHI SONO                                                     │
│                                  │   │                                                              │
│ ──────────────────────────────   │   │ ┌──────────────┐  Ho iniziato a insegnare in Brasile         │
│ Ho iniziato a insegnare in       │   │ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  nel 2013. [...]                            │
│ Brasile nel 2013. [...]          │   │ │▓ shopping  ▓▓│                                             │
│                                  │   │ │▓ 2019      ▓▓│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔       │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ └──────────────┘  Non venivo dal fitness: venivo             │
│ Non venivo dal fitness:          │   │                   dal marketing e dagli eventi.              │
│ venivo dal marketing e           │   │                   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔       │
│ dagli eventi.                    │   │                                                              │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │   Nel 2015 ho fondato Urban Mix [...]                        │
│                                  │   │                                                              │
│ ┌──────────────────────────────┐ │   │              ┌──────────────┐ ┌──────────────┐               │
│ │▓▓▓▓ shopping · 2019 ▓▓▓▓▓▓▓▓▓│ │   │              │▓▓ palco   ▓▓▓│ │▓▓ evento  ▓▓▓│               │
│ └──────────────────────────────┘ │   │              │▓▓ 2021    ▓▓▓│ │▓▓ 2020    ▓▓▓│               │
│                                  │   │              └──────────────┘ └──────────────┘               │
│ Nel 2015 ho fondato Urban        │   │                                                              │
│ Mix [...]                        │   │   Nel 2022 sono arrivato in Italia. [...]                    │
│                                  │   │                                                              │
│ ┌──────────────────────────────┐ │   │   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔             │
│ │▓▓▓▓▓ palco · 2021 ▓▓▓▓▓▓▓▓▓▓▓│ │   │   E ho ancora spazio in agenda.                              │
│ └──────────────────────────────┘ │   │   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔             │
│                                  │   │                                                              │
│ Nel 2022 sono arrivato in        │   └──────────────────────────────────────────────────────────────┘
│ Italia. [...]                    │
│                                  │   As fotos entram entre parágrafos, em posições
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   diferentes — não numa grade. A data fica sobre a
│ E ho ancora spazio in agenda.    │   foto, na fonte utilitária, pequena.
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │
└──────────────────────────────────┘
```

---

### 6 · PERCORSO E FORMAZIONI

**Hierarquia**

1. **`Insegnante Tecnico di 3° Livello — Libertas (riconosciuto CONI)`** —
   a única credencial que um diretor técnico italiano reconhece na hora.
   As outras são complemento.
2. **`Assicurazione professionale attiva`** — deve estar na lista, não
   escondida. Vale mais que três certificações estrangeiras.
3. **A linha do tempo** — contexto. **É a parte mais cortável da página**
   (ver seção 4).

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ FORMAZIONI                       │   │ FORMAZIONI                    │  PERCORSO                    │
│ ──────────────────────────────   │   │ ────────────────────────────  │  ──────────────────────      │
│ Insegnante Tecnico di 3° Livello │   │ Insegnante Tecnico di 3°      │  2013  Inizio come           │
│ Albo Naz. Tecnici Libertas       │   │ Livello — Libertas (CONI)     │        istruttore, Brasile   │
│ (riconosciuto CONI)              │   │ Cross Cardio L3               │                              │
│ ──────────────────────────────   │   │ Cross Cardio Mobility         │  2015  Urban Mix.            │
│ Cross Cardio L3                  │   │ Cross Cardio SGT              │  2022  +500 istruttori       │
│ Cross Cardio Mobility            │   │ Outdoor Coach                 │                              │
│ Cross Cardio SGT                 │   │ Assicurazione attiva          │  2022  Trasferimento         │
│ Outdoor Coach                    │   │                               │        in Italia             │
│ Assicurazione attiva             │   │ ┌───────────────────────────┐ │                              │
│                                  │   │ │▓▓ formazione istruttori ▓▓│ │  2024  Nascita del           │
│ ┌──────────────────────────────┐ │   │ │▓▓ preto e branco        ▓▓│ │        Cardio Dance Brasil   │
│ │▓▓ formazione · preto e branco│ │   │ └───────────────────────────┘ │                              │
│ └──────────────────────────────┘ │   │                               │  Oggi  Catania               │
│                                  │   └──────────────────────────────────────────────────────────────┘
│ PERCORSO                         │
│ ──────────────────────────────   │   Duas colunas no desktop. No celular a lista
│ 2013  Inizio, Brasile            │   vem primeiro — credencial antes de história.
│ 2015  Urban Mix                  │
│ 2022  Trasferimento in Italia    │   Sem tabela com borda. Só ano + texto,
│ 2024  Cardio Dance Brasil        │   alinhados, com o ano na fonte utilitária.
│ Oggi  Catania                    │
└──────────────────────────────────┘
```

> **Nota de conteúdo do briefing, mantida:** as formações aparecem como
> credencial própria. Nenhuma menção a cargo, vínculo institucional ou
> empresa empregadora. **Não é um currículo.**

---

### 7 · COSA DICONO

**Hierarquia**

1. **Os rostos.** `Non chiedo di credermi. Guarda loro.` e sai da frente.
2. Nada mais. Sem nome inventado, sem estrela, sem aspas gigante.

**Risco técnico:** três vídeos verticais é o ponto mais pesado da página
depois do hero. `preload="none"` nos três, obrigatoriamente, e poster em
WebP. Sem isso o LCP vai embora.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                      │
│ Non chiedo di credermi.          │   │ Non chiedo di credermi. Guarda loro.                         │
│ Guarda loro.                     │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                      │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │                                                              │
│                                  │   │  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│ ┌──────────────┐ ┌───────  →     │   │  │▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓│                │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │▓▓▓▓▓▓▓        │   │  │▓ vertical │  │▓ vertical │  │▓ vertical │                │
│ │▓  vertical   │ │▓ verti        │   │  │▓    1     │  │▓    2     │  │▓    3     │                │
│ │▓     1       │ │▓              │   │  │▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓│                │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │▓▓▓▓▓▓▓        │   │  └───────────┘  └───────────┘  └───────────┘                │
│ └──────────────┘ └───────        │   │                                                              │
│ arrasta para o lado →            │   └──────────────────────────────────────────────────────────────┘
└──────────────────────────────────┘
```

---

### 8 · COME LAVORIAMO INSIEME

**Hierarquia**

1. **`Prova` — aula demonstrativa grátis com os alunos dele.** Está em
   **último** no briefing e é o item que fecha negócio. Risco zero. Deve
   vir **primeiro**.
2. **`Tempi` — duas semanas.** Velocidade.
3. **`Disponibilità`.** Se não bate com a grade dele, nada mais importa —
   é filtro, e filtro cedo economiza o tempo dos dois.
4. **`Inquadramento`.** Seguro por conta dele. Tira responsabilidade.
5. **`Formato`.** Flexibilidade.

**Nota:** o briefing ordena Disponibilità → Formato → Inquadramento →
Tempi → Prova. É ordem de contrato. Sugiro ordem de decisão: o que reduz
risco primeiro. O título da seção — *"Quello che di solito si scopre alla
terza telefonata"* — já promete transparência; entregar o melhor item
primeiro cumpre a promessa.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔            │
│ Quello che di solito si          │   │ Quello che di solito si scopre alla terza telefonata.        │
│ scopre alla terza telefonata.    │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔            │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │                                                              │
│                                  │   │ PROVA              │ TEMPI                                   │
│ PROVA                            │   │ ─────────────────  │ ──────────────────────────              │
│ ──────────────────────────────   │   │ Prima lezione      │ Dalla prima chiamata alla               │
│ Prima lezione dimostrativa       │   │ dimostrativa       │ prima lezione: due settimane.           │
│ gratuita, con i tuoi iscritti.   │   │ gratuita, con i    │ Se serve prima, si fa prima.            │
│ Decidi dopo.                     │   │ tuoi iscritti.     │                                         │
│                                  │   │ Decidi dopo.       │ INQUADRAMENTO                           │
│ TEMPI                            │   │                    │ ──────────────────────────              │
│ ──────────────────────────────   │   │ DISPONIBILITÀ      │ Collaborazione sportiva                 │
│ Dalla prima chiamata alla        │   │ ─────────────────  │ regolare. Assicurazione a               │
│ prima lezione: due settimane.    │   │ Martedì e giovedì  │ mio carico. Cittadinanza                │
│                                  │   │ mattina. Tutte le  │ italiana.                               │
│ DISPONIBILITÀ                    │   │ sere dal lunedì al │                                         │
│ ──────────────────────────────   │   │ venerdì, dalle 18. │ FORMATO                                 │
│ Martedì e giovedì mattina.       │   │                    │ ──────────────────────────              │
│ Tutte le sere dal lunedì al      │   │                    │ Lezione singola o ciclo.                │
│ venerdì, dalle 18:00.            │   │                    │ Anche evento singolo.                   │
│                                  │   │                                                              │
│ INQUADRAMENTO                    │   │              [ Parliamone su WhatsApp ]                      │
│ ──────────────────────────────   │   │                                                              │
│ [...]                            │   └──────────────────────────────────────────────────────────────┘
│                                  │
│ FORMATO                          │   Duas colunas no desktop, empilhado no celular.
│ ──────────────────────────────   │   Rótulos na fonte utilitária, maiúscula, pequenos.
│ [...]                            │
│                                  │
│ [ Parliamone su WhatsApp ]       │
└──────────────────────────────────┘
```

---

### 9 · CONTATTO

**Hierarquia**

1. **`Se hai una sala vuota la mattina, parliamone.`** — resume a página
   inteira em nove palavras.
2. **WhatsApp.** É a ação preferida.
3. **O formulário**, como alternativa — para quem não quer dar o número
   pessoal, ou está no desktop.
4. **`ti richiamo io`** — inverte o esforço. Ele não tem que fazer nada.

**Formulário:** 4 campos, nenhum a mais. `Palestra` é o campo que
qualifica — vale mais que e-mail. Não pedir e-mail: quem preenche quer
ser ligado, não escrito.

**Estados, conforme o briefing:**
- Sucesso: *Ricevuto. Ti richiamo entro 24 ore.*
- Erro: diz **o que** falhou e **como** resolver. Não pede desculpas, não
  é vago. `"Manca il telefono"` e não `"Errore nell'invio"`.

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │  Nome                     │
│ Se hai una sala vuota la         │   │ Se hai una sala vuota la        │  ┌─────────────────────┐  │
│ mattina, parliamone.             │   │ mattina, parliamone.            │  └─────────────────────┘  │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │   │ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │  Palestra                 │
│                                  │   │                                 │  ┌─────────────────────┐  │
│ [ Scrivimi su WhatsApp ]         │   │ [ Scrivimi su WhatsApp ]        │  └─────────────────────┘  │
│                                  │   │                                 │  Telefono                 │
│ Oppure lascia due righe qui      │   │ Oppure lascia due righe qui     │  ┌─────────────────────┐  │
│ sotto e ti richiamo io.          │   │ sotto e ti richiamo io.         │  └─────────────────────┘  │
│                                  │   │                                 │  Messaggio                │
│ Nome                             │   │                                 │  ┌─────────────────────┐  │
│ ┌──────────────────────────────┐ │   │                                 │  │                     │  │
│ └──────────────────────────────┘ │   │                                 │  └─────────────────────┘  │
│ Palestra                         │   │                                 │  [ Invia ]                │
│ ┌──────────────────────────────┐ │   │                                                              │
│ └──────────────────────────────┘ │   └──────────────────────────────────────────────────────────────┘
│ Telefono                         │
│ ┌──────────────────────────────┐ │   No desktop, título à esquerda e formulário à
│ └──────────────────────────────┘ │   direita. No celular, tudo empilhado, WhatsApp
│ Messaggio                        │   sempre antes do formulário.
│ ┌──────────────────────────────┐ │
│ │                              │ │   Campos com rótulo visível sempre — nunca
│ └──────────────────────────────┘ │   placeholder como rótulo (desaparece ao digitar).
│ [ Invia ]                        │
└──────────────────────────────────┘
```

---

### 10 · DIARIO

**Hierarquia**

1. Três últimos posts: capa, título, data.
2. Link para `/diario`.

**Regra do briefing, mantida:** sem post, a seção **não renderiza**.
Nenhum placeholder, nenhum "em breve".

```
MOBILE                                 DESKTOP
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────┐
│ DIARIO                           │   │ DIARIO                                        tutti i post → │
│                                  │   │                                                              │
│ ┌──────────────────────────────┐ │   │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│ │▓▓▓▓▓▓ capa ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │   │ │▓▓▓▓ capa ▓▓▓▓│ │▓▓▓▓ capa ▓▓▓▓│ │▓▓▓▓ capa ▓▓▓▓│          │
│ └──────────────────────────────┘ │   │ └──────────────┘ └──────────────┘ └──────────────┘          │
│ 12 marzo 2026                    │   │ 12 marzo 2026    05 marzo 2026    28 febbraio 2026          │
│ Titolo del post                  │   │ Titolo del post  Titolo del post  Titolo del post           │
│                                  │   │                                                              │
│ [ ... 2 posts ... ]              │   └──────────────────────────────────────────────────────────────┘
│                                  │
│ tutti i post →                   │
└──────────────────────────────────┘
```

---

## 4. O corte para o celular

**Estimativa** de comprimento no celular com tudo ligado: **18 a 22
telas** de rolagem. Para um leitor em pé, entre duas tarefas, é demais.

Cortes em ordem de execução — o primeiro é o que dá mais retorno com
menos perda.

### Corte 1 · Dois interstícios, dos quatro

| Interstício | Decisão | Motivo |
|---|---|---|
| 1 · *"Ore 9 del mattino..."* | ✂️ **corta no celular** | Repete a SUB do hero **e** a legenda de I NUMERI, que vem logo depois. Três vezes o mesmo fato em duas telas |
| 2 · *"Riempire una lezione è facile..."* | ✅ **mantém sempre** | É a tese da página. Não repete nada. Se sobrar um só, é este |
| 3 · *"Tredici anni davanti a una sala..."* | ✂️ **corta no celular** | Repete literalmente o número `13 anni davanti a una sala` de I NUMERI |
| 4 · *(não especificado no briefing)* | — | Ver seção 7: o briefing anuncia quatro e detalha três |

**Ganho:** ~2 telas. **Perda:** quase nenhuma — o que sai é repetição.

### Corte 2 · A linha do tempo de PERCORSO

No celular, mantém `Formazioni` (credencial = confiança) e a linha do
tempo vira **um bloco recolhível**, fechado por padrão:
`Il percorso completo →`

Motivo: os cinco itens da linha do tempo já foram contados em prosa em
CHI SONO, na tela anterior. É a mesma informação, duas vezes seguidas.

**Ganho:** ~1,5 tela. **Perda:** nenhuma para quem tem pressa; zero para
quem quer ler, porque continua acessível.

### Corte 3 · Carrossel de METODO: 3 vídeos → 1

No celular, um vídeo só, com `+ altri due video` abaixo. Três vídeos
verticais numa tela de 360px viram três miniaturas ilegíveis, e cada um
pesa.

**Ganho:** ~1 tela e bastante peso. **Perda:** baixa.

### Corte 4 · Encurtar CHI SONO

Quatro parágrafos viram três: fundir o de Urban Mix com o da chegada à
Itália. O parágrafo do marketing e a última frase (`ho ancora spazio in
agenda`) **não se toca** — são os dois que trabalham.

**Ganho:** ~0,5 tela.

### O que nunca se corta

| | Por quê |
|---|---|
| Hero completo | É a decisão do momento 1 |
| Os 4 números | É a prova |
| `COSA PORTO`, os 3 blocos | É a resposta à pergunta inteira |
| O vídeo de `GUARDA` | Um minuto vale mais que a página |
| `Non è Zumba` | É o posicionamento |
| `COSA DICONO` | Prova de terceiro |
| `COME LAVORIAMO` completo | É onde o risco cai |
| `CONTATTO` | É a ação |
| Os 4 CTAs | Nunca |

**Resultado estimado:** de 18–22 para **13–15 telas**. Números são
estimativa de planejamento, não medição — a medição real acontece na
Fase 2, com o conteúdo montado.

---

## 5. Problemas de conteúdo que encontrei

Não são erros de escrita: o texto do briefing é bom. São problemas que só
aparecem quando se olha a página como sequência.

### 5.1 · O mesmo fato, oito vezes

`9 da manhã · 3 manhãs · 18 pessoas · julho` aparece em:

1. Hero SUB — *"Sala piena tre mattine a settimana, tutto l'anno"*
2. Interstício 1 — *"Ore 9 del mattino. Tre volte a settimana. Anche a luglio"*
3. I NUMERI — `18 · persone di media a lezione, a luglio`
4. I NUMERI — `3 · mattine a settimana, tutto l'anno`
5. I NUMERI, legenda — *"Le nove del mattino, in piena estate..."*
6. COSA PORTO, bloco 1 — *"A luglio, alle nove del mattino, la media resta di 18"*
7. CHI SONO — *"Oggi a Catania insegno tre mattine a settimana"*
8. PERCORSO, linha `Oggi` — *"Catania, tre mattine a settimana"*

Repetir de propósito é técnica legítima — é o fato mais forte que ele
tem. Mas **oito vezes em 15 telas** deixa de soar como ênfase e passa a
soar como página sem conteúdo. Os cortes 1 e 2 já removem três
ocorrências. Sugiro cortar a 7 também: em CHI SONO, trocar por algo que
não repita.

Mesma coisa, menor: `500 istruttori` aparece 3 vezes (números, CHI SONO,
percorso). Duas bastam.

### 5.2 · `Zumba Basic 1` na lista, e a seção chamada `Non è Zumba`

A seção 4 se chama **`Non è Zumba.`** e argumenta contra *"format
internazionali standardizzati"*. Duas telas depois, a lista de formações
inclui **`Zumba Basic 1`**.

**✅ RESOLVIDO — assumir.** Conhecer o padrão e ter escolhido outro
caminho é mais forte que nunca ter visto o padrão.

Implementação: a lista fica intacta, e a frase entra **abaixo** dela, na
fonte utilitária, pequena. Não como sufixo do item — cláusula pendurada
num item de lista fica pobre tipograficamente.

```
- Insegnante Tecnico di 3° Livello — Libertas (riconosciuto CONI)
- Cross Cardio L3
- Cross Cardio Mobility
- Cross Cardio SGT
- Outdoor Coach
- Zumba Basic 1
- Assicurazione professionale attiva

  Zumba Basic 1 è in questa lista perché conosco il format.
  Ho scelto un'altra strada.
```

### 5.3 · Doze anos ou treze?

- I NUMERI e interstício 3: **13 anni**
- Seção 4: *"costruito in **dodici** anni di sala"*
- CHI SONO: começou em **2013** → 13 anos em 2026 ✓

**✅ RESOLVIDO** junto com 5.4 — a frase inteira foi reescrita. Ver
seção 6-bis.

### 5.4 · Quando nasceu o Cardio Dance Brasil?

- Seção 4: *"Nato in Brasile, costruito in dodici anni"*
- PERCORSO, 2024: *"Nascita del Cardio Dance Brasil, adattato al pubblico italiano"*

**✅ RESOLVIDO — o método nasce na Itália, em 2024.** A raiz é brasileira,
o método é italiano. Frase reescrita na seção 6-bis.

Consequência que vale registrar: isso **fortalece** o posicionamento. Um
método criado em Catania, em 2024, para o público italiano, é mais
defensável diante de um diretor técnico do que um método importado — e
combina com *"non si compra a licenza"* na mesma seção.

### 5.5 · O quarto interstício não existe

A Parte 3.3 do briefing diz **quatro frases**. A Parte 4 lista **três**
(`>>>` antes de I NUMERI, de GUARDA e de CHI SONO). Falta uma.

**✅ RESOLVIDO** — entra **entre `COSA DICONO` e `COME LAVORIAMO`**, o
único trecho longo sem respiro, e a transição de "prova" para "proposta".

Texto aprovado, com um ajuste de italiano que eu fiz depois:

> ### La prima lezione la offro io. Se non funziona, non se ne parla più.

Eu tinha escrito `la pago io`. Trocei para `la offro io`: em italiano
"pagar a aula" soa como se ele desembolsasse dinheiro, e o que acontece
é que ele oferece a aula. `offro` é a palavra natural e tem a mesma
força. Se preferir `la pago io`, é uma linha de mudança.

---

## 6. Problemas de material

Estes bloqueiam a Fase 2 de verdade, não são preferência.

### 6.1 · Nenhuma foto serve para o hero

Medi as 19 imagens do repositório. Para foto sangrando na borda num
celular moderno (densidade 2–3×) precisa de ~1600px de largura no mínimo;
para desktop, ~2400px.

| Foto | Tamanho | Serve para o hero? |
|---|---|---|
| `taubate-2.jpg` | 2789 × 2087 | Resolução sim, **conteúdo não** (kit de camisetas) |
| `taubate-1.jpg` | 1501 × 1501 | Quadrada, limítrofe |
| `hero-shopping.jpg` | 1200 × 800 | Só celular. Estoura no desktop |
| `shopping-2.jpg` | 1200 × 675 | Só celular |
| `port-15.jpg`, `taubate-3.jpg` | 1200 × 800 | Só celular |
| `trajano-salto.jpg` | 640 × 960 | Não |
| `trajano-aula.jpg` | **399 × 599** | Não — é a menor de todas |
| `hero.png`, `lifestyle.png` | 640 × 640 | Não |
| resto | < 1000px | Não |

**Conclusão:** o briefing pede *"Trajano conduzindo, pessoas em movimento
ao fundo, sangrando na borda"*. **Essa foto não existe no repositório em
resolução usável.** A candidata de conteúdo mais próxima,
`trajano-aula.jpg`, tem 399px de largura — inutilizável.

Sem ela, a Fase 2 constrói o hero com foto que vai estourar, e isso não é
algo que se conserta no código.

### 6.2 · Os vídeos, de novo

`aula.mp4` 25 MB e `entrevista.mp4` 19 MB. Com `preload="none"` não
afetam o LCP, mas quem aperta play no 4G desiste. Recodificar é tarefa da
Fase 3 e eu faço — mas só faz sentido depois que o Trajano disser **quais
dos 12 reels** entram, senão recodifico o material errado.

### 6.3 · O número de WhatsApp — ✅ RESOLVIDO

```
+39 320 056 8927
```

Link para os quatro CTAs (o `wa.me` não leva `+` nem espaços):

```
https://wa.me/393200568927
```

**Mensagem pré-preenchida — recomendo usar.** Quando o diretor abre o
WhatsApp com a tela em branco, ele tem que redigir. Com a mensagem
pronta, é um toque em "enviar":

```
https://wa.me/393200568927?text=Ciao%20Trajano%2C%20ti%20scrivo%20dal%20tuo%20sito.
```

→ *"Ciao Trajano, ti scrivo dal tuo sito."*

Dois motivos: reduz o atrito no momento exato da decisão, e o Trajano
passa a saber que o contato veio do site e não do currículo impresso —
que é a única medição de origem que a página tem, já que não há analytics
nesta versão.

**Nota técnica para a Fase 2:** o número entra em **uma constante única**,
não repetido nos quatro CTAs. Trocar de número não pode significar caçar
quatro lugares.

---

### 6-bis · Texto final em italiano, das decisões 5, 6, 7 e 8

Aqui estão as frases exatas que mudam. **Confira, é a sua voz.**

#### SEZIONE 4 — `È un metodo mio` (decisões 6 e 8)

| | |
|---|---|
| **Antes** | Nato in Brasile, costruito in dodici anni di sala, adattato al pubblico italiano. |
| **Depois** | **Nato a Catania nel 2024, costruito su più di dieci anni di sala in Brasile.** |

Resolve as duas decisões numa frase: o método nasce na Itália em 2024, a
experiência vem do Brasil, e o conflito entre `dodici` e `13 anni`
desaparece. `più di dieci` é verdade nas duas leituras.

#### SEZIONE 6 — linha de 2024 do PERCORSO (decisão 8)

| | |
|---|---|
| **Antes** | 2024 · Nascita del Cardio Dance Brasil, adattato al pubblico italiano |
| **Depois** | **2024 · Nascita del Cardio Dance Brasil, a Catania** |

`adattato al pubblico italiano` ficou redundante: se nasceu em Catania,
já nasceu para o público italiano.

#### SEZIONE 6 — nota abaixo das formações (decisão 5)

> Zumba Basic 1 è in questa lista perché conosco il format.
> Ho scelto un'altra strada.

#### INTERSTÍCIO 4 — entre COSA DICONO e COME LAVORIAMO (decisão 7)

> ### La prima lezione la offro io. Se non funziona, non se ne parla più.

---

## 7. Decisões — resolvidas

Aprovadas pelo Trajano. Esta tabela é a que a Fase 2 obedece.

| # | Decisão | Resolução |
|---|---|---|
| 1 | Botão fixo de WhatsApp no celular | ✅ **Sim**, só entre `GUARDA` e `COME LAVORIAMO` |
| 2 | Ordem dos números | ✅ **`18 · 3 · 13 · 500`** |
| 3 | Ordem em COSA PORTO | ✅ **`Non ti do lavoro in più` primeiro** |
| 4 | Ordem em COME LAVORIAMO | ✅ **`Prova` primeiro** |
| 5 | `Zumba Basic 1` | ✅ **Assumir**, com a nota abaixo da lista |
| 6 | `dodici anni` | ✅ **`più di dieci anni`** |
| 7 | 4º interstício | ✅ **`La prima lezione la offro io...`**, entre COSA DICONO e COME LAVORIAMO |
| 8 | Origem do Cardio Dance Brasil | ✅ **Nasce em Catania, 2024.** Raiz brasileira, método italiano |
| 9 | Foto de hero em 2400px+ | ⛔ **PENDENTE — bloqueia o hero** |
| 10 | Número de WhatsApp | ✅ **`+39 320 056 8927`** |

Ordem final das seções, com o quarto interstício no lugar:

```
0  HERO                                          ► CTA 1
>>> "Ore 9 del mattino..."                       (corta no celular)
1  I NUMERI                    18 · 3 · 13 · 500
2  COSA PORTO                  burocracia 1º     ► CTA 2
>>> "Riempire una lezione è facile..."           (mantém sempre)
3  GUARDA                                        ┌ botão fixo
4  CARDIO DANCE BRASIL                           │ aparece
>>> "Tredici anni davanti a una sala..."         │ (corta no celular)
5  CHI SONO                                      │
6  PERCORSO E FORMAZIONI       nota Zumba        │
7  COSA DICONO                                   └ botão fixo
>>> "La prima lezione la offro io..."      NOVO    desaparece
8  COME LAVORIAMO              Prova 1º          ► CTA 3
9  CONTATTO                                      ► CTA 4
10 DIARIO
```

### O único bloqueio que sobrou

**Decisão 9 — a foto do hero.** Preciso de você conduzindo, gente em
movimento ao fundo, com **2400px de largura ou mais**. A que tem o
conteúdo certo no repositório (`trajano-aula.jpg`) tem 399px.

O que a Fase 2 pode fazer sem ela: construir todas as 11 seções, os
tokens, os 4 interstícios e o hero **com estrutura pronta e uma foto
provisória marcada no código**. Trocar depois é uma linha.

O que ela **não** pode fazer: decidir o enquadramento, o ponto focal e a
área calma onde o texto do hero se apoia no desktop. Isso depende da foto
real, e é a primeira coisa que o leitor vê.

---

## 8. O que a Fase 2 recebe deste documento

- Ordem das seções: a do briefing, mais o **4º interstício** entre
  `COSA DICONO` e `COME LAVORIAMO`
- Ordem **interna** dos blocos: conforme decisões 2, 3 e 4
- Quatro CTAs nos lugares mapeados, mais o **botão fixo no celular**
- Número de WhatsApp em **constante única**: `https://wa.me/393200568927`
  com a mensagem pré-preenchida
- As quatro frases em italiano da seção 6-bis, já aprovadas
- Wireframes desktop e mobile de cada seção
- Regra de assimetria: hero, COSA PORTO e CHI SONO quebram a grade;
  o resto fica quieto
- Lista de cortes de celular, para implementar já na construção e não
  como remendo depois
- Proibições da Parte 2.1 do briefing, ativas: sem creme + terracota, sem
  gradiente roxo, sem glassmorphism, sem Inter/Poppins/Montserrat como
  display, sem grade de 3 cards com ícone circular, sem emoji em título,
  sem blob animado, **nada centralizado**

O que a Fase 2 **decide** e este documento não toca: paleta, famílias
tipográficas, escala e o elemento de assinatura. São decisões da skill
`FRONTEND-DESIGN`, com registro do porquê de cada cor vir do assunto —
corpo em movimento, sala, som alto, calor, ritmo brasileiro dentro de
arquitetura siciliana.

---
---

# FASE 2 — PLANO DE DESIGN

Passo 1 do método: decidir e justificar **antes** de codar. Cada escolha
abaixo foi conferida contra a lista de proibições da Parte 2.1 do
briefing, e o registro dessa conferência está no fim desta seção.

## A. De onde vem a identidade

O briefing (2.2) manda tirar a identidade do assunto, não de referência
de dashboard. O assunto é **ritmo brasileiro dentro de arquitetura
siciliana**. Fui buscar literalmente nos dois lugares:

**Catania é uma cidade preta.** Foi reconstruída depois da erupção de
1669 e do terremoto de 1693 usando a pedra que sobrou: **basalto do
Etna**. Os prédios do centro são lava escura contornada de pedra calcária
clara. Isso não é metáfora, é o material da cidade onde ele dá aula.

**A laranja sanguínea é siciliana.** *Arancia rossa di Sicilia* é
vermelha por dentro e laranja por fora, e é o produto agrícola que
identifica a região do Etna. É exatamente a figura que o briefing
descreve: calor brasileiro dentro de forma siciliana.

Daí saem as três cores que importam. As outras três existem por função,
não por gosto.

## B. Cor — 6 valores

| Token | Hex | De onde vem | Onde é usado |
|---|---|---|---|
| `--basalto` | `#191517` | Pedra de lava do Etna. Preto com desvio quente, nunca `#000` | Superfície escura: hero, números, interstícios |
| `--calce` | `#E4E3DE` | Cal e pedra calcária siciliana. Cinza-pedra, **não** creme | Superfície clara: todas as seções de leitura |
| `--cenere` | `#5C564F` | Cinza vulcânica | Texto secundário sobre claro |
| `--sanguigna` | `#B02A15` | Laranja sanguínea, a polpa | Acento sobre claro: CTA, links |
| `--sanguigna-viva` | `#F2603F` | A mesma laranja, a casca | Acento sobre escuro |
| `--ionio` | `#17565F` | Mar Jônio, que Catania olha | Rótulos e detalhes frios |

**Contraste conferido, não estimado.** Calculei os dez pares em uso:

| Par | Ratio | Exigido | |
|---|---|---|---|
| corpo sobre claro | 14,08 | 4,5 | ✓ |
| corpo sobre escuro | 14,08 | 4,5 | ✓ |
| texto secundário | 5,64 | 4,5 | ✓ |
| link sobre claro | 5,13 | 4,5 | ✓ |
| texto do botão | 5,13 | 4,5 | ✓ |
| acento sobre escuro | 5,62 | 4,5 | ✓ |
| rótulo frio | 6,45 | 4,5 | ✓ |
| foco de teclado | 14,08 | 3,0 | ✓ |

A primeira versão da paleta reprovou em quatro pares. Os valores acima
são a segunda, ajustada até passar.

**Por que não há um cinza de texto secundário para fundo escuro:** as
superfícies escuras da página são o hero, os números e os interstícios.
Interstício tem só uma frase. Onde há legenda sobre escuro — sob os
números — ela usa `--calce` cheio, em corpo menor. Escurecer texto
secundário é convenção, não exigência, e sobre fundo escuro custa
legibilidade sem devolver nada.

## C. Tipografia — 3 famílias, 3 papéis

Auto-hospedadas via npm (`@fontsource`). **Nenhuma requisição ao Google
Fonts** — seria script de terceiro, cookie de terceiro e banner GDPR,
exatamente o que a Parte 5.1 do briefing evita nos vídeos.

| Papel | Família | Por quê |
|---|---|---|
| **Display** | **Archivo Variable** | Um arquivo com `font-weight: 100–900` **e** `font-stretch: 62%–125%`. Peso e largura extremos, que é o que a Parte 2.2 pede: tipografia de cartaz de baile |
| **Corpo** | **Literata Variable** | Serifada desenhada para leitura em tela. Serifada no corpo dá credibilidade de ofício físico e afasta do parecer-SaaS |
| **Utilitária** | **IBM Plex Mono** | Rótulos, anos, legendas. Largura fixa garante `tabular-nums` para o contador da Fase 3 sem tremer |

**Onde a largura extrema é usada:** o H1 do hero e os quatro números vão
em `font-stretch: 118%` com peso 800 — largo e pesado, empurrando as
bordas. Títulos de seção em 105%. Corpo nunca. Uma coisa é ousada, o
resto fica quieto (regra de contenção, 2.2).

## D. Escala — 6 passos, com salto real

O briefing proíbe "escala de 8 passos onde tudo parece igual". Entre
corpo (~19px) e título de seção (~60px) há um salto de **3×**. Não há
passo intermediário para preencher o vão — o vão é o efeito.

```
--passo-xl   clamp(3rem, 12vw, 8rem)        hero, números
--passo-l    clamp(2rem, 6vw, 3.75rem)      títulos de seção
--passo-m    clamp(1.75rem, 5.5vw, 3rem)    interstícios
--passo-lead clamp(1.1875rem, 2.2vw, 1.5rem) subtítulo do hero
--passo-base clamp(1.0625rem, 1.6vw, 1.1875rem) corpo
--passo-util 0.78rem                        rótulos, maiúscula, espaçada
```

## E. Elemento de assinatura — a *battuta*

Quatro traços verticais curtos, o quarto mais alto e em `--sanguigna`.
Aparece acima de cada título de seção, no lugar de um fio de 1px.

```
│ │ │ █        │ │ │ █        │ │ │ █
I NUMERI       COSA PORTO     CHI SONO
```

É a **contagem de entrada** de uma aula de dança: *um, dois, três,
QUATRO*. O quarto traço é o tempo forte, onde a música entra.

Por que serve como assinatura:
- Vem do assunto, não de biblioteca de UI. Ninguém copia de outro site
  porque nenhum outro site é sobre conduzir uma sala no ritmo
- Substitui um fio genérico por algo que significa
- É quieto. Não pisca, não anima, não pede atenção
- Custa quatro `<span>` e nada de JS

## F. Conferência contra a Parte 2.1

Cada proibição, e o que eu fiz:

| Proibido | Situação |
|---|---|
| Creme `#F4F1EA` + serifada display de alto contraste + terracota `#D97757` | **Evitado nos três eixos.** Claro é cinza-pedra `#E4E3DE`, não creme; display é sans de largura extrema, não serifada; acento é laranja sanguínea saturada `#B02A15`, não terracota apagada |
| Quase-preto + **um único** acento verde-ácido ou vermelhão | **Evitado.** Há duas superfícies alternando e três matizes (laranja, azul jônio, cinza), não escuro-com-um-acento |
| Layout de jornal: fios de 1px, raio zero, colunas densas | **Evitado.** Fio de 1px é substituído pela *battuta*; a medida de leitura é limitada a 62 caracteres |
| Gradiente roxo→azul | Não existe no arquivo |
| Glassmorphism, card com blur | Não existe. Não há card nenhum |
| Inter / Poppins / Montserrat como display | Display é Archivo Expanded |
| Grade de 3 colunas com ícone circular no topo | `COSA PORTO` é empilhado, com número grande na mono. Sem ícone, sem círculo, sem card |
| Emoji em título de seção | Nenhum |
| Blob orgânico animado no hero | Nenhum |
| Tudo centralizado | Alinhado à esquerda em toda a página. Assimetria deliberada no hero, `COSA PORTO` e `CHI SONO` |
| Paleta default do Tailwind | Não há Tailwind no projeto |

## G. A foto do hero — o que foi possível

O Trajano escolheu a foto dele conduzindo a multidão no shopping. É a
foto certa: ele de costas, braço estendido, centenas de pessoas em
movimento acompanhando. Diz "enche a sala" sem precisar de legenda.

**Já estava no repositório: `hero-v3.jpg`, 960 × 636.** Não é a foto
nova de 2400px — é a que eu tinha medido e classificado como pequena.

O que isso obriga:

| | |
|---|---|
| **Celular** | 960px cobre uma tela de 390px em densidade 2× com folga. **Funciona bem**, e é onde o público está |
| **Desktop** | 960px não cobre uma faixa sangrando de 1440px. **Full-bleed está descartado** |

**Solução:** no desktop a foto ocupa uma coluna de ~46% da largura,
sangrando só na borda esquerda e no topo — que é exatamente o wireframe
assimétrico já desenhado na seção 3. A 46% de 1440px são 662px de área,
dentro do que 960px atende com nitidez.

Ou seja: a assimetria que eu havia proposto por razão de composição
acabou salvando a resolução. Mas é acomodação, não a solução.

**A solução de verdade** é uma linha de pedido: a foto tem marca d'água
**EDMAR CRUZ FOTOGRAFIA** no canto inferior direito. O original em alta
existe, está com o fotógrafo. Pedir o arquivo resolve a resolução e, de
passagem, a questão de uso — ver seção H.

## H. Duas coisas que eu não decido sozinho

**1. A marca d'água.** `hero-v3.jpg` traz *EDMAR CRUZ FOTOGRAFIA*
impresso na imagem. Numa foto sangrando na borda, ela vai aparecer.

Não recortei a marca. Cortar o crédito de um fotógrafo do arquivo dele
não é decisão de implementação — é decisão do Trajano com o autor. As
saídas honestas:

- Pedir o original ao Edmar Cruz, sem marca, em alta. Resolve tudo
- Manter a marca visível e creditar. Legítimo, e num hero fica estranho
- Recortar, **com autorização dele**

Enquanto não houver definição, a foto entra como está, marca inclusive.

**2. A média fora do verão.** Pendência 4 do briefing, ainda aberta. Se
for maior que 18, o número mais forte da página está subdimensionado.

## I. O que a Fase 3 recebe

Construído na Fase 2, **parado**, esperando movimento:

- Os quatro números com o valor final em texto no HTML — o contador da
  spec 3.1 só substitui o conteúdo
- O botão fixo de WhatsApp, com o estilo pronto e escondido por classe.
  Mostrar entre `GUARDA` e `COME LAVORIAMO` depende de
  `IntersectionObserver`, que é da Fase 3
- Os blocos estruturais marcados para reveal, sem nenhuma transição ainda
- O formulário posta direto no Netlify Forms, funcionando sem JS. Os
  estados inline de sucesso e erro que o briefing especifica na Seção 9
  precisam de um `fetch` pequeno — Fase 3
