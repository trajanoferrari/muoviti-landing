/**
 * Mapeamento dos vídeos por seção, informado pelo Trajano.
 *
 * Fonte: reels do Instagram. Mas o site NÃO usa embed do Instagram —
 * script de terceiro pesa, quebra quando o post muda e instala cookie de
 * terceiro, o que obrigaria a banner GDPR (briefing 5.1). Cada vídeo é
 * auto-hospedado em MP4 dentro de public/video.
 *
 * ── COMO TROCAR UM VÍDEO ────────────────────────────────────────────
 * 1. Salve o MP4 em `public/video/` com o nome que está em `file`
 * 2. Troque `src` de `attuale` para `file`
 * Nada mais. Nenhum componente precisa ser editado.
 *
 * Recomendado antes de subir: recodificar para H.264 720p, CRF ~24,
 * áudio 96 kbps. Os dois arquivos provisórios têm 25 MB e 19 MB — com
 * `preload="none"` não atrasam a página, mas quem aperta play no 4G
 * espera demais.
 */

type Video = {
  /** Nome final do arquivo em public/video, quando o MP4 chegar. */
  file: string;
  /** O que é servido hoje. Trocar para `file` depois do upload. */
  src: string;
  poster: string;
  /** Reel de origem, para saber qual arquivo baixar. */
  reel: string;
};

/** Seção 3 · GUARDA — o vídeo principal. */
export const PRINCIPALE: Video = {
  file: '/video/principale.mp4',
  src: '/video/aula.mp4', // provisório
  poster: '/img/port-23.webp',
  reel: 'https://www.instagram.com/reel/DU0e_W8Dfwk/',
};

/** Seção 4 · CARDIO DANCE BRASIL — dois em sala + a coreografia. */
export const METODO: Video[] = [
  {
    file: '/video/sala-1.mp4',
    src: '/video/aula.mp4', // provisório
    poster: '/img/port-23.webp',
    reel: 'https://www.instagram.com/reel/DbP7sZRs2jN/',
  },
  {
    file: '/video/sala-2.mp4',
    src: '/video/entrevista.mp4', // provisório
    poster: '/img/hero-v3.webp',
    reel: 'https://www.instagram.com/reel/DOjDmMYDCYl/',
  },
  {
    file: '/video/coreografia.mp4',
    src: '/video/entrevista.mp4', // provisório
    poster: '/img/trajano-salto.webp',
    reel: 'https://www.instagram.com/reel/DWwtYhGDYEG/',
  },
];

/**
 * Reservas da seção 4, indicadas pelo Trajano. Não entram no site —
 * ficam registradas para o caso de um dos três acima não servir.
 */
export const METODO_RISERVA = [
  'https://www.instagram.com/reel/DADTtFqsM9J/',
  'https://www.instagram.com/reel/C_41k9BM0Jb/',
];

/** Seção 7 · COSA DICONO — três depoimentos verticais. */
export const TESTIMONIANZE: Video[] = [
  {
    file: '/video/testimonianza-1.mp4',
    src: '/video/entrevista.mp4', // provisório
    poster: '/img/trajano-salto.webp',
    reel: 'https://www.instagram.com/reel/DXusLJrjbIj/',
  },
  {
    file: '/video/testimonianza-2.mp4',
    src: '/video/entrevista.mp4', // provisório
    poster: '/img/mkt-1.webp',
    reel: 'https://www.instagram.com/reel/DXwicdjjLYN/',
  },
  {
    file: '/video/testimonianza-3.mp4',
    src: '/video/aula.mp4', // provisório
    poster: '/img/port-23.webp',
    reel: 'https://www.instagram.com/reel/DX08K9HEYLX/',
  },
];
