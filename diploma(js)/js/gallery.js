// document.addEventListener("DOMContentLoaded", () => {
//   // Находим все галереи на странице
//   const allGalleries = document.querySelectorAll(".gallery");

//   allGalleries.forEach((gallery) => {
//     // Ищем элементы ТОЛЬКО внутри текущей галереи
//     const mainImage = gallery.querySelector(".main-image");
//     const thumbnails = gallery.querySelectorAll(".gallery__thumb");

//     thumbnails.forEach((thumbContainer) => {
//       thumbContainer.addEventListener("click", function () {
//         const clickedImg = this.querySelector("img");

//         const currentMainSrc = mainImage.src;
//         mainImage.src = clickedImg.src;
//         clickedImg.src = currentMainSrc;
//       });
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

  // 1. Получаем галерею, которая сейчас видна на экране
  const getActiveGallery = () =>
    document.querySelector(".gallery:not(.gallery--hidden)");

  // 2. Меняем местами картинки (главную и миниатюру) вместе с их индексами
  const swapImages = (imgA, imgB) => {
    if (!imgA || !imgB) return;

    // Меняем src (путь к картинке)
    const tempSrc = imgA.src;
    imgA.src = imgB.src;
    imgB.src = tempSrc;

    // Меняем data-индекс (порядковый номер), чтобы не потерять счет
    const tempIdx = imgA.dataset.imageIndex;
    imgA.dataset.imageIndex = imgB.dataset.imageIndex;
    imgB.dataset.imageIndex = tempIdx;
  };

  // 3. Обновляем пагинацию (текст "1 из 6")
  const updatePagination = () => {
    const gallery = getActiveGallery();
    const pagination = document.querySelector(
      ".halls__selection-image .pagination-text--main",
    );
    if (!gallery || !pagination) return;

    const mainImg = gallery.querySelector(".main-image");
    // Считаем общее количество картинок (1 главная + все миниатюры)
    const total = gallery.querySelectorAll(".gallery__thumb").length + 1;
    // Берем текущий индекс главной картинки
    const idx = Number(mainImg?.dataset.imageIndex || 0);

    // Переписываем содержимое <p>, оставляя правильные классы
    pagination.innerHTML = `<span class="pagination-text pagination-text--accent">${idx + 1}</span> из ${total}`;
  };

  // 4. Универсальная функция переключения на картинку по индексу
  const goToImage = (targetIdx) => {
    const gallery = getActiveGallery();
    if (!gallery) return;

    const mainImg = gallery.querySelector(".main-image");
    const thumbs = gallery.querySelectorAll(".gallery__thumb img");

    // Ищем миниатюру с нужным индексом
    const targetThumb = Array.from(thumbs).find(
      (t) => Number(t.dataset.imageIndex) === targetIdx,
    );

    if (targetThumb) {
      swapImages(mainImg, targetThumb);
      updatePagination();
    }
  };

  // --- ИНИЦИАЛИЗАЦИЯ ГАЛЕРЕЙ ---
  document.querySelectorAll(".gallery").forEach((gallery) => {
    const mainImg = gallery.querySelector(".main-image");
    const thumbs = gallery.querySelectorAll(".gallery__thumb img");

    // Задаем начальные индексы: главная = 0, миниатюры = 1, 2, 3...
    if (mainImg) mainImg.dataset.imageIndex = "0";
    thumbs.forEach((img, i) => {
      img.dataset.imageIndex = String(i + 1);
    });

    // Клик по миниатюре
    gallery.querySelectorAll(".gallery__thumb").forEach((thumbContainer) => {
      thumbContainer.addEventListener("click", function () {
        const clickedImg = this.querySelector("img");
        if (!clickedImg || !mainImg) return;

        swapImages(mainImg, clickedImg);
        updatePagination();
      });
    });
  });

  // Инициализируем пагинацию при первой загрузке страницы
  updatePagination();

  // --- ОБРАБОТКА КНОПОК "ВПЕРЁД" И "НАЗАД" ---
  const prevBtn = document.querySelector(".halls__slider-button.prev");
  const nextBtn = document.querySelector(".halls__slider-button.next");

  // Кнопка "Назад"
  prevBtn?.addEventListener("click", (event) => {
    event.preventDefault(); // Убираем "прыжок" страницы из-за тега <a href="#">

    const gallery = getActiveGallery();
    if (!gallery) return;

    const mainImg = gallery.querySelector(".main-image");
    const total = gallery.querySelectorAll(".gallery__thumb").length + 1;
    const current = Number(mainImg.dataset.imageIndex);

    // Формула для бесконечного переключения влево
    const target = (current - 1 + total) % total;
    goToImage(target);
  });

  // Кнопка "Вперёд"
  nextBtn?.addEventListener("click", (event) => {
    event.preventDefault();

    const gallery = getActiveGallery();
    if (!gallery) return;

    const mainImg = gallery.querySelector(".main-image");
    const total = gallery.querySelectorAll(".gallery__thumb").length + 1;
    const current = Number(mainImg.dataset.imageIndex);

    // Формула для бесконечного переключения вправо
    const target = (current + 1) % total;
    goToImage(target);
  });

  // --- ОБНОВЛЕНИЕ ПАГИНАЦИИ ПРИ СМЕНЕ ЗАЛА ---
  // Когда вы нажимаете на Hall №2, галерея меняется. Нужно обновить пагинацию под нее.
  document.querySelectorAll(".halls__choice-link").forEach((link) => {
    link.addEventListener("click", () => {
      // Небольшая задержка, чтобы halls.js успел показать новую галерею
      setTimeout(updatePagination, 10);
    });
  });
});
