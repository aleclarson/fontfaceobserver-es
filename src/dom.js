export function addListener(element, event, listener) {
  element.addEventListener(event, listener);
}

export function append(parent, child) {
  parent.appendChild(child);
}

export function createElement(tagName) {
  return document.createElement(tagName);
}

export function createText(text) {
  return document.createTextNode(text);
}

export function remove(element) {
  element.parentNode && element.parentNode.removeChild(element);
}

export function style(element, style) {
  element.style.cssText = style;
}

// This can be stubbed as long as you place your <script> tag at the end of the
// <body> element, so that the DOM is already loaded when the script runs.
export function waitForBody(callback) {
  return callback();
}
