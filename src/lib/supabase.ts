import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Faltam PUBLIC_SUPABASE_URL ou PUBLIC_SUPABASE_ANON_KEY. ' +
      'Copie .env.example para .env (e configure as duas no Netlify).'
  );
}

// Os nomes dos campos são em italiano porque espelham as colunas da
// tabela no Supabase, definidas assim no briefing.
/** Um post do diário, como está na tabela do Supabase. */
export type Post = {
  id: string;
  slug: string;
  titolo: string;
  sottotitolo: string | null;
  testo: string;
  cover_url: string | null;
  foto_extra: string[];
  pubblicato: boolean;
  created_at: string;
};

export const supabase = createClient(url, anonKey);

/** Nome do bucket do Storage para as imagens do diário. */
export const BUCKET = 'blog';

/**
 * Slug a partir do título: minúsculas, sem acento, espaços viram hífen.
 * Usado pelo /admin na hora de criar um post.
 */
export function slugify(titolo: string): string {
  return titolo
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
