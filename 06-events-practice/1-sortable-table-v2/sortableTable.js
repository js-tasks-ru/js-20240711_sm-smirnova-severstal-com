export default class SortableTable {
  subElements = {};
  _currentSortField = "title";
  _currentOrder = "asc";

  constructor(headerConfig = [], data = []) {
    this._headerConfig = headerConfig;
    this._data = data;
    this.element = this.createElement(this.createTemplate());
    this._arrowElement = this.createElement(this.createSortArrowTemplate());
    this.selectSubElements();
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createTemplate() {
    return `<div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createHeaderCellsTemplate()}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${this.createBodyRowsTemplate()}
                </div>
            </div>
       </div>`;
  }


  createHeaderCellsTemplate() {
    return this._headerConfig
      .map((item) => {
        const { id, title, sortable } = item;
        const isSortField = this._currentSortField === id;
        const dataSort = this._currentOrder
          ? `data-order="${this._currentOrder}"`
          : "";

        return `<div
            class="sortable-table__cell"
            data-id=${id}
            data-sortable=${sortable}
            ${dataSort}
        >
            <span>${title}</span>
            ${isSortField ? this.createSortArrowTemplate() : ""}
        </div>`;
      })
      .join("");
  }

  createSortArrowTemplate() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`;
  }

  getArrowElement(id) {
    return id === "title"
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`
      : "";
  }

  createBodyRowsTemplate() {
    return this._data.map(item => this.createBodyRowTemplate(item)).join('');
  }

  createBodyRowTemplate(item) {
    const cells = this._headerConfig.map(({id, template}) => {
      if (template) {
        return template(item[id]);
      }
      return `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');

    return (
      `<a href="/products/${item.id}" class="sortable-table__row">
          ${cells}
       </a>`
    );
  }

  createEmptyDataTemplate() {
    return `
      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>`;
  }

  sort(field, order) {   
    const column = this._headerConfig.find(item => item.id === field);
    this._data.sort((a, b) => {
      switch (column.sortType) {  
      case 'string':    
        if (order === 'asc') {    
          return a[field].localeCompare(b[field], 'ru-RU', {caseFirst: 'upper'});  
        }    
        return b[field].localeCompare(a[field], 'ru-RU', {caseFirst: 'upper'});    
      case 'number':    
        if (order === 'asc') {    
          return a[field] - b[field];  
        }    
        return b[field] - a[field];  
      case 'custom':  
        if (order === 'asc') {  
          return customSorting(a, b);
        }  
        return customSorting(b, a);  
      }  
    });
    this.subElements.body.innerHTML = this.createBodyRowsTemplate();
  }
  
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
