'use strict';
const $ = id => document.getElementById(id);
const largo = texto => Array.from(texto).length;
const normalizar = texto => texto.trim().toLocaleLowerCase('es');
const usuarioValido = texto => /^\p{L}[\p{L}0-9_]{2,19}$/u.test(texto);
const personas = ['alex_01', 'raul_01', 'daniel_01', 'kenyi_01'];
const chats = new Map([
  ['alex_01', { anterior: false, mensajes: [
    { id: 'a1', propio: false, texto: '¿Revisamos el informe hoy?', hora: '10:30' },
    { id: 'a2', propio: true, texto: 'Sí, ya tengo el primer borrador.', hora: '10:31' },
    { id: 'a3', propio: false, texto: 'Perfecto. Empezamos por los requisitos.', hora: '10:32' }
  ] }],
  ['raul_01', { anterior: false, mensajes: [
    { id: 'r1', propio: false, texto: '¿Comparamos el diagrama después de clase?', hora: '09:10' },
    { id: 'r2', propio: true, texto: 'De acuerdo, llevo mis apuntes.', hora: '09:12' }
  ] }],
  ['daniel_01', { anterior: false, mensajes: [
    { id: 'd1', propio: false, texto: 'El ejemplo de mensajes ya está listo.', hora: '08:40' }
  ] }]
]);
let usuarioActual = 'alumno_01';
let activo = 'alex_01';
let conectado = true;
let encontrado = null;
let secuencia = 0;
const borradores = new Map();
const pendientes = new Map();

function anunciar(texto) { $('aviso').textContent = texto; }
function crear(tag, clase, texto) {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
}
function mostrarVista(vista) {
  document.body.dataset.vista = vista;
  for (const id of ['ingreso', 'registro', 'chat']) $(id).hidden = id !== vista;
  $('red-ejemplo').hidden = vista !== 'chat';
  if (vista !== 'chat') requestAnimationFrame(() => $('titulo-' + vista).focus());
}
function errorFormulario(form, mensajeId, campo, texto) {
  for (const input of form.querySelectorAll('input')) input.removeAttribute('aria-invalid');
  $(mensajeId).textContent = texto;
  if (campo) { campo.setAttribute('aria-invalid', 'true'); campo.focus(); }
}
function entrar(usuario = 'alumno_01') {
  usuarioActual = usuario;
  $('usuario-actual').textContent = usuarioActual;
  document.body.dataset.panel = 'lista';
  mostrarVista('chat');
  dibujarLista();
  seleccionarChat(activo, false);
  dibujarConexion();
  anunciar('Chat de ejemplo abierto. Los datos son ficticios.');
}
function dibujarLista() {
  const items = [];
  for (const [usuario, chat] of chats) {
    const boton = crear('button', 'fila-chat');
    boton.type = 'button';
    boton.dataset.usuario = usuario;
    boton.setAttribute('aria-pressed', String(usuario === activo));
    boton.append(crear('strong', '', usuario));
    boton.append(crear('span', '', chat.mensajes.at(-1)?.texto || 'Conversación sin mensajes'));
    boton.addEventListener('click', () => seleccionarChat(usuario, true));
    items.push(boton);
  }
  $('lista-conversaciones').replaceChildren(...items);
}
function dibujarMensajes(alFinal = true) {
  const chat = chats.get(activo);
  const items = [];
  for (const dato of chat.mensajes) {
    const fila = crear('div', 'fila-mensaje' + (dato.propio ? ' propio' : ''));
    fila.dataset.mensaje = dato.id;
    const mensaje = crear('article', 'mensaje');
    mensaje.append(crear('p', 'emisor', dato.propio ? usuarioActual : activo));
    mensaje.append(crear('p', 'contenido-mensaje', dato.texto));
    mensaje.append(crear('time', 'hora', dato.hora));
    fila.append(mensaje); items.push(fila);
  }
  if (!items.length) items.push(crear('p', 'vacio', 'Esta conversación aún no tiene mensajes.'));
  $('mensajes').replaceChildren(...items);
  $('anteriores').disabled = chat.anterior || !chat.mensajes.length;
  $('anteriores').textContent = chat.anterior ? 'No hay más mensajes de ejemplo' : 'Ver mensajes anteriores';
  if (alFinal) $('historial').scrollTop = $('historial').scrollHeight;
}
function seleccionarChat(usuario, abrir) {
  if (chats.has(activo)) borradores.set(activo, $('texto-mensaje').value);
  activo = usuario;
  $('titulo-chat').textContent = usuario;
  $('texto-mensaje').value = borradores.get(usuario) || '';
  $('error-envio').textContent = pendientes.has(usuario) ? 'Envío pendiente. Pulsa Reintentar cuando haya conexión.' : '';
  $('reintentar').hidden = !pendientes.has(usuario);
  $('texto-mensaje').removeAttribute('aria-invalid');
  dibujarLista(); dibujarMensajes(); actualizarContador();
  if (abrir) {
    document.body.dataset.panel = 'chat';
    requestAnimationFrame(() => $('titulo-chat').focus());
  }
}
function actualizarContador() {
  const cantidad = largo($('texto-mensaje').value);
  $('contador').textContent = cantidad + ' / 1000';
  $('contador').classList.toggle('excedido', cantidad > 1000);
  borradores.set(activo, $('texto-mensaje').value);
}
function dibujarConexion() {
  $('estado-conexion').textContent = conectado ? 'Chat privado · Conexión simulada activa' : 'Chat privado · Sin conexión (simulada)';
  $('red-ejemplo').textContent = conectado ? 'Simular desconexión' : 'Restablecer conexión';
  $('red-ejemplo').setAttribute('aria-pressed', String(!conectado));
}
function enviarMensaje() {
  const campo = $('texto-mensaje');
  const texto = campo.value;
  $('error-envio').textContent = '';
  campo.removeAttribute('aria-invalid');
  if (!texto.trim() || largo(texto) > 1000) {
    $('error-envio').textContent = !texto.trim() ? 'Escribe un mensaje que no esté vacío.' : 'El mensaje puede tener hasta 1000 caracteres.';
    campo.setAttribute('aria-invalid', 'true'); campo.focus(); return;
  }
  let intento = pendientes.get(activo);
  if (!intento || intento.texto !== texto) intento = { id: globalThis.crypto?.randomUUID?.() || 'ejemplo-' + (++secuencia), texto };
  if (!conectado) {
    pendientes.set(activo, intento);
    $('error-envio').textContent = 'No se pudo enviar. El texto se conserva; restablece la conexión y pulsa Reintentar.';
    $('reintentar').hidden = false;
    campo.focus(); return;
  }
  const chat = chats.get(activo);
  if (!chat.mensajes.some(m => m.id === intento.id)) chat.mensajes.push({
    id: intento.id, propio: true, texto,
    hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false })
  });
  pendientes.delete(activo); borradores.delete(activo);
  campo.value = ''; $('reintentar').hidden = true;
  actualizarContador(); dibujarLista(); dibujarMensajes();
  anunciar('Mensaje de ejemplo añadido a la conversación con ' + activo + '.');
  campo.focus();
}

document.querySelectorAll('button[data-vista]').forEach(boton => boton.addEventListener('click', () => mostrarVista(boton.dataset.vista)));
$('ver-ejemplo').addEventListener('click', () => entrar());
$('form-ingreso').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const id = normalizar($('identificador').value);
  if (!/^\d{6}$/.test(id) && !usuarioValido(id)) return errorFormulario(form, 'error-ingreso', $('identificador'), 'Ingresa un usuario válido o un código de 6 dígitos.');
  if (largo($('clave-ingreso').value) < 8) return errorFormulario(form, 'error-ingreso', $('clave-ingreso'), 'La contraseña de ejemplo necesita al menos 8 caracteres.');
  errorFormulario(form, 'error-ingreso', null, '');
  if (personas.includes(id)) return errorFormulario(form, 'error-ingreso', $('identificador'), 'Ese usuario representa a otro participante del ejemplo. Puedes usar alumno_01 o 012345.');
  const nombre = /^\d{6}$/.test(id) ? 'alumno_01' : id;
  form.reset(); entrar(nombre);
});
$('form-registro').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget;
  if (!$('nombre-completo').value.trim()) return errorFormulario(form, 'error-registro', $('nombre-completo'), 'Completa el nombre del ejemplo.');
  if (!/^\d{6}$/.test($('codigo-estudiante').value.trim())) return errorFormulario(form, 'error-registro', $('codigo-estudiante'), 'El código necesita exactamente 6 dígitos.');
  const usuario = normalizar($('nombre-usuario').value);
  if (!usuarioValido(usuario)) return errorFormulario(form, 'error-registro', $('nombre-usuario'), 'Usa de 3 a 20 letras, números o guion bajo, comenzando por una letra.');
  if (personas.includes(usuario)) return errorFormulario(form, 'error-registro', $('nombre-usuario'), 'Ese usuario ya aparece en los datos de ejemplo. Elige otro.');
  if (largo($('clave-registro').value) < 8) return errorFormulario(form, 'error-registro', $('clave-registro'), 'La contraseña de ejemplo necesita al menos 8 caracteres.');
  errorFormulario(form, 'error-registro', null, ''); form.reset(); entrar(usuario);
});
$('form-busqueda').addEventListener('submit', event => {
  event.preventDefault(); const nombre = normalizar($('buscar-usuario').value);
  encontrado = personas.includes(nombre) && nombre !== usuarioActual ? nombre : null;
  $('resultado-busqueda').textContent = encontrado ? 'Usuario encontrado: ' + encontrado : 'No se encontró un usuario con ese nombre exacto.';
  $('abrir-resultado').hidden = !encontrado;
});
$('abrir-resultado').addEventListener('click', () => {
  if (!encontrado) return;
  if (!chats.has(encontrado)) chats.set(encontrado, { anterior: true, mensajes: [] });
  seleccionarChat(encontrado, true);
});
$('form-mensaje').addEventListener('submit', event => { event.preventDefault(); enviarMensaje(); });
$('texto-mensaje').addEventListener('input', actualizarContador);
$('texto-mensaje').addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); enviarMensaje(); }
});
$('reintentar').addEventListener('click', enviarMensaje);
$('red-ejemplo').addEventListener('click', () => { conectado = !conectado; dibujarConexion(); anunciar(conectado ? 'Conexión de ejemplo restablecida. Los envíos pendientes requieren reintento manual.' : 'Desconexión de ejemplo activada.'); });
$('anteriores').addEventListener('click', () => {
  const chat = chats.get(activo); if (chat.anterior) return;
  const alto = $('historial').scrollHeight;
  chat.mensajes.unshift({ id: 'anterior-' + activo, propio: false, texto: 'Podemos organizar la revisión paso a paso.', hora: '10:20' });
  chat.anterior = true; dibujarMensajes(false); $('historial').scrollTop += $('historial').scrollHeight - alto;
  anunciar('Se mostró un mensaje anterior de ejemplo.');
});
$('volver-lista').addEventListener('click', () => { document.body.dataset.panel = 'lista'; const actual = [...$('lista-conversaciones').children].find(b => b.dataset.usuario === activo); actual?.focus(); });
$('salir').addEventListener('click', () => {
  for (const form of document.querySelectorAll('form')) form.reset();
  borradores.clear(); pendientes.clear(); conectado = true; encontrado = null;
  $('resultado-busqueda').textContent = ''; $('abrir-resultado').hidden = true;
  $('error-envio').textContent = ''; $('error-ingreso').textContent = ''; $('error-registro').textContent = '';
  mostrarVista('ingreso'); anunciar('Se cerró la vista de ejemplo.');
});
if (location.hash === '#chat') entrar();
