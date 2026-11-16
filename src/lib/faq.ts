/** Domande frequenti — testi generali, da rivedere con il cliente. */
export const FAQ_GROUPS = [
  {
    title: 'Preventivi e sopralluoghi',
    items: [
      { q: 'Il preventivo è gratuito?', a: 'Sì, sempre, e non ti impegna a nulla. Per i lavori più articolati lo prepariamo dopo un sopralluogo, anche in videochiamata.' },
      { q: 'In quanto tempo ricevo una risposta?', a: 'Entro un giorno lavorativo ti richiamiamo. Se le informazioni sono complete, il preventivo scritto arriva nelle ventiquattro ore successive.' },
      { q: 'Il prezzo può cambiare a lavoro iniziato?', a: 'No, se il lavoro resta quello concordato. Eventuali extra vengono sempre quantificati e approvati da te prima di essere eseguiti.' },
    ],
  },
  {
    title: 'Traslochi',
    items: [
      { q: 'Fornite voi scatole e imballi?', a: 'Sì. Consegniamo scatole, nastro, pluriball e bauli appendiabiti qualche giorno prima. Se preferisci, imballiamo tutto noi.' },
      { q: 'Vi occupate dei permessi di sosta?', a: 'Sì, richiediamo noi l’occupazione del suolo pubblico e posizioniamo la segnaletica nei tempi previsti dal Comune.' },
      { q: 'Cosa succede se qualcosa si danneggia?', a: 'Ogni trasporto è coperto da assicurazione. In caso di danno lo documentiamo insieme e apriamo la pratica.' },
    ],
  },
  {
    title: 'Montaggi e installazioni',
    items: [
      { q: 'Montate mobili di qualsiasi marca?', a: 'Sì, compresi quelli acquistati online, della grande distribuzione o usati senza istruzioni.' },
      { q: 'Collegate anche gli elettrodomestici?', a: 'Colleghiamo elettrodomestici da incasso e libera installazione agli attacchi esistenti. Per modifiche agli impianti ci coordiniamo con il tuo tecnico.' },
    ],
  },
  {
    title: 'Depositi e smaltimenti',
    items: [
      { q: 'Qual è la durata minima del deposito?', a: 'Una settimana. Non ci sono vincoli annuali: paghi il volume che occupi per il tempo che ti serve.' },
      { q: 'Rilasciate documentazione per lo smaltimento?', a: 'Sì. Conferiamo solo in impianti autorizzati e ti consegniamo la ricevuta del conferimento.' },
    ],
  },
] as const;

export const FAQ_HOME = [FAQ_GROUPS[0].items[0], FAQ_GROUPS[0].items[1], FAQ_GROUPS[1].items[0], FAQ_GROUPS[2].items[0], FAQ_GROUPS[3].items[0]] as const;
