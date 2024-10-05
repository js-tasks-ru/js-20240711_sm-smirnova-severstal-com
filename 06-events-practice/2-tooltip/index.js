class Tooltip {
  static instance;

  constructor () { 
    if (Tooltip.instance) {
      return Tooltip.instance; 
    }
    Tooltip.instance = this;  
    this.element;
  }
  
  initialize () {
    const element = document.querySelector('[class="tooltip"]');
    if (!element) {
      this.createElement();
    }
    document.addEventListener("pointerover", this.handlePointerOver);
    document.addEventListener("pointerout", this.handlePointerOut);
  }

  render() {
    const element = document.querySelector('[class="tooltip"]');
    if (!element) {
      this.createElement();
    }
    const dataTooltip = document.querySelector("[data-tooltip='bar-bar-bar']");
    if (dataTooltip) {
      this.show(dataTooltip.getAttribute('data-tooltip'));
    }
  }

  createElement() {
    // ...создадим элемент для подсказки
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    document.body.append(this.element);
  }

  removeElement() {
    this.element.remove();
  }

  handlePointerOver = (event) => {
      const target = event.target.closest('[data-tooltip]');
      if (target) {
        const element = document.querySelector('[class="tooltip"]');
        if (!element) {
          this.createElement();
        }
        this.show(target.getAttribute('data-tooltip'));
      }
  }

  show(text) {
    this.element.textContent = text;
  }
 
  handlePointerOut = (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target) {
        this.removeElement();
    }
  }

  destroyEventListeners(){
    document.removeEventListener("pointerover", this.handlePointerOver);
    document.removeEventListener("pointerout", this.handlePointerOut);
  }

  destroy() {
    this.element.remove();    
    this.destroyEventListeners();
  }
}

export default Tooltip;
