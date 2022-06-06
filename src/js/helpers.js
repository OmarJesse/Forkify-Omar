const wait = function (s) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), s * 1000);
  });
};

const addClass = (element, elementCl) => element.classList.add(elementCl);

const removeClass = (element, elementCl) => element.classList.remove(elementCl);

const toggleClass = (element, elementCl) => element.classList.toggle(elementCl);

const showElement = (...elements) => elements.forEach((e) => removeClass(e, "hidden"));

const hideElement = (...elements) => elements.forEach((e) => addClass(e, "hidden"));

const closestElement = (e, elementCl) => e.target.closest(elementCl);

const checkContain = (element, elementCl) => element.classList.contains(elementCl);

export default helpers = {
  wait,
  addClass,
  removeClass,
  toggleClass,
  showElement,
  hideElement,
  closestElement,
  checkContain,
};
