export const sizes = () => {
  const sizesList = document.querySelector('[data-sizes="list"]');
  const sizesButtons = document.querySelectorAll('[data-sizes="button"]');

  const handleSizeClick = (event) => {
    const target = event.target;

    if (!target?.classList.contains("halls__choice-link")) return;

    sizesButtons.forEach((button) =>
      button.classList.remove("halls__choice-link--active"),
    );
    target.classList.add("halls__choice-link--active");
  };

  sizesList.addEventListener("click", handleSizeClick);
};
