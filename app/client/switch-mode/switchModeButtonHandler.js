"use strict";
import { switchModeButton } from "../index.js";
import { displayElementToNodeListArray } from "../helpers/displayElementToNodeListArray.js";
import { mqHandler } from "../media-queries/setMediaQueries.js";
import { toggleCLassToNodeListArray } from "../helpers/toggleCLassToNodeListArray.js";

function switchModeButtonHandler() {
  // Single Elements - AddRemove Class
  const html = document.querySelector("html");
  const tableContainer = document.querySelector(".table-container");
  const switchModeButtonTheme = switchModeButton.querySelector("b");

  //--------------------
  //--------------------
  //--------------------

  // TOGGLE CLASS TO NODE_LIST
  toggleCLassToNodeListArray(
    [
      "#switch-mode-button",
      "html",
      "body",
      "select",
      ".database-response",
      ".weather-container",
      ".canvas",
      ".registrations",
      ".student-registration",
      ".webhook-registration",
      ".note-school",
      "button",
      "input",
      ".building",
      ".application",
      "h1",
      "h2",
      ".new-school",
      ".students-wrapper",
      ".table-container-wrapper",
      ".email-container",
      ".email-inbox",
      "#refresh-button",
      ".td-Id",
      ".td-Name",
      ".validation-error",
      ".student-list",
      ".table-header",
      ".td-Age",
    ],
    [
      "business-mode-button-style",
      "html-business",
      "body-business",
      "select-business",
      "database-response-business",
      "weather-container-business",
      "canvas-business",
      "registrations-business",
      "student-registration-business",
      "webhook-registration-business",
      "note-school-business",
      "button-business",
      "input-business",
      "building-business",
      "application-business",
      "h1-business",
      "h2-business",
      "new-school-business",
      "students-wrapper-business",
      "table-container-wrapper-business",
      "email-container-business",
      "email-inbox-business",
      "refresh-button-business",
      "td-Id-business",
      "td-Name-business",
      "validation-error-business",
      "student-list-business",
      "table-header-business",
      "td-Age-business",
    ]
  );

  if (html.classList.contains("html-business")) {
    // CHANGE BUTTON NAME
    switchModeButtonTheme.innerHTML = "School";

    // DISPLAY BLOCK
    displayElementToNodeListArray(
      [".up-outer-box", ".down-outer-box"],
      "block"
    );

    // DISPLAY NONE
    displayElementToNodeListArray([".sun", ".cloud", ".roof"], "none");
  } else {
    // CHANGE BUTTON NAME
    switchModeButtonTheme.innerHTML = "Business";

    // DISPLAY BLOCK
    displayElementToNodeListArray([".sun", ".roof"], "block");

    // DISPLAY FLEX
    displayElementToNodeListArray([".cloud"], "flex");

    // DISPLAY NONE
    displayElementToNodeListArray([".up-outer-box", ".down-outer-box"], "none");
  }

  mqHandler(); // Check Media Queries
}

export { switchModeButtonHandler };
