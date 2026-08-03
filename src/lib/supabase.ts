import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Mancano PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY. ' +
      'Copia .env.example in .env (e impostale su Netlify).'
  );
}

/** Un post del diario, come sta in tabella su Supabase. */
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

/** Nome del bucket Storage per le immagini del diario. */
export const BUCKET = 'blog';

/**
 * Slug da titolo: minuscole, accenti via, spazi in trattini.
 * Usato da /admin quando si crea un post.
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
