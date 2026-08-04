/**
 * Markdown simples, como pede a Parte 5.4 do briefing.
 * Escrito à mão em vez de instalar biblioteca: o escopo é fechado
 * (parágrafo, negrito, itálico, título, lista, citação, link) e uma
 * dependência de markdown completo traria peso e superfície de ataque
 * para nada.
 *
 * ORDEM QUE IMPORTA: a estrutura é lida do texto CRU, e o escape de HTML
 * acontece só no conteúdo de cada elemento, dentro de `inline()`.
 *
 * A primeira versão escapava tudo primeiro, e por isso as citações nunca
 * funcionavam: `>` já tinha virado `&gt;` antes de a regra rodar.
 */

function escapa(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Só http, https, mailto e caminho interno. Bloqueia javascript: e data:. */
function urlSegura(u: string): string | null {
  const limpo = u.trim();
  return /^(https?:\/\/|mailto:|\/)/i.test(limpo) ? limpo : null;
}

/**
 * Conteúdo de um elemento: escapa o HTML e depois aplica a marcação.
 * O escape vem primeiro aqui, então nada do banco pode injetar tags —
 * mas as tags que ESTA função gera são criadas depois e sobrevivem.
 */
function inline(raw: string): string {
  return (
    escapa(raw)
      // [testo](url) — a URL é validada, não só escapada
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, u) => {
        const href = urlSegura(u);
        if (!href) return t;
        const esterno = /^https?:\/\//i.test(href);
        return `<a href="${href}"${esterno ? ' rel="noopener nofollow"' : ''}>${t}</a>`;
      })
      // **negrito** antes de *itálico*, senão o itálico come os asteriscos
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  );
}

/**
 * Parser por linha, não por bloco. É o que faz um título seguido
 * imediatamente de texto funcionar — caso comum que a primeira versão
 * não reconhecia porque exigia linha em branco depois do título.
 */
export function markdown(testo: string): string {
  const righe = (testo ?? '').replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];

  let paragrafo: string[] = [];
  let elenco: string[] = [];
  let citazione: string[] = [];

  const chiudiParagrafo = () => {
    if (paragrafo.length) {
      out.push(`<p>${inline(paragrafo.join('\n')).replace(/\n/g, '<br />')}</p>`);
      paragrafo = [];
    }
  };
  const chiudiElenco = () => {
    if (elenco.length) {
      out.push(`<ul>${elenco.map((v) => `<li>${inline(v)}</li>`).join('')}</ul>`);
      elenco = [];
    }
  };
  const chiudiCitazione = () => {
    if (citazione.length) {
      out.push(`<blockquote><p>${inline(citazione.join(' '))}</p></blockquote>`);
      citazione = [];
    }
  };
  const chiudiTutto = () => {
    chiudiParagrafo();
    chiudiElenco();
    chiudiCitazione();
  };

  for (const riga of righe) {
    // Linha em branco fecha tudo o que estava aberto.
    if (!riga.trim()) {
      chiudiTutto();
      continue;
    }

    // Título. Só h2 e h3: o h1 da página é o título do post.
    const h = riga.match(/^(#{2,3})\s+(.+)$/);
    if (h) {
      chiudiTutto();
      out.push(`<h${h[1].length}>${inline(h[2].trim())}</h${h[1].length}>`);
      continue;
    }

    // Item de lista.
    const li = riga.match(/^\s*[-*]\s+(.+)$/);
    if (li) {
      chiudiParagrafo();
      chiudiCitazione();
      elenco.push(li[1].trim());
      continue;
    }

    // Linha de citação.
    const bq = riga.match(/^\s*>\s?(.*)$/);
    if (bq) {
      chiudiParagrafo();
      chiudiElenco();
      citazione.push(bq[1].trim());
      continue;
    }

    // Texto comum.
    chiudiElenco();
    chiudiCitazione();
    paragrafo.push(riga.trim());
  }

  chiudiTutto();
  return out.join('\n');
}

/** Primeiras palavras do texto, para a meta description. */
export function estratto(testo: string, max = 155): string {
  const piano = (testo ?? '')
    .replace(/^\s*[#>*-]+\s*/gm, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return piano.length <= max ? piano : piano.slice(0, max - 1).trimEnd() + '…';
}
