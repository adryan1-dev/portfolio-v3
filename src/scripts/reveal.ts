// Marca cada [data-reveal-group] com .is-in uma única vez, quando entra na tela.
// As animações ficam em global.css; aqui só decidimos o momento.
export function initReveal() {
  const groups = document.querySelectorAll('[data-reveal-group]');

  if (!('IntersectionObserver' in window)) {
    groups.forEach((group) => group.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    // Dispara um pouco antes do fim da tela, para a animação acontecer onde o olho está
    { rootMargin: '0px 0px -10% 0px' },
  );

  groups.forEach((group) => observer.observe(group));
}
