import SortableTable1 from './sortableTable.js';

export default class SortableTable  {
  subElements = {};

  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this._sortableTable = new SortableTable1(headersConfig, data);
    this.element = this._sortableTable.element;
    this.selectSubElements();
    this.sort();
    this.addClick();
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  addClick(){
    this.subElements.header.addEventListener('click', function(event) {
      const target = event.target; // где был клик?
    
      if (target.tagName != 'SPAN') return; 
      const order = this.sorted.map((item) => {
        const { id, order } = item;        
        return order;
      });
      this.sort(target.field, order); 
    });

  }

  sort(field, order) {
    if (this.isSortLocally) {
      this.SortableTable1.sort(field, order);
    } else {
      this.sortOnServer();
    }
  }

  sortOnServer(){

  }
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
