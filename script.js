const weddingDate = new Date('2027-02-15T17:00:00-03:00').getTime();

function updateCountdown() {
  const remaining = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  for (const [unit, value] of Object.entries(values)) {
    const element = document.querySelector(`[data-unit="${unit}"]`);
    if (element) element.textContent = String(value).padStart(2, '0');
  }
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const rsvpForm = document.querySelector('[data-rsvp-form]');
rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(rsvpForm);
  const name = formData.get('nombre');
  const subject = `Confirmación de asistencia - ${name}`;
  const body = [
    `Nombre: ${name}`,
    `Asistencia: ${formData.get('asistencia')}`,
    `Alergias alimentarias: ${formData.get('alergias') || 'Ninguna indicada'}`,
    `Comentario adicional: ${formData.get('comentario') || 'Sin comentario'}`
  ].join('\n');
  window.location.href = `mailto:hola@ejemplo.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const gallerySourcePhotos = [
  { src: 'assets/novios/01.webp', width: 1350, height: 1800 },
  { src: 'assets/novios/02.webp', width: 1350, height: 1800 },
  { src: 'assets/novios/03.webp', width: 1350, height: 1800 },
  { src: 'assets/novios/04.webp', width: 1013, height: 1800 },
  { src: 'assets/novios/05.webp', width: 1350, height: 1800 },
  { src: 'assets/novios/06.webp', width: 1800, height: 1350 },
  { src: 'assets/novios/07.webp', width: 1280, height: 960 },
  { src: 'assets/novios/08.webp', width: 1600, height: 1200 },
  { src: 'assets/novios/09.webp', width: 1350, height: 1800 },
  { src: 'assets/novios/10.webp', width: 1800, height: 1350 },
  { src: 'assets/novios/11.webp', width: 1350, height: 1800 },
  { src: 'assets/novios/12.webp', width: 1350, height: 1800 }
];

const galleryScroll = document.querySelector('[data-gallery-scroll]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const stepRatio = 0.42;
const transitionStart = 0.28;
let galleryPhotos = [];
let galleryStage;
let galleryFrame = 0;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function createPhoto(photo, index) {
  const figure = document.createElement('figure');
  const orientation = photo.width / photo.height > 1.12 ? 'landscape' : 'portrait';
  figure.className = `gallery__photo gallery__photo--${orientation}`;
  figure.dataset.galleryIndex = String(index);
  figure.dataset.slot = String(index % 6);
  figure.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.alt = `Fotografía ${String(index + 1).padStart(2, '0')} de los novios`;
  image.width = photo.width;
  image.height = photo.height;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.dataset.gallerySrc = photo.src;
  figure.append(image);
  return figure;
}

function loadPhoto(photo) {
  const image = photo?.querySelector('img[data-gallery-src]');
  if (image && !image.hasAttribute('src')) {
    image.loading = 'eager';
    image.src = image.dataset.gallerySrc;
  }
}

function unloadPhoto(photo) {
  const image = photo?.querySelector('img[src][data-gallery-src]');
  if (image) image.removeAttribute('src');
}

function setPhotoState(photo, opacity, blur = 0) {
  photo.style.setProperty('--photo-opacity', opacity.toFixed(3));
  photo.style.setProperty('--photo-blur', `${blur.toFixed(1)}px`);
  photo.style.setProperty('--photo-offset', `${((1 - opacity) * 14).toFixed(1)}px`);
  photo.classList.toggle('is-active', opacity > 0.01);
  photo.setAttribute('aria-hidden', String(opacity < 0.18));
}

function easeTransition(progress) {
  const value = clamp((progress - transitionStart) / (1 - transitionStart), 0, 1);
  return value * value * (3 - 2 * value);
}

function updateGallery() {
  if (!galleryScroll || !galleryStage || !galleryPhotos.length) return;
  const bounds = galleryScroll.getBoundingClientRect();
  const stageHeight = galleryStage.offsetHeight || window.innerHeight;
  if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
    galleryPhotos.forEach((photo) => {
      unloadPhoto(photo);
      setPhotoState(photo, 0);
    });
    return;
  }

  const count = galleryPhotos.length;
  const progress = clamp(-bounds.top / (stageHeight * stepRatio), 0, count + 1);
  const currentIndex = Math.min(Math.floor(progress), count - 1);
  const firstNearby = Math.max(0, currentIndex - 5);
  const lastNearby = Math.min(count - 1, currentIndex + 1);
  for (let index = firstNearby; index <= lastNearby; index += 1) loadPhoto(galleryPhotos[index]);
  galleryPhotos.forEach((photo, index) => {
    if (index < firstNearby || index > lastNearby) unloadPhoto(photo);
  });

  if (reducedMotion.matches || progress >= count) {
    const lastVisible = progress >= count ? count - 1 : currentIndex;
    galleryPhotos.forEach((photo, index) => {
      const visible = index >= Math.max(0, lastVisible - 5) && index <= lastVisible;
      setPhotoState(photo, visible ? 1 : 0);
    });
    return;
  }

  const fraction = progress - currentIndex;
  const mix = easeTransition(fraction);
  const incomingIndex = currentIndex + 1;
  const outgoingIndex = currentIndex - 5;
  const swapOldest = currentIndex >= 5 && incomingIndex < count;
  galleryPhotos.forEach((photo, index) => {
    let opacity = 0;
    let blur = 0;
    if (index === incomingIndex && incomingIndex < count) {
      opacity = mix;
      blur = (1 - mix) * 12;
    } else if (swapOldest && index === outgoingIndex) {
      opacity = 1 - mix;
      blur = mix * 12;
    } else if (index >= (swapOldest ? currentIndex - 4 : firstNearby) && index <= currentIndex) {
      opacity = 1;
    }
    setPhotoState(photo, opacity, blur);
  });
}

function queueGalleryUpdate() {
  if (galleryFrame) return;
  galleryFrame = window.requestAnimationFrame(() => {
    galleryFrame = 0;
    updateGallery();
  });
}

function renderGallery() {
  if (!galleryScroll || !gallerySourcePhotos.length) return;
  galleryStage = document.createElement('div');
  galleryStage.className = 'gallery__stage';
  galleryStage.setAttribute('role', 'group');
  galleryStage.setAttribute('aria-label', 'Fotografías de los novios que cambian al desplazarse');

  const layer = document.createElement('div');
  layer.className = 'gallery__photo-layer';
  galleryPhotos = gallerySourcePhotos.map(createPhoto);
  galleryPhotos.forEach((photo) => layer.append(photo));
  galleryStage.append(layer);

  galleryScroll.style.height = `calc(100svh + ${(galleryPhotos.length + 1) * stepRatio * 100}svh)`;
  galleryScroll.replaceChildren(galleryStage);
  queueGalleryUpdate();
}

renderGallery();
window.addEventListener('scroll', queueGalleryUpdate, { passive: true });
window.addEventListener('resize', queueGalleryUpdate);
reducedMotion.addEventListener?.('change', queueGalleryUpdate);
