/**
 * Único lugar onde o número de WhatsApp existe.
 * Trocar de número não pode significar caçar quatro CTAs.
 */

export const TELEFONO = '+39 320 056 8927';

/** Formato do wa.me: sem `+`, sem espaços. */
const TELEFONO_WA = '393200568927';

/**
 * Mensagem já escrita: o diretor não redige nada no momento da
 * decisão, e o Trajano fica sabendo que o contato veio do site e
 * não do currículo impresso. É a única medição de origem que a
 * página tem, já que não há analytics nesta versão.
 */
const MESSAGGIO = 'Ciao Trajano, ti scrivo dal tuo sito.';

export const WHATSAPP = `https://wa.me/${TELEFONO_WA}?text=${encodeURIComponent(MESSAGGIO)}`;

export const CITTA = 'Catania';
