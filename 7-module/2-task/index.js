import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.title = "Modal window header";
    this.body = document.querySelector("body");
    this.container = document.querySelector(".container");
    this.elem = this.render();
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  render() {
    let elem = createElement(`
      <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            ${this.title}
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>

      </div>
    `);

    return elem;
  }

  onClick(event) {
    if (event.target.closest(".modal__close")) {
      this.close();
    }
  }

  onDocumentKeyDown(event) {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
    this.keydownFunc = (event) => this.onDocumentKeyDown(event);
    document.addEventListener('keydown', this.keydownFunc);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.removeEventListener('keydown', this.keydownFunc);
  }

  setTitle(title) {
    let titleTag = this.elem.querySelector(".modal__title");
    titleTag.textContent = title;
  }

  setBody(node) {
    let container = this.elem.querySelector(".modal__body");
    container.innerHTML = "";
    container.append(node);
  }
}
