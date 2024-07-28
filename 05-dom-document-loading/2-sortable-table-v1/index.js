export default class SortableTable {
  subElements = {};
  constructor(headerConfig = [], data = []) {

    let id = '';
    let title = '';
    let sortable = false;
    let sortType = '';
    let template = (data) => data;
    let description = "";
    let quantity = 0;
    let subcategory = {};
    let status = 0;
    let images = [];
    let price = 0;
    let discount = 0;
    let sales = 0
      ;
    

    ({
      id = '',
      title = '',
      sortable = false,
      sortType = '',
      template = (data) => data
    } = headerConfig);

    ({
      id = "",
      title = "",
      description = "",
      quantity = 0,
      subcategory = {},
      status = 0,
      images = [],
      price = 0,
      discount = 0,
      sales = 14
    } = data);    
    
    this.headerConfig = headerConfig;
    // this.headerConfig = this.getHeaderConfig(headerConfig);

    this.id = id;
    this.title = title;

    this.sortable = sortable;
    this.sortType = sortType;
    this.template = template;

    this.data = data;
    this.description = description;
    this.quantity = quantity;
    this.subcategory = subcategory;
    this.status = status;
    this.images = images;
    this.price = price;
    this.discount = discount;
    this.sales = sales;
    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
  }

  // getHeaderConfig(headerConfig){
  //   let arr = [];
  //   let j = 0;
  //   for(let i = 1; i< headerConfig.length; i++){
  //     arr[j] = headerConfig[i];
  //     j++;
  //   }
  //   return arr;
  // }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createHeaderTableTemplate() {
    return this.headerConfig.map(({
      id,
      title,
      sortable
    }) => (
            `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
                <span>${title}</span>
                ${this.getArrowElement(id)}
            </div>`
    )).join('');
  }
//             `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${this.setImagesStyle(id)}>

  setImagesStyle(id){
    return id === "images" ? ` style="display: none;" ` : '';
  }

  getArrowElement(id){
    return id === "title" ? `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>` : '';
  }

  createBodyTableTemplate() {
    return this.data.map(({
      title,
      quantity,
      price,
      sales
    }) => (
      `<div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
        </div>
       <div class="sortable-table__cell">${title}</div>
       <div class="sortable-table__cell">${quantity}</div>
       <div class="sortable-table__cell">${price}</div>
       <div class="sortable-table__cell">${sales}</div>`
    )).join('');
  }

  // <div class="sortable-table__cell" style="display: none;">

  createTemplate() {
    return (
            `<div data-element="productsContainer" class="products-list__container">
                <div class="sortable-table">              
                    <div data-element="header" class="sortable-table__header sortable-table__row">
                        ${this.createHeaderTableTemplate()}
                    </div>
                    <div data-element="body" class="sortable-table__body sortable-table__row">
                        ${this.createBodyTableTemplate()}
                    </div>
                </div>
            </div>`
    );
  }

  sort(field, order) {
    this.selectSubElements();
    const headerFieldElement = this.subElements.header.querySelector(`[data-id="${field}"]`);
    if (!headerFieldElement.getAttribute('data-sortable'))
      return;

    const isString = field === "title";
    const fieldValueArray = isString ? this.sortStrings(this.getFieldValueArray(field), order) : this.sortNumbers(this.getFieldValueArray(field), order);
    const sortedData = this.getObjectByArray(field, fieldValueArray);
   
    // this.arrowElement.parentElement = headerFieldElement;

    this.update(sortedData);


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
    this.data.forEach(obj => {
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
      for(let obj of this.data ){
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
    this.data = newData;
    // const headerFieldElement = this.subElements.header;
    // headerFieldElement.innerHTML = this.createHeaderTableTemplate();
    const bodyFieldElement = this.subElements.body;
    bodyFieldElement.innerHTML = this.createBodyTableTemplate();
  }


  

  /*

                <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                  <div>
                    <p>No products satisfies your filter criteria</p>
                    <button type="button" class="button-primary-outline">Reset all filters</button>
                  </div>
                </div>
*/
  remove() {
    this.element.remove();
  }
    
  destroy() {
    this.element.remove();
  }


}

