/* =====================================================================
   Motore delle animazioni — GSAP (ScrollTrigger, SplitText) + Lenis.
   Le pagine restano Server Component: è il markup a dire cosa si muove.
   Questo file non si importa mai in modo statico: lo carica <Motion />
   dopo la pagina. Senza JS o con "riduci movimento" il sito resta
   completo e fermo (gli stati iniziali dipendono da html.motion).

   ─ Rivelazioni (una volta, quando entrano a schermo)
     data-reveal              blocco: sale e appare
     data-reveal="stagger"    i figli entrano a cascata
     data-split               titolo: le righe salgono da dietro una maschera
     data-img-reveal          cornice: l'immagine si scopre dal basso
     data-draw                SVG: i tratti .s (pathLength=1) si disegnano
     data-rule                filo o linea di quota che si traccia (riceve .is-in)
     data-count="2400"        numero che conta fino al valore
                              (data-decimals="1" per i decimali)

   ─ Legate allo scroll
     data-parallax            immagine .plx dentro una .frame: scorre più lenta
     data-float="80"          elemento che si sposta di N px attraversando lo schermo
     data-scrub-text          paragrafo: le parole si accendono leggendo
     data-hscroll             sezione agganciata, binario orizzontale
                              (.hscroll-track, [data-hpar], [data-hbar], [data-hcount])
     data-steps               fasi: [data-steps-line] si riempie, [data-step] si accende
     data-ruler               righello fisso: avanzamento della pagina

   ─ Puntatore (solo mouse)
     data-magnetic            il bottone segue il puntatore
     data-tilt                scheda inclinata in 3D, riflesso .glare
     data-cursor="Apri"       cursore-lente con etichetta
     data-hover-list          elenco con anteprima che segue il puntatore
                              (righe [data-hover-row], pannello [data-hover-panel])

   ─ Hero
     data-hero                sequenza d'ingresso ([data-hero-fade], titolo data-split)
     data-plan                la planimetria: muri, quote, arredi che entrano
   ===================================================================== */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { setLenis } from './scroll';

const EXPO = 'expo.out';
const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

let booted = false;
let lens: HTMLElement | null = null;

/** Una volta per visita: plugin, scroll morbido, cursore-lente. */
function boot(): void {
  if (booted) return;
  booted = true;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
  ScrollTrigger.config({ ignoreMobileResize: true });

  const lenis = new Lenis({ lerp: 0.11, anchors: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  setLenis(lenis);

  if (fine()) {
    lens = document.createElement('div');
    lens.className = 'lens';
    lens.setAttribute('aria-hidden', 'true');
    document.body.appendChild(lens);
    gsap.set(lens, { scale: 0, opacity: 0 });
    const x = gsap.quickTo(lens, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(lens, 'y', { duration: 0.5, ease: 'power3' });
    window.addEventListener('pointermove', (e) => (x(e.clientX), y(e.clientY)), { passive: true });
    document.addEventListener('pointerover', (e) => {
      const host = (e.target as Element | null)?.closest?.<HTMLElement>('[data-cursor]');
      if (host) lens!.textContent = host.dataset.cursor || '';
      gsap.to(lens, { scale: host ? 1 : 0, opacity: host ? 1 : 0, duration: 0.45, ease: host ? 'back.out(1.6)' : 'power3.out', overwrite: 'auto' });
    });
  }
}

/* ── Rivelazioni ───────────────────────────────────────────────────── */

function splitHeadings(delayIn: (el: Element) => number | null): void {
  $$('[data-split]').forEach((el) => {
    const heroDelay = delayIn(el);
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      linesClass: 'split-line',
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.lines, {
          yPercent: 128,
          duration: 1.25,
          ease: EXPO,
          stagger: 0.085,
          delay: heroDelay ?? 0,
          scrollTrigger: heroDelay === null ? { trigger: el, start: 'top 90%', once: true } : undefined,
        });
      },
    });
  });
}

function reveals(): void {
  // Lo stato iniziale (trasparente, 26px più in basso) vive nel CSS finché
  // l'elemento non riceve .is-in. Da lì lo tiene GSAP con valori espliciti
  // e a fine corsa toglie ogni stile in linea: l'elemento resta dove sta nel
  // flusso. (Prima `clearProps` lo restituiva al CSS iniziale: scatto di 26px.)
  const show = (targets: Element[], marks: Element[] = targets) => {
    gsap.fromTo(targets, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.05, ease: EXPO, stagger: 0.08, overwrite: true, clearProps: 'opacity,transform' });
    marks.forEach((m) => m.classList.add('is-in'));
  };
  ScrollTrigger.batch('[data-reveal]:not([data-reveal="stagger"])', { start: 'top 90%', once: true, onEnter: (els) => show(els) });
  $$('[data-reveal="stagger"]').forEach((group) => {
    ScrollTrigger.create({ trigger: group, start: 'top 86%', once: true, onEnter: () => show(Array.from(group.children), [group]) });
  });
  // Fili e linee di quota: la transizione è nel CSS, qui si accende soltanto.
  ScrollTrigger.batch('[data-rule]', { start: 'top 92%', once: true, onEnter: (els) => els.forEach((el) => el.classList.add('is-in')) });

  $$('[data-img-reveal]').forEach((frame) => {
    const img = frame.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', once: true } });
    tl.to(frame, { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: EXPO });
    if (img) tl.from(img, { scale: 1.22, duration: 1.9, ease: EXPO }, 0);
  });

  $$('[data-draw]:not([data-draw="plan"])').forEach((svg) => {
    gsap.to($$('.s', svg), { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut', stagger: 0.08, scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
  });

  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const d = Number(el.dataset.decimals) || 0;
    const nf = new Intl.NumberFormat('it-IT', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' });
    const state = { v: 0 };
    el.textContent = nf.format(0);
    gsap.to(state, {
      v: end,
      duration: 2.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => (el.textContent = nf.format(state.v)),
    });
  });
}

/* ── Legate allo scroll ────────────────────────────────────────────── */

function scrollLinked(): void {
  $$('[data-parallax]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -8.5 }, { yPercent: 8.5, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('[data-float]').forEach((el) => {
    const d = Number(el.dataset.float) || 60;
    gsap.fromTo(el, { y: d }, { y: -d, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
  });

  $$('[data-scrub-text]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(self.words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: 0.3 } }),
    });
  });

  $$('[data-steps]').forEach((group) => {
    const line = group.querySelector('[data-steps-line]');
    const steps = $$('[data-step]', group);
    ScrollTrigger.create({
      trigger: group,
      start: 'top 72%',
      end: 'bottom 58%',
      scrub: 0.5,
      onUpdate: (self) => {
        if (line) gsap.set(line, { scaleX: self.progress, scaleY: self.progress });
        steps.forEach((s, i) => s.classList.toggle('is-on', self.progress >= i / steps.length - 0.02));
      },
    });
  });

  // Il segno scorre con un transform (niente ricalcolo dell'impaginazione a ogni fotogramma).
  $$('[data-ruler]').forEach((ruler) => {
    const mark = ruler.querySelector<HTMLElement>('[data-ruler-mark]');
    const n = ruler.querySelector<HTMLElement>('[data-ruler-n]');
    let h = ruler.clientHeight;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onRefresh: () => (h = ruler.clientHeight),
      onUpdate: (self) => {
        if (mark) mark.style.transform = `translate3d(0, ${(self.progress * h).toFixed(1)}px, 0)`;
        if (n) n.textContent = String(Math.round(self.progress * 100)).padStart(3, '0');
      },
    });
  });
}

function horizontal(media: gsap.MatchMedia): void {
  media.add('(min-width: 1024px)', () => {
    $$('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('.hscroll-track');
      if (!track) return;
      const bar = section.querySelector<HTMLElement>('[data-hbar]');
      const count = section.querySelector<HTMLElement>('[data-hcount]');
      const panels = $$('[data-hpanel]', track);
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.7,
          start: 'top top',
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
            if (count && panels.length) count.textContent = String(Math.min(panels.length, Math.floor(self.progress * panels.length) + 1)).padStart(2, '0');
          },
        },
      });
      $$('[data-hpar]', track).forEach((img) => {
        gsap.fromTo(img, { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
    });
  });
}

/* ── Puntatore ─────────────────────────────────────────────────────── */

function pointer(signal: AbortSignal): void {
  if (!fine()) return;
  const opts = { signal, passive: true } as const;

  $$('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.28);
        y((e.clientY - r.top - r.height / 2) * 0.4);
      },
      opts,
    );
    el.addEventListener('pointerleave', () => (x(0), y(0)), opts);
  });

  $$('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 1100 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3' });
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 7);
        rx((0.5 - py) * 7);
        el.style.setProperty('--gx', `${px * 100}%`);
        el.style.setProperty('--gy', `${py * 100}%`);
      },
      opts,
    );
    el.addEventListener('pointerleave', () => (rx(0), ry(0)), opts);
  });

  $$('[data-hover-list]').forEach((list) => {
    const panel = list.querySelector<HTMLElement>('[data-hover-panel]');
    if (!panel) return;
    const shots = $$('[data-hover-shot]', panel);
    gsap.set(panel, { xPercent: -50, yPercent: -50, scale: 0.7, opacity: 0 });
    const x = gsap.quickTo(panel, 'x', { duration: 0.7, ease: 'power3' });
    const y = gsap.quickTo(panel, 'y', { duration: 0.7, ease: 'power3' });
    const rot = gsap.quickTo(panel, 'rotation', { duration: 0.9, ease: 'power3' });
    let lastX = 0;
    list.addEventListener(
      'pointermove',
      (e) => {
        const r = list.getBoundingClientRect();
        x(e.clientX - r.left);
        y(e.clientY - r.top);
        rot(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      },
      opts,
    );
    $$('[data-hover-row]', list).forEach((row, i) => {
      row.addEventListener(
        'pointerenter',
        () => {
          shots.forEach((s, k) => gsap.to(s, { clipPath: k === i ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0% 0)', duration: 0.7, ease: EXPO, overwrite: true, zIndex: k === i ? 2 : 1 }));
          gsap.to(panel, { scale: 1, opacity: 1, duration: 0.6, ease: EXPO, overwrite: 'auto' });
        },
        opts,
      );
    });
    list.addEventListener('pointerleave', () => (gsap.to(panel, { scale: 0.7, opacity: 0, duration: 0.45, overwrite: 'auto' }), rot(0)), opts);
  });
}

/* ── Hero e planimetria ────────────────────────────────────────────── */

function hero(delay: number, signal: AbortSignal): void {
  const section = document.querySelector<HTMLElement>('[data-hero]');
  if (!section) return;
  gsap.to($$('[data-hero-fade]', section), { opacity: 1, y: 0, startAt: { y: 22 }, duration: 1.2, ease: EXPO, stagger: 0.09, delay: delay + 0.45 });

  const plan = section.querySelector<HTMLElement>('[data-plan]');
  if (!plan) return;
  const tilt = plan.querySelector<HTMLElement>('.plan-tilt');
  // La posa di riposo (assonometria) va letta PRIMA del from() qui sotto, che
  // porta subito la tavola in piano: letta dopo, il puntatore la appiattiva.
  // GSAP chiama `rotation` la rotazione sul piano: con `rotationZ` (un alias)
  // quickTo non trova la proprietà e reinizializza il tween a ogni movimento.
  const rest = tilt ? { x: Number(gsap.getProperty(tilt, 'rotationX')), z: Number(gsap.getProperty(tilt, 'rotation')) } : null;

  // La tavola: prima i muri, poi quote e finestre, infine gli arredi che
  // arrivano dall'ingresso e vanno ciascuno nella sua stanza.
  const tl = gsap.timeline({ delay: delay + 0.1 });
  tl.to($$('.wall.s', plan), { strokeDashoffset: 0, duration: 1.9, ease: 'power3.inOut', stagger: 0.07 })
    .to($$('.thin.s, .brass.s', plan), { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', stagger: 0.035 }, 0.7)
    .to($$('[data-fade]', plan), { opacity: 1, duration: 0.8, stagger: 0.06 }, 1.5)
    .fromTo(
      $$('[data-piece]', plan),
      { opacity: 0, x: (_, el) => Number((el as HTMLElement).dataset.dx ?? 0), y: (_, el) => Number((el as HTMLElement).dataset.dy ?? 0), rotation: (i) => (i % 2 ? 14 : -14), transformOrigin: '50% 50%' },
      { opacity: 1, x: 0, y: 0, rotation: 0, duration: 1.7, ease: EXPO, stagger: 0.11 },
      1.4,
    );
  if (tilt && rest) {
    tl.from(tilt, { rotationX: 0, rotation: 0, scale: 0.82, duration: 2.6, ease: 'power4.inOut' }, 0);
    gsap.to(plan, { yPercent: 12, opacity: 0.45, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } });
    if (fine()) {
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 1.2, ease: 'power3' });
      const rz = gsap.quickTo(tilt, 'rotation', { duration: 1.2, ease: 'power3' });
      // Un solo aggiornamento per fotogramma, qualunque sia la frequenza del mouse.
      let px = 0.5;
      let py = 0.5;
      let queued = false;
      const apply = () => {
        queued = false;
        rx(rest.x + (0.5 - py) * 9);
        rz(rest.z + (px - 0.5) * 12);
      };
      section.addEventListener(
        'pointermove',
        (e) => {
          if (tl.progress() < 1) return;
          px = e.clientX / window.innerWidth;
          py = e.clientY / window.innerHeight;
          if (queued) return;
          queued = true;
          requestAnimationFrame(apply);
        },
        { signal, passive: true },
      );
    }
  }
  const text = section.querySelector('[data-hero-text]');
  if (text) gsap.to(text, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } });
}

/* ── Ciclo di vita di una pagina ───────────────────────────────────── */

/** Accende le animazioni della pagina corrente. Restituisce la pulizia. */
export function initPage({ delay = 0 }: { delay?: number } = {}): () => void {
  boot();
  const abort = new AbortController();
  const media = gsap.matchMedia();
  const ctx = gsap.context(() => {
    hero(delay, abort.signal);
    // I titoli dentro la hero partono con la sequenza, gli altri allo scroll.
    splitHeadings((el) => (el.closest('[data-hero]') ? delay + 0.2 : null));
    reveals();
    scrollLinked();
    horizontal(media);
    pointer(abort.signal);
  });
  // Quando i font sono pronti le altezze cambiano: si ricalcola.
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad, { once: true });

  return () => {
    abort.abort();
    window.removeEventListener('load', onLoad);
    media.revert();
    ctx.revert();
    if (lens) gsap.set(lens, { scale: 0, opacity: 0 });
  };
}
