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
    this.element.dispatchEvent(new Event("pointerover"));
    this.element.dispatchEvent(new Event("pointerout"));
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    document.body.append(this.element);
  }

  handlePointerOver = (event) => {
      const target = event.target.closest('[data-tooltip]');
      if (target) {
        this.element.hidden = false;
        this.element.textContent = target.getAttribute('data-tooltip');
      }
  }
 
  handlePointerOut = (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target) {
      this.element.hidden = true;
      this.element.textContent = null;
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
