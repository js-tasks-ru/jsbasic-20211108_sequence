import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.makeRibbon();
    this.addEvent(this.elem);
  }

  makeRibbon() {
    let ribbon = document.createElement('DIV');
    ribbon.classList.add('ribbon');

    let leftArrowButton = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    let rightArrowButton = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    let nav = document.createElement('NAV');
    nav.classList.add('ribbon__inner');

    rightArrowButton.classList.toggle('ribbon__arrow_visible');
    leftArrowButton.onclick = function() {
      nav.scrollBy(-350, 0);
      if (!rightArrowButton.classList.contains('ribbon__arrow_visible')) {
        rightArrowButton.classList.toggle('ribbon__arrow_visible');
      }
      if (nav.scrollLeft == 0) {
        leftArrowButton.classList.toggle('ribbon__arrow_visible');
      }
    };

    rightArrowButton.onclick = function() {
      nav.scrollBy(350, 0);
      if (!leftArrowButton.classList.contains('ribbon__arrow_visible')) {
        leftArrowButton.classList.toggle('ribbon__arrow_visible');
      }
      let scrollWidth = nav.scrollWidth;
      let scrollLeft = nav.scrollLeft;
      let clientWidth = nav.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight < 1) {
        rightArrowButton.classList.toggle('ribbon__arrow_visible');
      }
    };

    for (let category of this.categories) {
      let nextCategory = createElement(
        `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
      );
      nav.append(nextCategory);
    }

    ribbon.append(leftArrowButton);
    ribbon.append(nav);
    ribbon.append(rightArrowButton);

    return ribbon;
  }

  addEvent(elem) {

    function makeDisappear(ribbonItems) {
      for (let ribbonItem of ribbonItems) {
        ribbonItem.classList.remove('ribbon__item_active');
      }
    }

    let ribbonItems = elem.querySelectorAll('.ribbon__item');

    for (let ribbonItem of ribbonItems) {
      ribbonItem.onclick = function(event) {
        event.preventDefault();
        makeDisappear(ribbonItems);
        ribbonItem.classList.add('ribbon__item_active');
        function selectCategory() {
          let clickEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
            detail: ribbonItem.dataset.id, // уникальный идентификатора категории из её объекта
            bubbles: true // это событие всплывает - это понадобится в дальнейшем
          });
          ribbonItem.dispatchEvent(clickEvent);
        }
        elem.addEventListener('click', selectCategory);
      };
    }
  }
}
