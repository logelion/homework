document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".gallery__thumb");

  thumbnails.forEach((thumbContainer) => {
    thumbContainer.addEventListener("click", function () {
      // Находим картинку внутри контейнера, по которому кликнули
      const clickedImg = this.querySelector("img");

      // Меняем местами src
      const currentMainSrc = mainImage.src;
      mainImage.src = clickedImg.src;
      clickedImg.src = currentMainSrc;
    });
  });
});
