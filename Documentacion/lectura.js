'use strict';
const menu = document.querySelector('.menu-pasos');
if (menu) {
  const ancho = window.matchMedia('(min-width: 980px)');
  const ajustarMenu = () => { menu.open = ancho.matches; };
  ajustarMenu(); ancho.addEventListener('change', ajustarMenu);
}
const entrada = document.getElementById('buscar-tema');
if (entrada) {
  const limpiar = document.getElementById('limpiar-busqueda');
  const normalizar = valor => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  const filtrar = () => {
    const busqueda = normalizar(entrada.value.trim()); let visibles = 0;
    document.querySelectorAll('[data-tema]').forEach(item => {
      item.hidden = !normalizar(item.dataset.tema).includes(busqueda);
      if (!item.hidden) visibles++;
    });
    document.querySelectorAll('.grupo').forEach(grupo => { grupo.hidden = ![...grupo.querySelectorAll('[data-tema]')].some(item => !item.hidden); });
    limpiar.hidden = !busqueda;
    const estado = document.getElementById('resultado-busqueda'); estado.hidden = !busqueda;
    estado.textContent = visibles === 1 ? '1 tema encontrado' : visibles + ' temas encontrados';
    document.getElementById('sin-resultados').hidden = visibles > 0;
  };
  entrada.addEventListener('input', filtrar);
  limpiar.addEventListener('click', () => { entrada.value = ''; filtrar(); entrada.focus(); });
}
const visor = document.getElementById('visor');
if (visor && typeof visor.showModal === 'function') {
  const imagen = document.getElementById('imagen-ampliada');
  const tamano = document.getElementById('tamano-real'); let origen = null;
  document.querySelectorAll('.ampliar-imagen').forEach(enlace => enlace.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); origen = enlace; imagen.src = enlace.href;
    imagen.alt = enlace.querySelector('img').alt; document.getElementById('visor-titulo').textContent = imagen.alt;
    visor.classList.remove('real'); tamano.setAttribute('aria-pressed', 'false'); visor.showModal();
  }));
  document.getElementById('cerrar-visor').addEventListener('click', () => visor.close());
  visor.addEventListener('close', () => { origen?.focus(); });
  tamano.addEventListener('click', () => { const real = visor.classList.toggle('real'); tamano.setAttribute('aria-pressed', String(real)); });
}
