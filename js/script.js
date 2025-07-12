document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.getElementById("burgerButton");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuContainer = document.getElementById("menuContainer");
  const contentContainer = document.querySelector(".container"); 

  const mainMenuLis = document.querySelectorAll(
    ".menu__main .menu__list .menu__item"
  );


  const allSubMenuContainers = document.querySelectorAll(
    ".sub-menu, .nested-sub-menu"
  );

  function setMenuLeftOffset() {
    if (contentContainer) {
      const containerOffsetLeft = contentContainer.offsetLeft;
      menuContainer.style.marginLeft = `${containerOffsetLeft + 115}px`;
    } else {
      menuContainer.style.marginLeft = "20px"; 
    }
  }

  setMenuLeftOffset();
  window.addEventListener("resize", setMenuLeftOffset);

  burgerButton.addEventListener("click", () => {
    menuOverlay.classList.toggle("menu--active");

    if (!menuOverlay.classList.contains("menu--active")) {
      allSubMenuContainers.forEach((sm) => {
        sm.classList.remove("sub-menu--active"); 
        sm.classList.remove("nested-sub-menu--active"); 
      });
      mainMenuLis.forEach((li) => li.classList.remove("menu__item--active"));
    }
  });

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
      menuOverlay.classList.remove("menu--active");
      allSubMenuContainers.forEach((sm) => {
        sm.classList.remove("sub-menu--active");
        sm.classList.remove("nested-sub-menu--active");
      });
      mainMenuLis.forEach((li) => li.classList.remove("menu__item--active"));
    }
  });



  mainMenuLis.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      allSubMenuContainers.forEach((sm) => {
        sm.classList.remove("sub-menu--active");
        sm.classList.remove("nested-sub-menu--active");
      });

      mainMenuLis.forEach((li) => li.classList.remove("menu__item--active"));
      item.classList.add("menu__item--active"); 

      const targetId = item.dataset.target;
      if (targetId) {
        const targetSubMenu = document.getElementById(targetId);
        if (targetSubMenu) {
          if (targetSubMenu.classList.contains("sub-menu")) {
            targetSubMenu.classList.add("sub-menu--active");
          } else if (targetSubMenu.classList.contains("nested-sub-menu")) {
            targetSubMenu.classList.add("nested-sub-menu--active");
          }
        }
      }
    });
  });

  const subMenuNavigatingItems = document.querySelectorAll(
    ".sub-menu .sub-menu__list .sub-menu__item[data-target]"
  );

  subMenuNavigatingItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      document.querySelectorAll(".nested-sub-menu").forEach((sm) => {
        sm.classList.remove("nested-sub-menu--active");
      });

      const targetId = item.dataset.target;
      if (targetId) {
        const targetSubMenu = document.getElementById(targetId);
        if (
          targetSubMenu &&
          targetSubMenu.classList.contains("nested-sub-menu")
        ) {
          targetSubMenu.classList.add("nested-sub-menu--active");
        }
      }
    });
  });

  menuContainer.addEventListener("mouseleave", () => {
    allSubMenuContainers.forEach((sm) => {
      sm.classList.remove("sub-menu--active");
      sm.classList.remove("nested-sub-menu--active");
    });
    mainMenuLis.forEach((li) => li.classList.remove("menu__item--active"));
  });
});

// ////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const headerInfo = document.querySelector(".header-info");
  let headerHeight; 
  let headerInfoHeight; 

  const setHeaderHeights = () => {
    headerHeight = header.offsetHeight;
    if (headerInfo) {
      headerInfoHeight = headerInfo.offsetHeight;
    } else {
      headerInfoHeight = 0; 
    }
    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`
    );
  };

  setHeaderHeights();

  window.addEventListener("resize", setHeaderHeights);

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > headerInfoHeight) {
      if (!header.classList.contains("fixed")) {
        header.classList.add("fixed");
        document.body.classList.add("header-fixed-padding");
      }
    } else {
      if (header.classList.contains("fixed")) {
        header.classList.remove("fixed");
        document.body.classList.remove("header-fixed-padding");
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
});

// ///////////////////////////////////////////////////////////////////////////////////////

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const menuOverlay = document.getElementById("menuOverlay");
const allPopups = document.querySelectorAll(".mobile-menu__popup");

let isMenuOpen = false;
let activePopups = [];

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.add("mobile-menu--active");
    menuIcon.classList.add("menu-btn__icon--active");
    menuOverlay.classList.add("mobile-menu__overlay--active");
    document.body.style.overflow = "hidden";
  } else {
    closeMenu();
  }
}

function closeMenu() {
  isMenuOpen = false;
  mobileMenu.classList.remove("mobile-menu--active");
  menuIcon.classList.remove("menu-btn__icon--active");
  menuOverlay.classList.remove("mobile-menu__overlay--active");
  document.body.style.overflow = "";

  allPopups.forEach((popup) => {
    popup.classList.remove("mobile-menu__popup--active");
  });
  activePopups = [];
}

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add("mobile-menu__popup--active");
    activePopups.push(popupId);
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove("mobile-menu__popup--active");
    activePopups = activePopups.filter((id) => id !== popupId);
  }
}

menuBtn.addEventListener("click", toggleMenu);

menuOverlay.addEventListener("click", closeMenu);

document.querySelectorAll("[data-popup]").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const popupId = this.getAttribute("data-popup");
    openPopup(popupId);
  });
});

document.querySelectorAll(".mobile-menu__back").forEach((backBtn) => {
  backBtn.addEventListener("click", function () {
    const currentPopup = this.closest(".mobile-menu__popup");
    const backTarget = this.getAttribute("data-back");

    if (currentPopup) {
      currentPopup.classList.remove("mobile-menu__popup--active");

      if (backTarget === "main") {
        activePopups = [];
      } else {
        const backPopup = document.getElementById(backTarget);
        if (backPopup) {
          backPopup.classList.add("mobile-menu__popup--active");
        }
      }
    }
  });
});

document.querySelectorAll(".mobile-menu__link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && isMenuOpen) {
    closeMenu();
  }
});