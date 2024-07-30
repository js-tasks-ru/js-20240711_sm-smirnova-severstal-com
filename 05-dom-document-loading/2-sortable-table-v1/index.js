export default class SortableTable {
  subElements = {};
  _currentSortField = "";
  _currentOrder = "";

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
                <div data-element="body" class="sortable-table__body sortable-table__row">
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
    this._currentSortField = field;
    this._currentOrder = order;

    const isString = field === "title";
    const fieldValueArray = isString
      ? this.sortStrings(this.getFieldValueArray(field), order)
      : this.sortNumbers(this.getFieldValueArray(field), order);

    const sortedData = this.getObjectByArray(field, fieldValueArray);

    this.update(sortedData);
  }

  sortStrings(arr, param = "asc") {
    const newArr = [...arr].sort((a, b) =>
      a.localeCompare(b, ["ru", "en"], { caseFirst: "upper" }),
    );
    return param === "asc" ? newArr : newArr.reverse();
  }

  sortNumbers(arr, param = "asc") {
    const newArr = [...arr].sort((a, b) => a - b);
    return param === "asc" ? newArr : newArr.reverse();
  }

  getFieldValueArray(field) {
    let set = new Set();
    this._data.forEach((obj) => {
      set.add(obj[field]);
    });
    return Array.from(set);
  }

  getObjectByArray(field, array) {
    let sortedData = [];
    let i = 0;
    for (let value of array) {
      for (let obj of this._data) {
        if (obj[field] === value) {
          sortedData[i] = obj;
          i++;
        }
      }
    }
    return sortedData;
  }

  update(newData) {
    this._data = newData;
    this.subElements.body.innerHTML = this.createBodyRowsTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
