"usestrict";
// SET INNER HTML to many elements at the same time
function setInnerHtml(Array_Of_Elements, content) {
  Array_Of_Elements.forEach((element) => {
    element.innerHTML = content;
  });
}
export { setInnerHtml };
