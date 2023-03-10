"use strict";

const screen = {
  small: null,
  medium: window.matchMedia("only screen and (min-width: 800px)"),
  large: window.matchMedia("(min-width: 1320px)"),
};

function mqHandler() {
  const HTML = document.querySelector("HTML");
  const buildingsContainer = document.querySelector(".buildings-container");
  const modalInfo = document.querySelector(".modal-info");

  let size = null;
  for (let [scr, mq] of Object.entries(screen)) {
    if (!mq || mq.matches) size = scr;
  }

  if (HTML.classList.contains("html-business") && size !== "large") {
    buildingsContainer.classList.add("buildings-container-mqMedium");
  } else {
    buildingsContainer.classList.remove("buildings-container-mqMedium");
  }

  if (size === "small") {
    modalInfo.classList.add("modal-info-mqSmall");
  } else {
    modalInfo.classList.remove("modal-info-mqSmall");
  }
}

function setMediaQueries() {
  // mqMedium.addEventListener("change", mqHandler);
  for (let [scr, mq] of Object.entries(screen)) {
    if (mq) mq.addEventListener("change", mqHandler);
  }
}

export { setMediaQueries, mqHandler };
