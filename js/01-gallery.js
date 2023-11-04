import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
gallery.addEventListener("click", handleClick);

function createMarkup(arr) {
  return arr.map(({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
  )
  .join("");
}

function handleClick(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  const instance = basicLightbox.create(`
  <div class="modal">  
    <img src="${event.target.dataset.source}" >
  </div>
  `, {
    onShow: () => window.addEventListener('keydown', onPress),
    onClose: () => window.removeEventListener('keydown', onPress)
  });

  function onPress(e) {
    if (e.key === 'Escape') {
      instance.close();
    }
  }

  instance.show()
}