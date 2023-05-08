import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const imagesMarkup = createImageMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createImageMarkup(images) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  // window.addEventListener("keydown", closeBtnEsc);

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const originalImage = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", closeBtnEsc);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", closeBtnEsc);
      },
    }
  );
  originalImage.show();

  function closeBtnEsc(event) {
    if (event.code === "Escape") {
      originalImage.close();
    }
  }
}
