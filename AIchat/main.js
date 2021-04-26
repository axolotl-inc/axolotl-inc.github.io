//function addText(string) {
//}
function addText(string) {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode(string);

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("input");
  document.body.insertBefore(newDiv, currentDiv);
}

addText("cute");
