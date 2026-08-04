// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://trajanoferrari.it',

  // Site estático. Sem framework de UI, sem integrações.
  // O diário lê do Supabase no navegador, então não precisa de SSR:
  // um post novo aparece sem rebuild.
  output: 'static',
});
