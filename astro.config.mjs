// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://trajanoferrari.it',

  // Sito statico. Nessun framework UI, nessuna integrazione.
  // Il diario legge da Supabase lato client, quindi non serve SSR:
  // un post nuovo appare senza rebuild.
  output: 'static',
});
