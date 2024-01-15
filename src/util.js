export const createDOMElement = (tagName, props = {}) => Object.assign(
    document.createElement(tagName),
    props
);

export const appendChildren = (element, children = []) => element.append(...children) || element;

export const createElement = (tagName, props = {}, ...children) => appendChildren(
    createDOMElement(tagName, props),
    children
);

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));