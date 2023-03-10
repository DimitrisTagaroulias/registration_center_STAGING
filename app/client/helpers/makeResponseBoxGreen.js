class colorResponse {
  constructor() {
    this.responseTimer = null;
  }

  makeResponseBoxGreen(responseBox) {
    responseBox.classList.add("outlineResponse");

    if (this.responseTimer != null) {
      window.clearTimeout(this.responseTimer);
      this.responseTimer = null;
    }
    this.responseTimer = window.setTimeout(() => {
      responseBox.classList.remove("outlineResponse");
    }, 3000);
  }
}

export { colorResponse };
