let initOptionsSetup = () => {
  // const dropdown = document.querySelector(".dropdown");
  const select = document.querySelector(".city-select");
  const caret = document.querySelector(".city-caret");
  const menu = document.querySelector(".city-menu");
  const options = document.querySelectorAll(".city-menu li");
  const selected = document.querySelector(".city-selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });

  const siteSelect = document.querySelector(".site-select");
  const siteCaret = document.querySelector(".site-caret");
  const siteMenu = document.querySelector(".site-menu");

  siteSelect.addEventListener("click", () => {
    siteSelect.classList.toggle("select-clicked");
    siteCaret.classList.toggle("caret-rotate");
    siteMenu.classList.toggle("menu-open");
  });
};

let setupSiteOptions = () => {
  const siteSelect = document.querySelector(".site-select");
  const siteCaret = document.querySelector(".site-caret");
  const siteMenu = document.querySelector(".site-menu");
  const siteOptions = document.querySelectorAll(".site-menu li");
  const siteSelected = document.querySelector(".site-selected");

  siteOptions.forEach((option) => {
    option.addEventListener("click", () => {
      siteSelected.innerText = option.innerText;
      siteSelect.classList.remove("select-clicked");
      siteCaret.classList.remove("caret-rotate");
      siteMenu.classList.remove("menu-open");
      siteOptions.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
};

let updateBackgroundImage = (airQuality) => {
  const main = document.querySelector(".main");
  if (airQuality >= 0 && airQuality <= 50) {
    setTimeout(() => {
      main.style.backgroundImage = 'url("/static/images/fresh.jpg")';
    }, 200);
  } else if (airQuality > 50 && airQuality <= 100) {
    setTimeout(() => {
      main.style.backgroundImage = 'url("/static/images/ok.jpg")';
  }, 200);
  } else if (airQuality > 100 && airQuality <= 150) {
    setTimeout(() => {
      main.style.backgroundImage = 'url("/static/images/notOK.jpg")';
  }, 200);
  } else {
    setTimeout(() => {
      main.style.backgroundImage = 'url("/static/images/pollution.jpg")';
  }, 200);
  }
};
