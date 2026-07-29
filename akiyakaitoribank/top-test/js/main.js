document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".site-header__menu-button");
  const nav = document.querySelector(".site-header__nav");

  if (!menuButton || !nav) {
    return;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");

    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
    });
  });
});