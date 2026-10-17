# Invitación botánica de Constanza y Jeremías

Invitación de boda mobile-first construida con HTML, CSS y JavaScript, sin dependencias ni proceso de compilación.

## Ver la invitación

Abre `index.html` en un navegador. Para publicarla en GitHub Pages, configura Pages para servir desde la raíz de la rama principal del repositorio.

## Contenido

- `index.html`: portada, datos de la celebración, itinerario, formulario RSVP y cierre.
- `styles.css`: diseño adaptable, fondos botánicos y presentación de la galería.
- `script.js`: cuenta regresiva y galería fotográfica con carga progresiva al desplazarse.
- `assets/elementos/`: adornos WebP usados por el diseño. Consulta su [README](assets/elementos/README.md).
- `assets/novios/`: fotos WebP de la invitación.
- `assets/cancion/disfruto.mp3`: música de fondo, se activa con el primer toque o desplazamiento y se controla con el botón de la esquina inferior derecha.

## Fotografías

La galería muestra 10 fotos en este orden: `01.webp` a `04.webp`, luego `12.webp`, después `05.webp` a `08.webp` y finalmente `10.webp`. La foto `11.webp` se reserva para la portada. `foto-destacada.webp` se usa en el marco del itinerario y `foto-final.webp` ocupa el fondo del cierre.

Las fotos de la galería se cargan a medida que se acerca su turno y se liberan cuando quedan lejos del área visible. Las demás imágenes de la página usan carga diferida del navegador.

## Datos que puedes cambiar

- La fecha de la boda está en `script.js` como `2027-02-15T17:00:00-03:00`.
- Los textos y datos del lugar están en `index.html`.
- El formulario RSVP prepara un correo mediante `mailto:`. Cambia `hola@ejemplo.cl` en `script.js` por la dirección real antes de compartir la invitación.
- Para sustituir fotos, conserva los nombres WebP actuales o actualiza las rutas y dimensiones correspondientes en `script.js`.
