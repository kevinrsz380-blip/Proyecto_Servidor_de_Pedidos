/* El Puesto de Kevin — lógica compartida (HTML + CSS + JavaScript, sin servidor) */
(function () {
  'use strict';

  /* ---------- Datos del negocio (inventados para el proyecto) ---------- */
  const CONTACTO = {
    nombre: 'Kevin Roblero Sánchez',
    cargo: 'Encargado del puesto',
    tel: '664 555 0142',
    wa: '526645550142',
    correo: 'kevin.roblero@elpuestodekevin.example',
    direccion: 'Calle 5ta, Col. Obrera, Zona Este #22566, Tijuana, B.C.',
    domicilioBase: 'Calle 5ta, Obrera, Colonia Zona Este #22566',
    ig: '@elpuestodekevin'
  };
  const EQUIPO = ['Roblero Sánchez Kevin', 'Pérez Rivera Kevin Salvador', 'Pérez Torres Ángel Giovanni'];
  const ENVIO = 30, ENVIO_GRATIS = 400;

  // 0 = domingo ... 6 = sábado
  const HORARIOS = [
    { dia: 'Domingo',   abre: 13, cierra: 20 },
    { dia: 'Lunes',     abre: 0,  cierra: 0 },
    { dia: 'Martes',    abre: 12, cierra: 21 },
    { dia: 'Miércoles', abre: 12, cierra: 21 },
    { dia: 'Jueves',    abre: 12, cierra: 21 },
    { dia: 'Viernes',   abre: 12, cierra: 23 },
    { dia: 'Sábado',    abre: 12, cierra: 23 }
  ];

  const CAT_EMOJI = { 'Pizzas': '🍕', 'Sushi': '🍣', 'Pollo': '🍗', 'Tacos': '🌮', 'Hamburguesas': '🍔', 'Antojitos': '🌽', 'Bebidas': '🥤', 'Postres': '🍰' };

  const MENU = [
    // Pizzas
    { id: 'pizza-peperoni', cat: 'Pizzas', nombre: 'Pizza de peperoni', precio: 250, emoji: '🍕', img: 'img/pizza.jpg', tag: 'Más vendido', desc: 'Pizza grande con salsa de la casa, mucho queso y rodajas de peperoni.' },
    { id: 'pizza-hawaiana', cat: 'Pizzas', nombre: 'Pizza hawaiana', precio: 240, emoji: '🍍', desc: 'Jamón y piña sobre queso mozzarella. Dulce, salada y sin pena.' },
    { id: 'pizza-mexicana', cat: 'Pizzas', nombre: 'Pizza mexicana', precio: 260, emoji: '🌶️', tag: 'Picante', desc: 'Chorizo, frijoles, jalapeño y cebolla morada.' },
    { id: 'pizza-4quesos', cat: 'Pizzas', nombre: 'Pizza cuatro quesos', precio: 270, emoji: '🧀', tag: 'Vegetariano', desc: 'Mozzarella, parmesano, gouda y queso crema.' },
    // Sushi
    { id: 'sushi-empanizado', cat: 'Sushi', nombre: 'Sushi empanizado', precio: 110, emoji: '🍣', img: 'img/sushi.jpg', tag: 'Más vendido', desc: 'Rollo empanizado con queso crema, surimi y pepino. Crujiente por fuera.' },
    { id: 'sushi-philadelphia', cat: 'Sushi', nombre: 'Rollo Philadelphia', precio: 120, emoji: '🍥', desc: 'Salmón, queso crema y aguacate.' },
    { id: 'sushi-tampico', cat: 'Sushi', nombre: 'Rollo Tampico', precio: 130, emoji: '🦐', tag: 'Picante', desc: 'Camarón empanizado con salsa spicy y aguacate.' },
    { id: 'sushi-gladiador', cat: 'Sushi', nombre: 'Rollo Gladiador', precio: 140, emoji: '🔥', desc: 'Res teriyaki, queso y tocino, cubierto con ajonjolí.' },
    { id: 'sushi-combo', cat: 'Sushi', nombre: 'Combo de 3 rollos', precio: 289, emoji: '🍱', tag: 'Para compartir', desc: 'Empanizado + Philadelphia + Tampico, con soya y wasabi.' },
    // Pollo
    { id: 'pollo-empanizado', cat: 'Pollo', nombre: 'Pollo empanizado', precio: 170, emoji: '🍗', img: 'img/pollo.jpg', tag: 'Más vendido', desc: 'Piezas doradas y crujientes con papas y salsa a elegir.' },
    { id: 'alitas-bbq', cat: 'Pollo', nombre: 'Alitas BBQ (10 pzas)', precio: 150, emoji: '🍖', desc: 'Bañadas en salsa BBQ ahumada, con apio y aderezo ranch.' },
    { id: 'alitas-buffalo', cat: 'Pollo', nombre: 'Alitas Buffalo (10 pzas)', precio: 150, emoji: '🌶️', tag: 'Picante', desc: 'Clásicas, picosas y mantequillosas.' },
    { id: 'tenders', cat: 'Pollo', nombre: 'Tenders (6 pzas)', precio: 140, emoji: '🐔', desc: 'Tiras de pechuga empanizada con dos aderezos.' },
    { id: 'pollo-asado', cat: 'Pollo', nombre: 'Medio pollo asado', precio: 180, emoji: '🔥', desc: 'Con arroz, frijoles, salsa y tortillas calientitas.' },
    // Tacos
    { id: 'tacos-asada', cat: 'Tacos', nombre: 'Tacos de asada (3)', precio: 85, emoji: '🌮', desc: 'Carne asada al carbón con cebolla, cilantro y limón.' },
    { id: 'tacos-pastor', cat: 'Tacos', nombre: 'Tacos al pastor (3)', precio: 75, emoji: '🌮', tag: 'Más vendido', desc: 'Con piña, cebolla y salsa roja.' },
    { id: 'tacos-pescado', cat: 'Tacos', nombre: 'Tacos de pescado (3)', precio: 95, emoji: '🐟', desc: 'Estilo Baja: pescado capeado, col morada y aderezo de chipotle.' },
    { id: 'tacos-birria', cat: 'Tacos', nombre: 'Tacos de birria (3)', precio: 110, emoji: '🥘', tag: 'Nuevo', desc: 'Con queso derretido y consomé para remojar.' },
    // Hamburguesas
    { id: 'hamb-clasica', cat: 'Hamburguesas', nombre: 'Hamburguesa clásica', precio: 95, emoji: '🍔', desc: 'Carne, lechuga, jitomate, cebolla y queso amarillo.' },
    { id: 'hamb-doble', cat: 'Hamburguesas', nombre: 'Hamburguesa doble', precio: 130, emoji: '🍔', desc: 'Doble carne, doble queso y pan brioche.' },
    { id: 'hamb-bbq', cat: 'Hamburguesas', nombre: 'BBQ Bacon', precio: 145, emoji: '🥓', desc: 'Tocino crujiente, aros de cebolla y salsa BBQ.' },
    { id: 'hamb-veggie', cat: 'Hamburguesas', nombre: 'Hamburguesa veggie', precio: 120, emoji: '🥬', tag: 'Vegetariano', desc: 'Medallón de lentejas y avena, aguacate y germinado.' },
    // Antojitos
    { id: 'hotdog-sonora', cat: 'Antojitos', nombre: 'Hot dog estilo Sonora', precio: 65, emoji: '🌭', desc: 'Salchicha envuelta en tocino, frijoles, queso, pico de gallo y aguacate.' },
    { id: 'esquites', cat: 'Antojitos', nombre: 'Esquites', precio: 45, emoji: '🌽', tag: 'Vegetariano', desc: 'Con mayonesa, queso cotija, chile en polvo y limón.' },
    { id: 'elote', cat: 'Antojitos', nombre: 'Elote asado', precio: 40, emoji: '🌽', tag: 'Vegetariano', desc: 'Al carbón, con mayonesa, queso y chile.' },
    { id: 'banderilla', cat: 'Antojitos', nombre: 'Banderilla', precio: 35, emoji: '🍢', desc: 'Salchicha en masa dorada con cátsup y mostaza.' },
    { id: 'papas-gajo', cat: 'Antojitos', nombre: 'Papas a la francesa', precio: 70, emoji: '🍟', tag: 'Vegetariano', desc: 'Porción grande con sal de ajo y queso.' },
    { id: 'nachos', cat: 'Antojitos', nombre: 'Nachos con queso', precio: 90, emoji: '🧀', tag: 'Vegetariano', desc: 'Totopos, queso fundido, frijoles y jalapeños.' },
    // Bebidas
    { id: 'jamaica', cat: 'Bebidas', nombre: 'Agua de jamaica (1 L)', precio: 30, emoji: '🌺', tag: 'Vegetariano', desc: 'Fresca y natural, con poca azúcar.' },
    { id: 'horchata', cat: 'Bebidas', nombre: 'Agua de horchata (1 L)', precio: 30, emoji: '🥛', desc: 'Con arroz y canela, bien fría.' },
    { id: 'limonada', cat: 'Bebidas', nombre: 'Limonada mineral', precio: 35, emoji: '🍋', desc: 'Con agua mineral y hierbabuena.' },
    { id: 'refresco', cat: 'Bebidas', nombre: 'Refresco de lata', precio: 28, emoji: '🥤', desc: 'Cola, naranja o limón-lima.' },
    { id: 'cafe-frio', cat: 'Bebidas', nombre: 'Café frío', precio: 45, emoji: '🧋', tag: 'Nuevo', desc: 'Café cold brew con leche y hielo.' },
    // Postres
    { id: 'churros', cat: 'Postres', nombre: 'Churros con cajeta', precio: 55, emoji: '🥖', desc: 'Seis churros espolvoreados con azúcar y canela.' },
    { id: 'helado-frito', cat: 'Postres', nombre: 'Helado frito', precio: 60, emoji: '🍨', tag: 'Nuevo', desc: 'Bola de vainilla en capa crujiente con chocolate.' },
    { id: 'flan', cat: 'Postres', nombre: 'Flan napolitano', precio: 50, emoji: '🍮', desc: 'Casero, con caramelo oscuro.' },
    { id: 'pay-limon', cat: 'Postres', nombre: 'Pay de limón', precio: 55, emoji: '🥧', desc: 'Base de galleta y merengue ligero.' }
  ];
  const porId = id => MENU.find(m => m.id === id);

  /* ---------- Utilidades ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
  const leer = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };

  /* ---------- Carrito (se guarda en el navegador) ---------- */
  const K_CART = 'epk_carrito', K_ORD = 'epk_ordenes';
  const carrito = () => leer(K_CART, {});
  function ponerCarrito(c) { guardar(K_CART, c); pintarBadge(); }
  function agregar(id, n = 1) {
    const c = carrito();
    c[id] = (c[id] || 0) + n;
    if (c[id] <= 0) delete c[id];
    ponerCarrito(c);
  }
  function lineas() {
    const c = carrito();
    return Object.keys(c).filter(id => porId(id)).map(id => ({ ...porId(id), qty: c[id] }));
  }
  function totales(ls) {
    const sub = ls.reduce((a, l) => a + l.precio * l.qty, 0);
    const envio = sub === 0 ? 0 : (sub >= ENVIO_GRATIS ? 0 : ENVIO);
    return { sub, envio, total: sub + envio };
  }
  const cuantos = () => lineas().reduce((a, l) => a + l.qty, 0);

  /* ---------- Horario ---------- */
  const hora = h => `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'p. m.' : 'a. m.'}`;
  function estadoNegocio() {
    const n = new Date(), d = HORARIOS[n.getDay()], h = n.getHours() + n.getMinutes() / 60;
    if (!d.abre) return { abierto: false, txt: 'Hoy descansamos. ¡Nos vemos mañana!' };
    if (h >= d.abre && h < d.cierra) return { abierto: true, txt: `Abierto ahora · cerramos a las ${hora(d.cierra)}` };
    if (h < d.abre) return { abierto: false, txt: `Cerrado · abrimos hoy a las ${hora(d.abre)}` };
    return { abierto: false, txt: 'Cerrado por hoy · ¡Hasta mañana!' };
  }
  function pintarEstado() {
    const e = estadoNegocio();
    $$('.js-estado').forEach(el => {
      el.className = 'pill js-estado ' + (e.abierto ? 'abierto' : 'cerrado');
      el.innerHTML = `<i></i>${esc(e.txt)}`;
    });
  }

  /* ---------- Piezas comunes ---------- */
  function pintarMarco(pagina) {
    const links = [['index.html', 'inicio', 'Inicio'], ['menu.html', 'menu', 'Menú'], ['ordenes.html', 'ordenes', 'Órdenes'], ['horarios.html', 'horarios', 'Horarios'], ['soporte.html', 'soporte', 'Ayuda']];
    const nav = $('#nav');
    if (nav) {
      nav.outerHTML = `<header class="topbar"><div class="in">
        <a class="logo" href="index.html" aria-label="Ir al inicio">🛵 El Puesto de <b>Kevin</b></a>
        <nav aria-label="Principal">${links.map(([h, k, t]) =>
          `<a href="${h}" class="${k === pagina ? 'on' : ''}"${k === pagina ? ' aria-current="page"' : ''}>${t}${k === 'ordenes' ? '<span class="badge" id="badge">0</span>' : ''}</a>`).join('')}</nav>
      </div></header>`;
    }
    const pie = $('#pie');
    if (pie) {
      pie.outerHTML = `<footer><div class="in">
        <div><h4>El Puesto de Kevin</h4><p>Servidor de pedidos para puesto de comida. Comida a domicilio, hecha al momento.</p></div>
        <div><h4>Contacto</h4>
          <p>${esc(CONTACTO.nombre)} · ${esc(CONTACTO.cargo)}<br>
          📞 <a href="tel:+${CONTACTO.wa}">${CONTACTO.tel}</a><br>
          ✉️ <a href="mailto:${CONTACTO.correo}">${CONTACTO.correo}</a><br>
          📍 ${esc(CONTACTO.direccion)}</p></div>
        <div><h4>Equipo del proyecto</h4><p>${EQUIPO.map(esc).join('<br>')}</p>
          <p class="nota" style="color:#9fc4d8">Datos de contacto y ubicación ficticios, con fines escolares.</p></div>
      </div></footer>`;
    }
    pintarBadge();
  }
  function pintarBadge() { const b = $('#badge'); if (b) b.textContent = cuantos(); }
  let tt;
  function aviso(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2000);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]');
    if (b) { agregar(b.dataset.add); aviso(`${porId(b.dataset.add).nombre} agregado 🛒`); }
  });

  /* ---------- Tarjeta de platillo ---------- */
  function tarjeta(m) {
    const media = m.img ? `<img src="${m.img}" alt="${esc(m.nombre)}" loading="lazy">` : `<div class="emoji" aria-hidden="true">${m.emoji}</div>`;
    return `<article class="card">${m.tag ? `<span class="tag">${esc(m.tag)}</span>` : ''}<div class="media">${media}</div>
      <div class="body"><h3>${esc(m.nombre)}</h3><p>${esc(m.desc)}</p>
      <div class="fila"><strong class="precio">${money(m.precio)}</strong><button class="btn" data-add="${m.id}">Agregar +</button></div></div></article>`;
  }

  /* ---------- Página: inicio ---------- */
  function paginaInicio() {
    const fav = ['pizza-peperoni', 'sushi-empanizado', 'pollo-empanizado', 'tacos-pastor', 'hamb-bbq', 'churros'];
    $('#destacados').innerHTML = fav.map(id => tarjeta(porId(id))).join('');
  }

  /* ---------- Página: menú ---------- */
  function paginaMenu() {
    let cat = 'Todos', q = '';
    const cats = ['Todos', ...new Set(MENU.map(m => m.cat))];
    const chips = $('#chips'), grid = $('#grid'), cont = $('#contador');
    function pintar() {
      chips.innerHTML = cats.map(c => `<button class="chip${c === cat ? ' on' : ''}" data-cat="${esc(c)}">${CAT_EMOJI[c] || '✨'} ${esc(c)}</button>`).join('');
      const lista = MENU.filter(m => (cat === 'Todos' || m.cat === cat) && (m.nombre + ' ' + m.desc + ' ' + m.cat).toLowerCase().includes(q));
      grid.innerHTML = lista.length ? lista.map(tarjeta).join('') : '<div class="vacio panel" style="grid-column:1/-1"><div class="em">🔍</div><p>No encontramos nada con esa búsqueda. Prueba con otra palabra.</p></div>';
      cont.textContent = `${lista.length} platillo${lista.length === 1 ? '' : 's'}`;
    }
    chips.addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { cat = b.dataset.cat; pintar(); } });
    $('#buscar').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); pintar(); });
    pintar();
  }

  /* ---------- Página: órdenes ---------- */
  function estadoOrden(o) {
    const min = (Date.now() - o.fecha) / 60000;
    if (min < 1) return ['🧾', 'Recibida'];
    if (min < 8) return ['👨‍🍳', 'Preparando'];
    if (min < 20) return ['🛵', 'En camino'];
    return ['✅', 'Entregada'];
  }
  function textoWhatsApp(o) {
    const l = o.items.map(i => `• ${i.qty} x ${i.nombre} (${money(i.precio * i.qty)})`).join('\n');
    return `Hola, soy ${o.cliente}. Quiero hacer el pedido ${o.folio}:\n${l}\n\nSubtotal: ${money(o.sub)}\nEnvío: ${money(o.envio)}\nTotal: ${money(o.total)}\nPago: ${o.pago}\nDomicilio: ${o.domicilio}${o.notas ? '\nNotas: ' + o.notas : ''}`;
  }
  const urlWA = txt => `https://wa.me/${CONTACTO.wa}?text=${encodeURIComponent(txt)}`;

  function paginaOrdenes() {
    const zonaCarrito = $('#carrito'), zonaResumen = $('#resumen'), historial = $('#historial'), aviso1 = $('#confirmacion');
    $('#domicilio').value = leer('epk_form', {}).domicilio || CONTACTO.domicilioBase;
    const f0 = leer('epk_form', {});
    if (f0.cliente) $('#cliente').value = f0.cliente;
    if (f0.tel) $('#tel').value = f0.tel;

    function pintarCarrito() {
      const ls = lineas(), t = totales(ls);
      zonaCarrito.innerHTML = ls.length ? ls.map(l => `<div class="item">
          <div class="em" aria-hidden="true">${l.emoji}</div>
          <div><strong>${esc(l.nombre)}</strong><br><small>${money(l.precio)} c/u</small></div>
          <div class="qty"><button data-menos="${l.id}" aria-label="Quitar uno">−</button><strong>${l.qty}</strong><button data-mas="${l.id}" aria-label="Agregar uno">+</button></div>
        </div>`).join('')
        : `<div class="vacio"><div class="em">🛒</div><p>Tu pedido está vacío.</p><a class="btn" href="menu.html">Ver el menú</a></div>`;
      zonaResumen.innerHTML = `<div class="linea"><span>Subtotal</span><span>${money(t.sub)}</span></div>
        <div class="linea"><span>Envío</span><span>${t.sub ? (t.envio ? money(t.envio) : 'Gratis 🎉') : '—'}</span></div>
        <div class="linea total"><span>Total</span><span>${money(t.total)}</span></div>
        <p class="nota">Envío gratis en pedidos desde ${money(ENVIO_GRATIS)}.${t.sub && t.sub < ENVIO_GRATIS ? ` Te faltan ${money(ENVIO_GRATIS - t.sub)}.` : ''}</p>`;
      $('#confirmar').disabled = !ls.length;
    }
    function pintarHistorial() {
      const os = leer(K_ORD, []);
      historial.innerHTML = os.length ? os.map(o => {
        const [e, s] = estadoOrden(o);
        return `<div class="orden"><header><span>${esc(o.folio)} · ${new Date(o.fecha).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}</span><span class="estado">${e} ${s}</span></header>
          <ul>${o.items.map(i => `<li>${i.qty} × ${esc(i.nombre)}</li>`).join('')}</ul>
          <div class="fila"><span class="nota">${esc(o.domicilio)} · ${esc(o.pago)}</span><strong>${money(o.total)}</strong></div>
          <p style="margin-top:8px"><button class="btn chico claro" data-repetir="${esc(o.folio)}">Repetir pedido</button></p></div>`;
      }).join('') + `<p><button class="btn chico claro" id="borrar">Borrar historial</button></p>`
        : '<div class="vacio"><div class="em">📭</div><p>Todavía no has hecho pedidos.</p></div>';
    }

    zonaCarrito.addEventListener('click', e => {
      const m = e.target.closest('[data-mas]'), n = e.target.closest('[data-menos]');
      if (m) agregar(m.dataset.mas, 1); if (n) agregar(n.dataset.menos, -1);
      if (m || n) pintarCarrito();
    });
    historial.addEventListener('click', e => {
      const r = e.target.closest('[data-repetir]');
      if (r) {
        const o = leer(K_ORD, []).find(x => x.folio === r.dataset.repetir);
        if (o) { o.items.forEach(i => { if (porId(i.id)) agregar(i.id, i.qty); }); pintarCarrito(); aviso('Pedido copiado al carrito 🛒'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      }
      if (e.target.id === 'borrar' && confirm('¿Borrar todo el historial?')) { guardar(K_ORD, []); pintarHistorial(); }
    });

    $('#form').addEventListener('submit', e => {
      e.preventDefault();
      const ls = lineas(); if (!ls.length) return;
      const t = totales(ls);
      const o = {
        folio: 'K-' + String(Date.now()).slice(-6), fecha: Date.now(),
        cliente: $('#cliente').value.trim(), tel: $('#tel').value.trim(), domicilio: $('#domicilio').value.trim(),
        pago: $('#pago').value, notas: $('#notas').value.trim(),
        items: ls.map(l => ({ id: l.id, nombre: l.nombre, precio: l.precio, qty: l.qty })), ...t
      };
      guardar('epk_form', { cliente: o.cliente, tel: o.tel, domicilio: o.domicilio });
      guardar(K_ORD, [o, ...leer(K_ORD, [])].slice(0, 20));
      ponerCarrito({});
      $('#notas').value = '';
      aviso1.hidden = false;
      aviso1.innerHTML = `<h2>¡Pedido recibido! 🎉</h2><p>Tu folio es <strong>${esc(o.folio)}</strong>. Total a pagar: <strong>${money(o.total)}</strong> (${esc(o.pago.toLowerCase())}).</p>
        <p>Para que Kevin lo confirme más rápido, mándalo también por WhatsApp:</p>
        <a class="btn verde" target="_blank" rel="noopener" href="${urlWA(textoWhatsApp(o))}">Enviar por WhatsApp</a>`;
      pintarCarrito(); pintarHistorial(); window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    pintarCarrito(); pintarHistorial();
    setInterval(pintarHistorial, 30000);
  }

  /* ---------- Página: horarios ---------- */
  function paginaHorarios() {
    const hoy = new Date().getDay();
    const orden = [1, 2, 3, 4, 5, 6, 0];
    $('#tabla').innerHTML = orden.map(i => {
      const d = HORARIOS[i];
      return `<tr class="${i === hoy ? 'hoy' : ''}"><td>${d.dia}${i === hoy ? ' (hoy)' : ''}</td>${d.abre ? `<td>${hora(d.abre)} a ${hora(d.cierra)}</td>` : '<td class="cerrado-td">Descansamos</td>'}</tr>`;
    }).join('');
    $('#mapa').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONTACTO.direccion);
  }

  /* ---------- Página: soporte ---------- */
  function paginaSoporte() {
    $('#form-soporte').addEventListener('submit', e => {
      e.preventDefault();
      const txt = `Hola Kevin, soy ${$('#s-nombre').value.trim()}.\nAsunto: ${$('#s-asunto').value}\n\n${$('#s-msg').value.trim()}`;
      window.open(urlWA(txt), '_blank', 'noopener');
    });
  }

  /* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const p = document.body.dataset.page;
    pintarMarco(p);
    pintarEstado(); setInterval(pintarEstado, 60000);
    const mapa = { inicio: paginaInicio, menu: paginaMenu, ordenes: paginaOrdenes, horarios: paginaHorarios, soporte: paginaSoporte };
    if (mapa[p]) mapa[p]();
  });
})();
