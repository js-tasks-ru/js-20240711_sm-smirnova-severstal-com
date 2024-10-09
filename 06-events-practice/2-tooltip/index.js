class Tooltip {
  static instance;

  constructor () { 
    if (Tooltip.instance) {
      return Tooltip.instance; 
    }
    Tooltip.instance = this;  
  }
  
  initialize () {
    this.createElement();

    document.addEventListener("pointerover", this.handlePointerOver);
    document.addEventListener("pointerout", this.handlePointerOut);
    document.addEventListener("pointermove", this.handlePointerMove);
  }

  render() {
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
        this.createElement();
        this.element.textContent = target.getAttribute('data-tooltip');
      }
  }
 
  handlePointerOut = (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target) {
      this.removeElement();
    }
  }

  handlePointerMove = (event) => {
    this.positionTooltip(event);
  }

  positionTooltip(event) {
    if (this.element) {
      const {clientX, clientY} = event;
      this.element.style.left = `${clientX + 10}px`;
      this.element.style.top = `${clientY + 10}px`;
    }
  }

  destroyEventListeners(){
    document.removeEventListener("pointerover", this.handlePointerOver);
    document.removeEventListener("pointerout", this.handlePointerOut);
    document.removeEventListener("pointermove", this.handlePointerMove);
  }

  destroy() {
    this.removeElement();  
    this.destroyEventListeners();
  }
}

export default Tooltip;
