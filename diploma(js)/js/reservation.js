export const initReservationSlider = () => {
  const slider = document.querySelector(".reservation__slider");
  const prevBtn = document.querySelector(".reservation__prev");
  const nextBtn = document.querySelector(".reservation__next");
  const items = document.querySelectorAll(".reservation__item");
  const paginationNumber = document.querySelector(
    ".reservation .pagination-text--accent",
  );

  if (
    !slider ||
    !prevBtn ||
    !nextBtn ||
    items.length === 0 ||
    !paginationNumber
  )
    return;

  // Переменная для хранения текущего индекса
  let currentIndex = 0;

  // Функция обновления визуального состояния
  const updateActiveState = (index) => {
    // 1. Обновляем цифру в пагинации
    paginationNumber.textContent = index + 1;

    // 2. Перебираем все карточки и меняем им классы
    items.forEach((item, i) => {
      const imgWrapper = item.querySelector(".reservation__item-img-wrapper");
      const content = item.querySelector(".reservation__item-content");

      if (i === index) {
        // Активная карточка
        imgWrapper?.classList.add("reservation__item-img-wrapper--active");
        imgWrapper?.classList.remove("reservation__item-img-wrapper--disabled");

        content?.classList.add("reservation__item-content--active");
        content?.classList.remove("reservation__item-content--disable");
      } else {
        // Неактивная карточка
        imgWrapper?.classList.add("reservation__item-img-wrapper--disabled");
        imgWrapper?.classList.remove("reservation__item-img-wrapper--active");

        content?.classList.add("reservation__item-content--disable");
        content?.classList.remove("reservation__item-content--active");
      }
    });
  };

  // Клик по кнопке "Вперед"
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Проверяем, не дошли ли мы до конца
    if (currentIndex < items.length - 1) {
      currentIndex++;
      // Прокручиваем слайдер к левому краю нужной карточки
      slider.scrollTo({
        left: items[currentIndex].offsetLeft,
        behavior: "smooth",
      });
      updateActiveState(currentIndex);
    }
  });

  // Клик по кнопке "Назад"
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Проверяем, не дошли ли мы до начала
    if (currentIndex > 0) {
      currentIndex--;
      slider.scrollTo({
        left: items[currentIndex].offsetLeft,
        behavior: "smooth",
      });
      updateActiveState(currentIndex);
    }
  });

  // Обработчик ручного скролла (свайпа пальцем или колесиком мыши)
  let scrollTimeout;
  slider.addEventListener("scroll", () => {
    // Используем таймаут, чтобы не вызывать функцию на каждый пиксель скролла
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = slider.scrollLeft;
      let closestIndex = 0;
      let minDistance = Infinity;

      // Ищем карточку, которая находится ближе всего к левому краю
      items.forEach((item, i) => {
        const distance = Math.abs(item.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      // Если индекс изменился — обновляем состояние
      if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        updateActiveState(currentIndex);
      }
    }, 100); // Ждем 100мс после окончания скролла
  });

  // Инициализация при первой загрузке страницы (делаем первую карточку активной)
  setTimeout(() => updateActiveState(0), 50);
};
