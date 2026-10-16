# Invitación botánica · base

Plantilla web vertical inspirada en el diseño que compartiste. Abre `index.html` en un navegador. Los nombres, fecha, dirección, horarios, correo de confirmación y textos aún son datos de referencia; se pueden reemplazar cuando estén confirmados.

## Imágenes integradas

- `assets/novios/01.webp` a `assets/novios/12.webp`: las doce fotos, mostradas en ese orden en una galería que permanece fija durante el desplazamiento. Cada imagen nueva se funde con las anteriores; al llegar a seis fotos visibles, la más antigua se desvanece mientras aparece la siguiente.
- `assets/novios/foto-destacada.webp`: foto para el marco destacado después del itinerario.
- Las imágenes originales HEIC/HEIF y JPG siguen guardadas en `assets/novios/`. Las versiones WebP se usan en la página para que carguen en navegadores comunes y ocupen menos espacio.
- `assets/elementos/`: los PNG nuevos de alta calidad y sus copias WebP optimizadas ya están integrados en portada, cuenta regresiva, itinerario, marco destacado, dress code, regalos y RSVP. Consulta `assets/elementos/LEEME.md` para ver el mapa de originales y copias.
- El itinerario ahora alterna cinco momentos a ambos lados de una línea central, con los iconos y adornos nuevos.

Para agregar más fotos, súbelas a `assets/novios/` con números consecutivos (`img13`, `img14`, etc.) y dime cuáles quieres incluir. Si están en HEIC/HEIF, preparo también versiones web compatibles.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño botánico, versión móvil y composición de las fotografías.
- `script.js`: cuenta regresiva y secuencia de imágenes controlada por el desplazamiento.

La fecha actual de ejemplo está en `script.js` como `2027-02-15T17:00:00-03:00`. Las referencias del evento y confirmación también son datos de muestra.
