import SortTableTableV1 from "./sortableTable.js";

export default class SortableTableV2 extends SortTableTableV1 {
  isSortLocally = true;
  sortField;
  sortOrder;

  constructor(headersConfig, {data = [], sorted = {}} = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.createEventListeners();    
  }

  sortOnClient() {
    super.sort(this.sortField, this.sortOrder);
  }

  sortOnServer() {
    
  }

  sort() {
    if (this.isSortLocally) {
      this.sortOnClient();
    }
    else {
      this.sortOnServer();
    }
  }

  handleHeaderEventPointerDown(event) {
    const currentColumn = event.target.closest('[data-sortable="true"]');
    if (!currentColumn)
      return;

    this.sortField = currentColumn.dataset.id;
    this.sortOrder = currentColumn.dataset.order === 'asc' ? 'desc' : 'asc';
    currentColumn.dataset.order = this.sortOrder;

    this.sort();
  }

  createEventListeners(){
    this.handleHeaderEventPointerDown = this.handleHeaderEventPointerDown.bind(this);
    this.subElements.header.addEventListener(
      "pointerdown"
      , this.handleHeaderEventPointerDown
    );
  }

  destroyEventListeners(){
    this.subElements.header.removeEventListener(
      "pointerdown"
      , this.handleHeaderEventPointerDown
    );
  }

}
