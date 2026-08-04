/**
 * Contador dos números. Especificação 3.1 do briefing, ao pé da letra.
 *
 * requestAnimationFrame puro, sem biblioteca.
 */

const DURATA = 1400;
const SFASAMENTO = 140; // entre um número e o seguinte
const SOGLIA = 0.4; // fração visível que dispara

/** easeOutExpo: rápido no início, freia no fim. */
const easeOutExpo = (t: number): number =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

function conta(el: HTMLElement, finale: number, ritardo: number) {
  const suffisso = el.querySelector<HTMLElement>('.numero__suffisso');
  // O sufixo entra por opacidade AO FIM da contagem, não durante.
  if (suffisso) suffisso.style.opacity = '0';

  // Só o nó de texto do número muda. O <span> do sufixo fica intacto.
  const nodo = Array.from(el.childNodes).find(
    (n) => n.nodeType === Node.TEXT_NODE
  ) as Text | undefined;
  if (!nodo) return;

  const partenza = performance.now() + ritardo;

  const passo = (ora: number) => {
    if (ora < partenza) {
      nodo.nodeValue = '0';
      requestAnimationFrame(passo);
      return;
    }
    const t = Math.min((ora - partenza) / DURATA, 1);
    nodo.nodeValue = String(Math.round(easeOutExpo(t) * finale));

    if (t < 1) {
      requestAnimationFrame(passo);
    } else {
      nodo.nodeValue = String(finale);
      if (suffisso) {
        suffisso.style.transition = 'opacity 260ms ease-out';
        suffisso.style.opacity = '1';
      }
    }
  };

  requestAnimationFrame(passo);
}

export function avviaContatore(sezione: string = '.numeri') {
  const root = document.querySelector<HTMLElement>(sezione);
  if (!root) return;

  const numeri = Array.from(
    root.querySelectorAll<HTMLElement>('[data-numero]')
  );
  if (numeri.length === 0) return;

  // Quem pediu menos movimento vê o número final, sem contagem.
  // O valor já está no HTML como texto, então não há nada a fazer.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Dispara UMA vez só, quando a seção entra em cena.
  const osservatore = new IntersectionObserver(
    (voci) => {
      for (const v of voci) {
        if (!v.isIntersecting) continue;
        osservatore.disconnect();
        numeri.forEach((el, i) => {
          const finale = Number(el.dataset.numero);
          if (Number.isFinite(finale)) conta(el, finale, i * SFASAMENTO);
        });
      }
    },
    { threshold: SOGLIA }
  );

  osservatore.observe(root);
}
