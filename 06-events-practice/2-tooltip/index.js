class Tooltip {
  static instance;

  constructor () { 
    if (Tooltip.instance) {
      return Tooltip.instance; 
    }
    Tooltip.instance = this;  
    this.initialize();  
  }
  
  initialize () {
    const tooltipElement = document.querySelector('[class="tooltip"]');
    if (!tooltipElement) {
      this.createElement();
    }
    this.handleHeaderEventPointerOver = this.handleHeaderEventPointerOver.bind(this);
    document.addEventListener(
      "pointerover"
      , this.handleHeaderEventPointerOver
    );
  }

  render() {
    this.show('');
  }

  createElement() {
    // ...создадим элемент для подсказки
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'tooltip';
    // Чтобы подсказка не мешала взаимодействию с другими элементами
    this.tooltipElement.style.pointerEvents = 'none'; 
    this.tooltipElement.style.display = 'none';
    document.body.append(this.tooltipElement);
  }

  handleHeaderEventPointerOver(event) {
      const target = event.target;
      // если у нас есть подсказка...
      const id = target.dataset.tooltip;
      if (!id) {
        this.hide();
        return;
      }
  
      const div = target.closest('div')
      if (!div) {
        this.hide();
        return;
      } 
  
      if (!document.contains(div)) {
        this.hide();
        return;
      }
      
      this.show('');

  }

  show(text) {
    this.tooltipElement.innerText = text;
    this.tooltipElement.style.display = 'block';
  }

  hide() {
      this.tooltipElement.style.display = 'none';
  }
 
  destroyEventListeners(){
    this.handleHeaderEventPointerOver = this.handleHeaderEventPointerOver.bind(this);
    document.removeEventListener(
      "pointerover"
      , this.handleHeaderEventPointerOver
    );
  }

  destroy() {
    const tooltipElement = document.querySelector('[class="tooltip"]');
    if (tooltipElement)
      tooltipElement.remove();

    this.tooltipElement.remove();
    this.destroyEventListeners();
  }
}

export default Tooltip;
