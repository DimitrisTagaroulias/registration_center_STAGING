"use strict";
// Supports Arrays of NodeLists AND Single Elements
function toggleCLassToNodeListArray(NodeListArray, classToToggle) {
  for (let i = 0; i < NodeListArray.length; i++) {
    const NodeList = document.querySelectorAll(NodeListArray[i]);
    for (let j = 0; j < NodeList.length; j++) {
      NodeList[j].classList.toggle(classToToggle[i]);
    }
  }
}

export { toggleCLassToNodeListArray };
