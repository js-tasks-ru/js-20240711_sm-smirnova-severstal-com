import ColumnChart from "./column-chart/src/index.js";

export default class ColumnChartExt extends ColumnChart {

    constructor({
        label = '',
        link = '',
        formatHeading = data => data,
        url = '',
        range = {
          from: new Date(),
          to: new Date(),
        }
      } = {}) {
        super({
            label = '',
            link = '',
            formatHeading = data => data,
            url = '',
            range = {
              from: new Date(),
              to: new Date(),
            }
          } = {});
        this.createEventListeners();    
    }

    handleRangePickerDateSelect = (e) => {
        super.range = e.detail;
        super.url = new URL('https://course-js.javascript.ru/api/dashboard/orders');
        super.render();
        super.update(e.detail.from, e.detail.to);
        const element = super.element;
        debugger;
        this.dispatchEvent(this.element);
    }

    createEventListeners() {
        document.addEventListener('date-select', this.handleRangePickerDateSelect)
    }

    destroyEventListeners() {
        document.removeEventListener('date-select', this.handleRangePickerDateSelect)
    }

    dispatchEvent(element) {
        this.element.dispatchEvent(new CustomEvent('columnn-chart-change', {
          bubbles: true,
          detail: element
        }));
    }

        // createTemplate() {
    //     return `<div></div>`;
    // }

    render() {
        this.createEventListeners();
    }
    // render(...args) {
    //     super.render(...args);
    //     this.createEventListeners();
    // }

    destroy() {
        super.destroy();
        this.destroyEventListeners();
    }
}