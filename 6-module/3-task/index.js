import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.addSlides();
    this.elem = this.wrapInContainer(this.elem);
    this.addArrows(this.elem);
    this.addEvent(this.elem, slides);
  }

  addArrows(elem) {
    function arrowStat(leftArrow, rightArrow, counter, marginValue) {
      if (counter === marginValue) {
        leftArrow.style.display = 'none';
      }
      else {
        leftArrow.style.display = '';
      }
    }

    elem.prepend(createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `));
    elem.prepend(createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `));
    
    let rightArrow = elem.getElementsByClassName("carousel__arrow_right")[0];
    let leftArrow = elem.getElementsByClassName("carousel__arrow_left")[0];
    let clickCounter = 0;
    let slidesCount = elem.getElementsByClassName("carousel__slide").length;

    // Initially the left arrows are turned off
    arrowStat(leftArrow, rightArrow, clickCounter, 0);

    rightArrow.onclick = function() {
      let carouselInner = rightArrow.nextElementSibling.nextElementSibling;
      let offset = carouselInner.offsetWidth;
      ++clickCounter;
      carouselInner.style.transform = `translateX(${-offset * clickCounter}px)`;
      arrowStat(leftArrow, rightArrow, clickCounter, 0);
      arrowStat(rightArrow, leftArrow, clickCounter, slidesCount - 1);
    };

    leftArrow.onclick = function() {
      let carouselInner = rightArrow.nextElementSibling.nextElementSibling;
      let offset = carouselInner.offsetWidth;
      clickCounter--;
      carouselInner.style.transform = `translateX(${-offset * clickCounter}px)`;
      arrowStat(leftArrow, rightArrow, clickCounter, 0);
      arrowStat(rightArrow, leftArrow, clickCounter, slidesCount - 1);
    };
  }

  addEvent(elem) {
    let addButtons = elem.getElementsByClassName('carousel__button');

    for (let addButton of addButtons) {
      let slideId = addButton.closest('.carousel__slide').dataset.id;
      function addProduct() {
        let clickEvent = new CustomEvent('product-add', { // имя события должно быть именно "product-add"
          detail: slideId, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });
        addButton.dispatchEvent(clickEvent);
      }
      addButton.addEventListener('click', addProduct);
    }
  }

  addSlides() {
    let div = document.createElement('DIV');
    div.classList.add('carousel__inner');
    for (let slide of this.slides) {
      let slideHTML = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      div.append(slideHTML);
    }
    return div;
  }

  wrapInContainer(elem) {
    let div = document.createElement('div');
    div.classList.add('carousel');
    div.append(elem);
    return div;
  }
}
