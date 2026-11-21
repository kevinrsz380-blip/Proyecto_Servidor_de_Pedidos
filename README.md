# El Puesto de Kevin — Servidor de pedidos para puesto de comida

Página web estática (HTML, CSS y JavaScript) para tomar pedidos de comida a domicilio.
No necesita base de datos ni servidor: el carrito y el historial se guardan en el navegador (`localStorage`).

## Páginas
| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: botones principales, favoritos y ubicación |
| `menu.html` | Menú con filtros por categoría y buscador |
| `ordenes.html` | Pedido actual, domicilio, pago e historial de órdenes |
| `horarios.html` | Horarios, estado abierto/cerrado y zona de entrega |
| `soporte.html` | Contacto, preguntas frecuentes y formulario |
| `estilos.css` | Estilos compartidos |
| `app.js` | Menú, carrito, pedidos y lógica de todas las páginas |
| `img/` | Fotos de pizza, sushi y pollo |

## Publicar en GitHub Pages
1. Crea un repositorio público llamado `pedidos-digital` y sube todos estos archivos a la raíz.
2. En **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. Espera un par de minutos: la página queda en `https://TU-USUARIO.github.io/pedidos-digital/`.

## Datos ficticios
El contacto (Kevin Roblero Sánchez), el teléfono, el correo, el Instagram y los horarios son inventados para el proyecto escolar.
Para cambiarlos, edita el objeto `CONTACTO` y la lista `HORARIOS` al inicio de `app.js`.

## Equipo
Roblero Sánchez Kevin · Pérez Rivera Kevin Salvador · Pérez Torres Ángel Giovanni
