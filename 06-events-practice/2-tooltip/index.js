class Tooltip {
  static instance;

  constructor () { 
    if (Tooltip.instance) {
      return Tooltip.instance; 
    }
    Tooltip.instance = this;  
  }
  
  initialize () {
    if (!this.element) {
      this.createElement();
    }

    document.addEventListener("pointerover", this.handlePointerOver);
    document.addEventListener("pointerout", this.handlePointerOut);
  }

  render() {
    if (!this.element) {
      this.createElement();
    }

    this.element.dispatchEvent(new Event("pointerover"));
  }

  createElement() {
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
        // this.element.hidden = false;
        this.createElement();
        this.show(target.getAttribute('data-tooltip'));
      }
  }

  show(text) {
    this.element.textContent = text;
  }
 
  handlePointerOut = (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target) {
      // this.element.hidden = true;
        this.removeElement();
    }
  }

  destroyEventListeners(){
    document.removeEventListener("pointerover", this.handlePointerOver);
    document.removeEventListener("pointerout", this.handlePointerOut);
  }

  destroy() {
    this.removeElement();   
    this.destroyEventListeners();
  }
}

export default Tooltip;
