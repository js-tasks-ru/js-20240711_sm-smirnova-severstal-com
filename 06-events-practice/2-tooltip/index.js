class Tooltip {
  static instance;

  constructor () { 
    if (Tooltip.instance) {
      return Tooltip.instance; 
    }
    Tooltip.instance = this;   
  }
  
  initialize () {
    document.addEventListener('pointerover', function(event) {
   
    const target = event.target;

     // если у нас есть подсказка...
    const id = target.dataset.tooltip;
    if (!id) return;

     // ...создадим элемент для подсказки
     this.tooltipElement = document.createElement('div');
     this.tooltipElement.className = 'tooltip';
     this.tooltipElement.innerHTML = id;
     document.body.append(this.tooltipElement);

     const div = target.closest('div')
     if (!div) return; 

     if (!document.contains(div)) return; 
   });

   document.addEventListener('pointerout', function(event) {

     if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
     }

   });
   document.addEventListener('pointermove', (event) => {
      const target = event.target;

});

}

  render(){
    
  }

  destroy() {
  if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }

}

export default Tooltip;
