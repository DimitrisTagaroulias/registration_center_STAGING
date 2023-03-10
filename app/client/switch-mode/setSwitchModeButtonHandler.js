"use strict";
import { switchModeButtonCloudContainer } from "../index.js";
import { switchModeButtonHandler } from "./switchModeButtonHandler.js";

// SWITCH MODE BUTTON HANDLING
function setSwitchModeButtonHandler() {
  if (
    switchModeButtonCloudContainer.getAttribute("switchButtonHandler") ===
    "false"
  ) {
    switchModeButtonCloudContainer.addEventListener(
      "click",
      switchModeButtonHandler
    );
  }
  switchModeButtonCloudContainer.setAttribute("switchButtonHandler", "true");
}

export { setSwitchModeButtonHandler };
