import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.value = value;
    this.elem = this.render(steps, value);
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.spans = this.sliderSteps.querySelectorAll('span');
    this.setValue(this.value / this.segments);
    this.changeSlider();
  }

  render(steps, value) {
    let elem = createElement(`
    <!--Корневой элемент слайдера-->
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">${value}</span>
      </div>

      <!--Полоска слайдера-->
      <div class="slider__progress"></div>

      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
        <!-- текущий выбранный шаг выделен этим классом -->
        <span class="slider__step-active"></span>
      </div>
    </div>
    `);

    let spanInsertionPt = elem.querySelector('.slider__steps');
    for (let i = 0; i <= steps - 2; i++) {
      let span = document.createElement('span');
      spanInsertionPt.appendChild(span);
    }
    return elem;
  }

  setValue = newLeft => {
    let newLeftRel = newLeft * this.segments % 1;
    let newLeftPercent = Math.round(newLeft * 100);
    let newValue = Math.round(this.segments * newLeft);
    let percentValue;
    if (newLeftRel < 0.5) {
      percentValue = newLeftPercent - (newLeftPercent % (100 / this.segments));
    }
    else {
      percentValue = newLeftPercent - (newLeftPercent % (100 / this.segments)) + 100 / this.segments;
    }

    this.elem.querySelector(".slider__thumb").style.left = `${percentValue}%`;
    this.elem.querySelector(".slider__progress").style.width = `${percentValue}%`;
    this.elem.querySelector(".slider__value").innerHTML = newValue;

    for (let span of this.spans) {
      span.classList.remove('slider__step-active');
    }
    this.spans[newValue].classList.add('slider__step-active');
    this.value = newValue;
  }

  moveThumb = event => {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    this.setValue(newLeft);
    
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  changeSlider() {
    this.elem.addEventListener('click', this.moveThumb);
  }
}
