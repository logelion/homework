document.addEventListener("DOMContentLoaded", () => {
  const goUpButton = document.getElementById("goUpButton");

  if (!goUpButton) return;

  window.addEventListener("scroll", () => {
    // Текущая позиция скролла
    const scrollPosition = window.scrollY;

    // Высота всего документа минус высота экрана (чтобы узнать реальную длину скролла)
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Если прокрутили больше половины страницы
    if (scrollPosition > totalHeight / 2) {
      goUpButton.classList.add("is-visible");
    } else {
      goUpButton.classList.remove("is-visible");
    }
  });
});
