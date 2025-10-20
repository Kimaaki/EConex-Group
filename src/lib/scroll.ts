'use client';

export function scrollToCalculator() {
  // suporta id padrão e fallback por data-attr
  const el =
    document.getElementById('calculadora-orcamento') ??
    document.querySelector('[data-calculator-root]');
  if (el instanceof HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // fallback para hash caso o elemento ainda não esteja no DOM
    window.location.hash = '#calculadora-orcamento';
  }
}