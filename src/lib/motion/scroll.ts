import type Lenis from 'lenis';

/* Il riferimento allo scroll morbido, separato dal motore: chi deve solo
   fermare la pagina (popup, menu) non si porta dietro GSAP. */

let lenis: Lenis | null = null;
let locks = 0;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
  if (lenis && locks > 0) lenis.stop();
};
export const getLenis = () => lenis;

/** Ferma o riprende lo scroll della pagina (popup e menu aperti). */
export function lockScroll(locked: boolean): void {
  locks = Math.max(0, locks + (locked ? 1 : -1));
  const on = locks > 0;
  document.documentElement.style.overflow = on ? 'hidden' : '';
  if (on) lenis?.stop();
  else lenis?.start();
}

export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}
