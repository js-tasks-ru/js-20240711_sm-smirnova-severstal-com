export default class SortableTable {
  subElements = {};
  constructor(headerConfig = [], data = []) {
    // const {
    //   id = '',
    //   title = '',
    //   sortable = false,
    //   sortType = '',
    //   template = (data) => data
    // } = headerConfig;

    let 
      id = '',
      title = '',
      sortable = false,
      sortType = '',
      template = (data) => data,
      description = "",
      quantity = 0,
      subcategory = {},
      status = 0,
      images = [],
      price = 0,
      discount = 0,
      sales = 0
      ;
    

    // const {
    //   id = "",
    //   title = "",
    //   description = "",
    //   quantity = 0,
    //   subcategory = {},
    //   status = 0,
    //   images = [],
    //   price = 0,
    //   discount = 0,
    //   sales = 14
    // } = data;

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

    this.id = id;
    this.title = title;

    this.sortable = sortable;
    this.sortType = sortType;
    this.template = template;

    this.data = data;
    // this.productId = productId;
    // this.productTitle = productTitle;
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

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createHeaderTableTemplate(){
    return this.headerConfig.map(({
      id,
      title,
      sortable,
      sortType
            }) => (
                `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${sortType}">
                   <span>${title}</span>
                 </div>`
            )).join('');
  }

  createBodyTableTemplate(){
    return this.data.map(({
              id, 
              title,
              price,
              sales
            }) => (
                `<div class="sortable-table__cell">
                        <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
                    </div>
                    <div class="sortable-table__cell">${id}</div>
                    <div class="sortable-table__cell">${title}</div>
                    <div class="sortable-table__cell">${price}</div>
                    <div class="sortable-table__cell">${sales}</div>`
            )).join('');
}

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
      const headerFieldElement = this.element.subElement.header.querySelector(`[data-id="${field}"]`);
      this.arrowElement.parentElement = headerFieldElement;
    }
    
    sortStrings(arr, param = 'asc') {
      const newArr = [...arr].sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }));
      return param === 'asc' ? newArr : newArr.reverse();
    };

    selectSubElements() {
      this.element.querySelectorAll('[data-element]').forEach(element => {
        this.subElements[element.dataset.element] = element;
      });
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

