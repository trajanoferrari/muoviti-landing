import { supabase, type Post } from './supabase';

/**
 * Consultas do diário. Rodam no NAVEGADOR, não no build.
 *
 * Por quê: o critério de conclusão da Fase 4 é publicar um post pelo
 * /admin e vê-lo no ar sem rebuild. Se a lista fosse buscada em
 * `getStaticPaths`, cada post novo exigiria uma nova build no Netlify.
 *
 * A leitura é segura de expor: a policy `public read published` do
 * Postgres só devolve linhas com `pubblicato = true`. Um rascunho não
 * sai daqui nem se alguém chamar a API na mão.
 */

/**
 * Teto de espera. Sem isto o cliente Supabase tenta de novo por conta
 * própria e o leitor fica quase 9 segundos olhando "Carico…" antes de
 * qualquer aviso — medido. Num celular em 4G ruim, 6 segundos já é o
 * limite do que se aguenta sem saber o que está acontecendo.
 */
const ATTESA_MAX = 6000;

function scadenza(): AbortSignal {
  return AbortSignal.timeout(ATTESA_MAX);
}

export async function ultimiPost(limite = 3): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('pubblicato', true)
    .order('created_at', { ascending: false })
    .limit(limite)
    .abortSignal(scadenza());
  if (error) throw error;
  return data ?? [];
}

export async function tuttiPost(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('pubblicato', true)
    .order('created_at', { ascending: false })
    .abortSignal(scadenza());
  if (error) throw error;
  return data ?? [];
}

export async function postDaSlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('pubblicato', true)
    .abortSignal(scadenza())
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

/** 12 marzo 2026 */
export function dataIt(iso: string): string {
  return new Date(iso).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * O slug vem do caminho: /diario/il-mio-post
 * O `?slug=` é a alternativa para testar em `astro preview`, onde a
 * reescrita do Netlify não existe.
 */
export function slugDallaUrl(): string | null {
  const daQuery = new URLSearchParams(location.search).get('slug');
  if (daQuery) return daQuery;
  const parti = location.pathname.replace(/\/+$/, '').split('/');
  const ultimo = parti[parti.length - 1];
  return ultimo && ultimo !== 'diario' && ultimo !== 'post' ? ultimo : null;
}
