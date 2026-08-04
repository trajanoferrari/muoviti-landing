/**
 * Reveals de seção. Especificação 3.2 do briefing.
 *
 * Opacidade 0→1 e translateY 16px→0, 500ms,
 * cubic-bezier(0.16, 1, 0.3, 1). Uma vez só, nunca ao rolar de volta.
 *
 * SÓ EM BLOCOS ESTRUTURAIS. Não em cada parágrafo, não em cada item de
 * lista — animação espalhada é exatamente o que faz uma página parecer
 * gerada automaticamente (briefing 3.2).
 *
 * ORDEM QUE IMPORTA: o CSS que esconde os blocos só vale quando o
 * <html> ganha a classe `movimento-pronto`, e é este script que a põe.
 * Assim, se o JS falhar ou não rodar, a página aparece inteira em vez de
 * ficar invisível.
 */

export function avviaReveal(selettore = '[data-reveal]') {
  const blocchi = Array.from(document.querySelectorAll<HTMLElement>(selettore));
  if (blocchi.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Só agora o CSS pode esconder: antes disto, tudo está visível.
  document.documentElement.classList.add('movimento-pronto');

  const osservatore = new IntersectionObserver(
    (voci) => {
      for (const v of voci) {
        if (!v.isIntersecting) continue;
        v.target.classList.add('e-entrato');
        // Uma vez só: para de observar este bloco.
        osservatore.unobserve(v.target);
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
  );

  for (const b of blocchi) osservatore.observe(b);
}

/**
 * Botão fixo de WhatsApp no celular. Decisão 1 do PLANO.md: aparece só
 * no trecho sem CTA, entre GUARDA e COME LAVORIAMO. São seis blocos de
 * conteúdo onde o leitor não tem nenhuma ação possível.
 */
export function avviaBottoneFisso() {
  const bottone = document.querySelector<HTMLElement>('[data-wa-fisso]');
  const inizio = document.querySelector('.video'); // GUARDA
  const fine = document.querySelector('.lavoriamo'); // COME LAVORIAMO
  if (!bottone || !inizio || !fine) return;

  let dentro = false;
  let oltre = false;

  const aggiorna = () => {
    bottone.classList.toggle('e-visibile', dentro && !oltre);
  };

  // `dentro` liga quando GUARDA já passou pelo topo da tela.
  new IntersectionObserver(
    ([v]) => {
      dentro = v.boundingClientRect.top < window.innerHeight * 0.5;
      aggiorna();
    },
    { threshold: 0 }
  ).observe(inizio);

  // `oltre` desliga quando COME LAVORIAMO aparece: ali já existe CTA
  // próprio, e dois ao mesmo tempo viram ruído.
  new IntersectionObserver(
    ([v]) => {
      oltre = v.isIntersecting || v.boundingClientRect.top < 0;
      aggiorna();
    },
    { threshold: 0 }
  ).observe(fine);
}
