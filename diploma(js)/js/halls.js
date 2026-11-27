export const sizes = () => {
  const sizesList = document.querySelector('[data-sizes="list"]');
  const sizesButtons = document.querySelectorAll('[data-sizes="button"]');
  const galleries = document.querySelectorAll(".gallery");

  // Элементы, в которые мы будем выводить текст
  const linkNumber = document.querySelector(".data__link--number");
  const linkArea = document.querySelector(".data__link--area");
  const linkPeople = document.querySelector(".data__link--people");

  // База данных с информацией о залах
  const hallsData = {
    1: { number: "№ 1", area: "40 м²", people: "до 20-ти человек" },
    2: { number: "№ 2", area: "60 м²", people: "до 30-ти человек" },
    3: { number: "№ 3", area: "30 м²", people: "до 15-ти человек" },
    4: { number: "№ 4", area: "80 м²", people: "до 50-ти человек" },
  };

  const handleSizeClick = (event) => {
    // Ищем кнопку, по которой кликнули (на случай клика по внутренним элементам)
    const targetButton = event.target.closest(".halls__choice-link");
    if (!targetButton) return;

    // 1. Переключаем активный класс у кнопок
    sizesButtons.forEach((button) =>
      button.classList.remove("halls__choice-link--active"),
    );
    targetButton.classList.add("halls__choice-link--active");

    // 2. Получаем ID выбранного зала из data-атрибута
    const hallId = targetButton.dataset.hall;
    const currentData = hallsData[hallId];

    // 3. ОБНОВЛЯЕМ ТЕКСТ И ЗАПУСКАЕМ АНИМАЦИЮ
    const updateText = (element, text) => {
      element.innerHTML = text; // Вставляем новый текст

      // Удаляем класс анимации, чтобы можно было запустить её заново
      element.classList.remove("animate-text");

      // "Хитрость" для перезапуска анимации: заставляем браузер пересчитать стили
      void element.offsetWidth;

      // Добавляем класс анимации обратно
      element.classList.add("animate-text");
    };

    updateText(linkNumber, currentData.number);
    // Для площади оставляем тег span для "м²"
    updateText(linkArea, currentData.area.replace("м²", "<span>м²</span>"));
    updateText(linkPeople, currentData.people);

    // 4. ПЕРЕКЛЮЧАЕМ ГАЛЕРЕИ
    galleries.forEach((gallery) => {
      if (gallery.dataset.gallery === hallId) {
        gallery.classList.remove("gallery--hidden"); // Показываем нужную
      } else {
        gallery.classList.add("gallery--hidden"); // Скрываем остальные
      }
    });
  };

  sizesList.addEventListener("click", handleSizeClick);
};
