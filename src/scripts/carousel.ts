// Carrossel de projetos com dois modos:
// - Fixado (desktop com mouse): a seção fica presa na tela e o scroll vertical da página move a faixa
//   na horizontal. Ao chegar no último card, a página volta ao fluxo normal.
// - Nativo (celular, tablet, telas baixas, movimento reduzido): scroll horizontal com scroll-snap,
//   botões, teclado e arrasto com mouse.
export function initCarousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const pin = root.querySelector<HTMLElement>('[data-carousel-pin]');
  if (!track || !pin) return;

  const slides = Array.from(track.children) as HTMLElement[];
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const current = root.querySelector<HTMLElement>('[data-carousel-current]');
  const bar = root.querySelector<HTMLElement>('[data-carousel-bar]');
  const total = slides.length;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const pinQuery = window.matchMedia(
    '(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  );

  let index = 0;
  let pinned = false;
  let distance = 0; // deslocamento horizontal total no modo fixado
  let offset = 0; // deslocamento atual no modo fixado

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  const position = () => (pinned ? offset : track.scrollLeft);
  const maxScroll = () => (pinned ? distance : track.scrollWidth - track.clientWidth);
  // padding (e não scroll-padding): sempre resolve em px, mesmo quando a faixa deixa de ser rolável
  const paddingStart = () => parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
  const targetFor = (i: number) => clamp(slides[i].offsetLeft - paddingStart(), 0, maxScroll());

  // Primeiro card alinhado (ou mais perto de alinhar) ao início da faixa
  const nearest = () => {
    const x = position();
    let best = 0;
    let bestDistance = Infinity;
    slides.forEach((_, i) => {
      const d = Math.abs(targetFor(i) - x);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    return best;
  };

  // Intervalo visível (cards com pelo menos metade na tela): no desktop cabem vários ao mesmo tempo
  const firstVisible = () => {
    const viewStart = position();
    const i = slides.findIndex((slide) => slide.offsetLeft + slide.offsetWidth / 2 >= viewStart);
    return i === -1 ? total - 1 : i;
  };

  const lastVisible = (first: number) => {
    const viewEnd = position() + track.clientWidth;
    let last = first;
    for (let i = first + 1; i < total; i++) {
      if (slides[i].offsetLeft + slides[i].offsetWidth / 2 <= viewEnd) last = i;
    }
    return last;
  };

  const label = (i: number) => String(i + 1).padStart(2, '0');

  const update = () => {
    const x = position();
    const max = maxScroll();
    index = nearest();
    const first = firstVisible();
    const last = lastVisible(first);
    const text = first === last ? label(first) : `${label(first)}–${label(last)}`;
    if (current && current.textContent !== text) current.textContent = text;
    const ratio = max > 0 ? x / max : 1;
    if (bar) bar.style.transform = `scaleX(${1 / total + (1 - 1 / total) * ratio})`;
    if (prev) prev.disabled = x <= 2;
    if (next) next.disabled = x >= max - 2;
  };

  const pinTop = () => pin.getBoundingClientRect().top + window.scrollY;

  const go = (i: number) => {
    const target = targetFor(clamp(i, 0, total - 1));
    if (pinned) {
      window.scrollTo({ top: pinTop() + target, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  };

  // Modo fixado: o progresso do scroll vertical dentro da área fixada vira deslocamento horizontal (1:1)
  const syncPinned = () => {
    const progress = distance > 0 ? clamp(-pin.getBoundingClientRect().top / distance, 0, 1) : 0;
    offset = progress * distance;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    update();
  };

  const pinnedDistance = () => {
    const last = slides[total - 1];
    const paddingEnd = parseFloat(getComputedStyle(track).paddingInlineEnd) || 0;
    return Math.max(0, last.offsetLeft + last.offsetWidth + paddingEnd - track.clientWidth);
  };

  const measure = () => {
    if (pinned) {
      distance = pinnedDistance();
      pin.style.height = `calc(100vh + ${distance}px)`;
      syncPinned();
    } else {
      distance = 0;
      offset = 0;
      pin.style.height = '';
      track.style.transform = '';
      update();
    }
  };

  const setMode = () => {
    pinned = pinQuery.matches;
    root.classList.toggle('is-pinned', pinned);
    // Se todos os cards já cabem na tela, não há percurso: a seção segue o fluxo normal
    if (pinned && pinnedDistance() < 40) {
      pinned = false;
      root.classList.remove('is-pinned');
    }
    // No modo fixado o contador muda a cada rolagem da página: anunciar tudo vira ruído no leitor de tela
    current?.parentElement?.setAttribute('aria-live', pinned ? 'off' : 'polite');
    measure();
  };

  let frame = 0;
  const schedule = (task: () => void) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(task);
  };
  track.addEventListener('scroll', () => schedule(update), { passive: true });
  window.addEventListener('scroll', () => pinned && schedule(syncPinned), { passive: true });
  window.addEventListener('resize', () => schedule(setMode));
  pinQuery.addEventListener('change', setMode);

  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    go(index + (event.key === 'ArrowRight' ? 1 : -1));
  });

  // No modo fixado a faixa não rola sozinha: um card focado pelo teclado fora da tela é trazido até ela
  track.addEventListener('focusin', (event) => {
    if (!pinned) return;
    const i = slides.findIndex((slide) => slide.contains(event.target as Node));
    if (i === -1) return;
    const left = slides[i].offsetLeft - offset;
    if (left < 0 || left + slides[i].offsetWidth > track.clientWidth) go(i);
  });

  // Arrasto com mouse no modo nativo (touch e trackpad já são nativos)
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;
  let startIndex = 0;

  const release = () => track.classList.remove('is-dragging');

  track.addEventListener('pointerdown', (event) => {
    if (pinned || !finePointer.matches || event.pointerType !== 'mouse' || event.button !== 0) return;
    dragging = true;
    moved = false;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    startIndex = index;
  });

  track.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    if (!moved && Math.abs(dx) > 6) {
      moved = true;
      track.setPointerCapture(event.pointerId);
      track.classList.add('is-dragging');
    }
    if (moved) track.scrollLeft = startScroll - dx;
  });

  const endDrag = (event: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    if (!moved) return;

    const dx = event.clientX - startX;
    let target = nearest();
    // Um gesto curto e decidido ainda avança um card
    if (target === startIndex && Math.abs(dx) > 40) target = startIndex + (dx < 0 ? 1 : -1);
    go(target);
    track.addEventListener('scrollend', release, { once: true });
    window.setTimeout(release, 700);
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // Um arrasto não pode virar clique no link do card
  track.addEventListener(
    'click',
    (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    },
    true,
  );
  track.addEventListener('dragstart', (event) => event.preventDefault());

  setMode();
}
