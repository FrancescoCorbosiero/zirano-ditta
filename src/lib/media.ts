/**
 * Registro delle immagini. Oggi sono tavole segnaposto generate da
 * `npm run placeholders`; quando arrivano le foto vere basta cambiare qui
 * il percorso (stesse proporzioni consigliate: 16:10).
 */
export type MediaKey = keyof typeof MEDIA;

export const MEDIA = {
  soggiornoDopo: { src: '/media/soggiorno-dopo.svg', alt: 'Soggiorno arredato a lavoro finito: divano, lampada e quadri al loro posto' },
  soggiornoPrima: { src: '/media/soggiorno-prima.svg', alt: 'Soggiorno prima dell’intervento: scatoloni e mobili imballati' },
  cucinaDopo: { src: '/media/cucina-dopo.svg', alt: 'Cucina montata e collegata, con pensili, cappa e piano di lavoro' },
  cucinaPrima: { src: '/media/cucina-prima.svg', alt: 'Parete della cucina prima del montaggio, con i colli ancora imballati' },
  camera: { src: '/media/camera.svg', alt: 'Camera da letto con armadio a quattro ante montato a parete' },
  armadio: { src: '/media/armadio.svg', alt: 'Armadio su misura a sei ante montato a tutta parete' },
  deposito: { src: '/media/deposito.svg', alt: 'Deposito con scaffalature e colli etichettati' },
  ufficio: { src: '/media/ufficio.svg', alt: 'Ufficio allestito con postazioni e mensole' },
  ufficioPrima: { src: '/media/ufficio-prima.svg', alt: 'Ufficio prima dell’allestimento: scatoloni e arredi imballati' },
  trasloco: { src: '/media/trasloco.svg', alt: 'Furgone della ditta davanti a un portone, con gli scatoloni pronti al carico' },
  installazione: { src: '/media/installazione.svg', alt: 'Parete attrezzata con televisore, mensole e luci installate' },
  scatole: { src: '/media/scatole.svg', alt: 'Scatoloni impilati ed etichettati in magazzino' },
  squadra: { src: '/media/squadra.svg', alt: 'Cantiere in corso: scala, attrezzi e un armadio appena montato' },
} as const;

export const media = (key: MediaKey) => MEDIA[key];
