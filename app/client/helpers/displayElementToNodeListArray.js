"use strict";

function displayElementToNodeListArray(NodeListArray, displayAs) {
  for (let i = 0; i < NodeListArray.length; i++) {
    const NodeList = document.querySelectorAll(NodeListArray[i]);
    for (let j = 0; j < NodeList.length; j++) {
      NodeList[j].style.display = displayAs;
    }
  }
}

export { displayElementToNodeListArray };
