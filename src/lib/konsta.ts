import Link from 'next/link';

/**
 * Konsta dichiara `linkComponent` come nome di tag, ma a runtime rende
 * qualsiasi componente: con il Link di Next le voci delle liste navigano
 * senza ricaricare la pagina.
 */
export const NextLinkTag = Link as unknown as string;
