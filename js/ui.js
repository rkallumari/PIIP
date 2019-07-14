
/*
  Function to create button
  Constructs <button> content </button>
  Parameters:
  content : Content to be displayed in the button
  Example:
  createButton('click here')
  creates : <button>click here</button>
*/
function createButton(content) {
  var element = document.createElement("BUTTON");
  if(content != undefined) {
    var text = document.createTextNode(content);
    element.appendChild(text);
  }
  return element;
}

/*
  Constructs image <img alt="given content" src=" given image url">
  Parameters:
  content : Content to be displayed as the alternate text for imageUrl
  imageUrl : URL to fetch the image from
  Example:
  createImage('Image Not Found','images/teddy.svg')
  Creates : <img alt='Image Not Found' src="images/teddy.svg">
*/
function createImage(content, imageUrl) {
  var element = document.createElement("IMG");
  element.setAttribute("alt",content);
  element.setAttribute("src",imageUrl);
  return element;
}

/*
  Constructs heading 1 <h1> content </h1>
  Parameters:
  content : Content to be displayed in the heading 1
  Example:
  createHeading1('PIIP')
  Creates: <h1>PIIP</h1>
*/
function createHeading1(content) {
  var element = document.createElement("H1");
  if(content != undefined) {
    var text = document.createTextNode(content);
    element.appendChild(text);
  }
  return element;
}

/*
  Constructs div <div> content </div>
  Parameters:
  content : Content to be displayed in the div
  Example:
  createDiv("div created")
  creates: <div>div created</div>
*/
function createDiv(content) {
  var element = document.createElement("DIV");
  if(content != undefined) {
    var text = document.createTextNode(content);
    element.appendChild(text);
  }
  return element;
}

/*
  createLabel(content) : creates a label element
  Parameter:
  content: The content to be dispalyed in the label
  Example:
  createLabel('Answer') returns <label>Answer</label>
*/
function createLabel(content) {
  var element = document.createElement("label");
  var textNode = document.createTextNode(content);
  element.appendChild(textNode);
  return element;
}

/*
 createBreakLine() : creates a break line element
 returns a break element
 Example : returns <br>
*/
function createBreakLine(){
  return document.createElement('br');
}

/*
  Constructs text input <input type="text">
  returns text input element
*/
function createTextInput() {
  var element = document.createElement("INPUT");
  element.setAttribute("type","text");
  return element;
}

/*
  Constructs span element <span>content</span>
  retuns the span element
  Parameters:
  content: content to be displayed in the span
  Example:
  createSpan('game')
  creates <span>game</span>
*/
function createSpan(content) {
  var element = document.createElement("SPAN");
  if(content != undefined) {
    var text = document.createTextNode(content);
    element.appendChild(text);
  }
  return element;
}

/*
  Constructs hyperlink
  Parameters:
  link: The event handler for onclick event on the hyperlink.
  content: Content to be displayed for hyperlink.
  Example:
  createHyperLink('loadGamePage()', 'game page')
  creates <a onclick="loadGamePage()">game page</a>
*/
function createHyperLink(link,content) {
  var hyperLink = document.createElement('a');
  hyperLink.setAttribute('onclick',link);
  hyperLink.innerHTML = content;
  return hyperLink;
}
