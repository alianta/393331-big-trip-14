import {RenderPosition} from '../const.js';
import Abstract from '../view/abstract.js';

/**
 * Функция для отрисовки (вставки в DOM) компонентов
 * @param {*} container - компонетен, в который необходимо вставть
 * @param {*} template -элемент, который необходимо вставить
 * @param {*} place - позицмя вставки (beforeBegin, afterBegin, beforeEnd, afterEnd)
 */
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Функция вставки элемента в указанное место разметки
 * @param {HTMLElement} container - элемент-родитель в которой необходимо вставить элемент
 * @param {HTMLElement} element  - элемент, который необходимо вставить
 * @param {string} place  - место всвки
 */
export const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 * Функция создания элемента html по заданной строке разметки
 * @param {string} template  - строка разметки
 * @returns  - элемент html
 */
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Функция замены элеиента oldCild на newCild в DOM
 * @param {object} - новый эелемнт, на который нужно заменить (DOM элемент или экземпляр класса Abstract)
 * @param {object} - текущий элемент, который нужно заменить (DOM элемент или экземпляр класса Abstract)
 */
export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};
