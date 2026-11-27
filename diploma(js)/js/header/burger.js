export default class BurgerMenu {
  constructor(config, headerFixedInstance = null) {
    this.config = config;
    this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
    this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
    this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
    this.headerFixedInstance = headerFixedInstance;
    this.main = document.querySelector(`.${this.config.MAIN}`);

    this.logoWrapper = document.querySelector(".header__logo-wrapper");
    this.selectWrapper = document.querySelector(".header__select-wrapper");

    if (!this.burgerButton || !this.burgerMenu || !this.body) {
      throw new Error("Required DOM elements are missing.");
    }

    this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;

    this.onBurgerClick = this.onBurgerClick.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.onKeyDown = (event) => {
      if (event.key === "Escape" && this.isBurgerMenuOpen()) {
        this.hideBurgerMenu();
        this.burgerButton.focus();
      }
    };
    document.addEventListener("keydown", this.onKeyDown);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.burgerMenu.addEventListener("dragstart", (event) =>
      event.preventDefault(),
    );
    this.burgerMenu.addEventListener(
      "click",
      (event) => {
        if (Date.now() < this.suppressClickUntil) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true,
    );
    this.manageEvents();
    window.addEventListener("resize", this.onWindowResize);
  }

  manageEvents() {
    if (this.isMobileView) {
      this.initEvents();
    } else {
      this.removeEvents();
      this.hideBurgerMenu();
    }
  }

  initEvents() {
    // Click events
    this.burgerButton.addEventListener("click", this.onBurgerClick);
    this.body.addEventListener("click", this.onBodyClick);

    // Touch events
    this.burgerMenu.addEventListener("pointerdown", this.handleTouchStart);
    window.addEventListener("pointermove", this.handleTouchMove);
    window.addEventListener("pointerup", this.handleTouchEnd);
    window.addEventListener("pointercancel", this.handleTouchEnd);
  }

  removeEvents() {
    // Click events
    this.burgerButton.removeEventListener("click", this.onBurgerClick);
    this.body.removeEventListener("click", this.onBodyClick);

    // Touch events
    this.burgerMenu.removeEventListener("pointerdown", this.handleTouchStart);
    window.removeEventListener("pointermove", this.handleTouchMove);
    window.removeEventListener("pointerup", this.handleTouchEnd);
    window.removeEventListener("pointercancel", this.handleTouchEnd);
  }

  onWindowResize() {
    const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;

    if (this.isMobileView !== isNowMobileView) {
      this.isMobileView = isNowMobileView;
      this.manageEvents();
    }
  }

  // Click events
  onBurgerClick() {
    const isOpen = this.burgerButton.classList.toggle(this.config.BURGER_OPEN);
    this.burgerButton.ariaLabel = isOpen
      ? this.config.lABEL.CLOSE
      : this.config.lABEL.OPEN;
    this.burgerButton.ariaExpanded = isOpen;
    this.burgerMenu.classList.toggle(this.config.HEADER_MENU_OPEN, isOpen);
    this.body.classList.toggle(this.config.PAGE_BODY_NO_SCROLL, isOpen);

    if (isOpen) {
      this.moveElementsToMenu();
    } else {
      this.moveElementsBack();
    }

    if (this.main) {
      this.main.style.pointerEvents = isOpen ? "none" : "";
    }

    if (this.headerFixedInstance) {
      if (isOpen) {
        this.headerFixedInstance.removeFixedClass();
      } else {
        this.headerFixedInstance.updateFixedClass();
      }
    }
  }

  moveElementsToMenu() {
    const list = this.burgerMenu.querySelector(".menu__list");
    if (this.logoWrapper && !this.burgerMenu.contains(this.logoWrapper)) {
      this.burgerMenu.insertBefore(this.logoWrapper, list);
    }
    if (this.selectWrapper && !this.burgerMenu.contains(this.selectWrapper)) {
      this.burgerMenu.insertBefore(this.selectWrapper, list);
    }
  }

  moveElementsBack() {
    const container = document.querySelector(".header__container");
    if (this.logoWrapper && this.burgerMenu.contains(this.logoWrapper)) {
      container.insertBefore(this.logoWrapper, this.burgerMenu);
    }
    if (this.selectWrapper && this.burgerMenu.contains(this.selectWrapper)) {
      container.insertBefore(this.selectWrapper, this.burgerMenu);
    }
  }

  hideBurgerMenu() {
    const wasOpen = this.isBurgerMenuOpen();
    this.swipe = null;
    this.burgerMenu.style.transform = "";
    this.burgerButton.classList.remove(this.config.BURGER_OPEN);
    this.burgerButton.ariaLabel = this.config.lABEL.OPEN;
    this.burgerButton.ariaExpanded = false;
    this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
    this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);

    if (this.main) {
      this.main.style.pointerEvents = "";
    }

    this.moveElementsBack();

    if (wasOpen && this.headerFixedInstance) {
      this.headerFixedInstance.updateFixedClass();
    }
  }

  isBurgerMenuOpen() {
    return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
  }

  onBodyClick(event) {
    const target = event.target;
    const isLinkInMenu = Boolean(
      target.closest(`.${this.config.HEADER_MENU} a`),
    );
    const isMenuOpen = this.isBurgerMenuOpen();
    const isClickOutsideMenu =
      !target.closest(`.${this.config.HEADER_MENU}`) &&
      !target.closest(`.${this.config.BURGER}`);

    if (
      (isLinkInMenu && window.innerWidth <= this.config.BREAKPOINT) ||
      (isMenuOpen && isClickOutsideMenu)
    ) {
      this.hideBurgerMenu();
    }
  }

  handleTouchStart(event) {
    if (
      !this.isBurgerMenuOpen() ||
      event.isPrimary === false ||
      (event.pointerType === "mouse" && event.button !== 0)
    )
      return;
    this.swipe = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      dx: 0,
    };
  }

  handleTouchMove(event) {
    const swipe = this.swipe;
    if (!swipe || swipe.id !== event.pointerId) return;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    if (!swipe.dragging && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
      this.swipe = null;
      return;
    }
    if (dx > 10 && dx > Math.abs(dy) * 1.2) {
      swipe.dragging = true;
      this.burgerMenu.setPointerCapture(event.pointerId);
    }
    if (swipe.dragging) {
      this.suppressClickUntil = Date.now() + 500;
      swipe.dx = Math.max(0, dx);
      this.burgerMenu.style.transform = `translateX(${swipe.dx}px)`;
    }
  }

  handleTouchEnd(event) {
    const swipe = this.swipe;
    if (!swipe || swipe.id !== event.pointerId) return;
    this.swipe = null;
    this.burgerMenu.style.transform = "";
    if (this.burgerMenu.hasPointerCapture(event.pointerId)) {
      this.burgerMenu.releasePointerCapture(event.pointerId);
    }
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    if (event.type !== "pointercancel" && dx >= 40 && dx > Math.abs(dy) * 1.2) {
      this.suppressClickUntil = Date.now() + 500;
      this.hideBurgerMenu();
    }
  }
}
