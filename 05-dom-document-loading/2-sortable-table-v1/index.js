export default class SortableTable {
  subElements = {};
  _currentSortField = '';
  _currentOrder = '';

  constructor(headerConfig = [], data = []) {  
    this._headerConfig = headerConfig;
    this._data = data;
    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
    this._arrowElement = this.createSortArrowTemplate();
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return (
      `<div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createHeaderCellsTemplate()}
                </div>
                <div data-element="body" class="sortable-table__body sortable-table__row">
                    ${this.createBodyRowsTemplate()}
                </div>
            </div>
       </div>`
    );
  }

// createTemplate() {
//   return (
//     `<div data-element="productsContainer" class="products-list__container">
//           <div class="sortable-table sortable-table_loading sortable-table_empty">
//               <div data-element="header" class="sortable-table__header sortable-table__row">
//                   ${this.createHeaderCellsTemplate()}
//               </div>
//               <div data-element="body" class="sortable-table__body">
//                   ${this.createBodyRowsTemplate()}
//               </div>
//               ${this.createEmptyDataTemplate()}              
//           </div>
//      </div>`
//   );
// }

  createHeaderCellsTemplate() {
    return this._headerConfig.map(item => {
      const {id, title, sortable} = item;
      const isSortField = this._currentSortField === id;
      const dataSort = this._currentOrder ? `data-order="${this._currentOrder}"` : '';

      return (
        `<div
            class="sortable-table__cell"
            data-id=${id}
            data-sortable=${sortable}
            ${dataSort}
        >
            <span>${title}</span>
            ${isSortField ? this.createSortArrowTemplate() : ''}
        </div>`
      );
    }).join('');
  }
  createSortArrowElement(template) {
    const element = document.createElement('span');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createSortArrowTemplate(){
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`;
  }

  getArrowElement(id){
    return id === "title" ? `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>` : '';
  }

  createBodyRowsTemplate() {
    return this._data.map(item => {
      const {title, quantity, price, sales} = item;

      return (
        `<div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
         </div><div class="sortable-table__cell">${title}</div><div class="sortable-table__cell">${quantity}</div><div class="sortable-table__cell">${price}</div><div class="sortable-table__cell">${sales}</div>`
    );
    }).join('');
  }

  createEmptyDataTemplate() {
    return (
            `<div data-element="loading" class="loading-line sortable-table__loading-line"></div>

            <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
              <div>
                <p>No products satisfies your filter criteria</p>
                <button type="button" class="button-primary-outline">Reset all filters</button>
              </div>
            </div>`
        );
  }

  sort(field, order) {
    this._currentSortField = field;
    this._currentOrder = order;

    this.selectSubElements();
    const headerFieldElement = this.subElements.header.querySelector(`[data-id="${field}"]`);
    if (!headerFieldElement.getAttribute('data-sortable'))
      return;

    const isString = field === "title";
    const fieldValueArray = isString ? this.sortStrings(this.getFieldValueArray(field), order) : this.sortNumbers(this.getFieldValueArray(field), order);
    const sortedData = this.getObjectByArray(field, fieldValueArray);
   
    this.update(sortedData);

    const arrowElement = this.subElements.header.querySelector(`[data-element="arrow"]`);
    if (arrowElement)
    {
      // let elem = document.querySelector('#elem');
      // let parElem = arrowElement.parentElement;
      // parElem = headerFieldElement;

      // console.log(id);
      
      
      this._arrowElement = arrowElement;
      this._arrowElement.parentElement = headerFieldElement;

      // const bodyFieldElement = this.subElements.body;
      // bodyFieldElement.innerHTML = this.createBodyRowsTemplate();


    }
    else {
      const span = this.createSortArrowElement(this.createSortArrowTemplate());
      headerFieldElement.append(span);
    }


    // const cellIndex = this.headerConfig.findIndex(obj => obj.id === field);
    // const body  = this.subElements.body;
    // const firstRow = body.firstElementChild;
    // const lastRow = body.lastElementChild;
    // console.log(firstRow.children[cellIndex].textContent);
    // console.log(lastRow.children[cellIndex].textContent);
  }
  
  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  getFieldValueArray(field){
    let set = new Set();
    this._data.forEach(obj => {
      set.add(obj[field]);
    });
    return Array.from(set);
  }

  sortStrings(arr, param = 'asc') {
    const newArr = [...arr].sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }));
    return param === 'asc' ? newArr : newArr.reverse();
  }

  sortNumbers(arr, param = 'asc'){
    const newArr = [...arr].sort(function(a, b) {
      return a - b;
    });
    return param === 'asc' ? newArr : newArr.reverse();
  }
  

  getObjectByArray(field, array){
    let sortedData = [];
    let i = 0;
    for(let value of array ){
      for(let obj of this._data ){
        if (obj[field] === value)
        {
          sortedData[i] = obj;
          i++;
        }
      }      
    }
    return sortedData;
  }

  update(newData) {
    this._data = newData;
    // const headerFieldElement = this.subElements.header;
    // headerFieldElement.innerHTML = this.createHeaderTableTemplate();
    const bodyFieldElement = this.subElements.body;
    bodyFieldElement.innerHTML = this.createBodyRowsTemplate();
  }

  remove() {
    this.element.remove();
  }
    
  destroy() {
    this.remove();
  }

}

