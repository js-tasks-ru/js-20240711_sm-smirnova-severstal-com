import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
    
    datefrom;
    rangePicker;
    ordersChart;
    ordersChartElement;
    ordersChartUrl = 'api/dashboard/orders';
    componentMap = {
        ordersChart: new ColumnChart({
            label: '111',
            link: 'sales',
            data: [ 30, 40, 20, 80, 35, 15 ],
            url: this.ordersChartUrl,
            range: {
              from: new Date(),
              to: new Date(),
            }
          }    
        ),
    }

    componentElements = {};

    initPage() {
        this.datefrom = this.getDateFrom();
        this.rangePicker = new RangePicker({
            from: this.datefrom            
        });
        this.ordersChart = new ColumnChart({
            label: '111',
            link: 'sales',
            data: [ 30, 40, 20, 80, 35, 15 ],
            url: this.ordersChartUrl,
            range: {
              from: new Date(),
              to: new Date(),
            }
          }    
        );
        this.ordersChartElement = this.ordersChart.element;
        
        this.element = this.createElement(this.createTemplate());
        this.createRangePickerElement();
        this.createColumnChartElements();

        this.createEventListeners();
    }

    getDateFrom() {
        const dateFrom = new Date();
        dateFrom.setMonth(dateFrom.getMonth() - 1); 
        return dateFrom;
    }

    createElement(template) {
        const element = document.createElement('div');
        element.innerHTML = template;
        return element.firstElementChild;
    }

    createTemplate() {
        return (`
                <div class="dashboard">
                    <div class="content__top-panel">
                        <h2 class="page-title">Панель управления</h2>
                        <!-- data-component="rangePicker"-->
                    </div>
                    <div data-element="chartsRoot" class="dashboard__charts">
                        <div data-component="columnChart"></div>
                        <div data-element="ordersChart" class="dashboard__chart_orders"></div>
                        <div data-element="salesChart" class="dashboard__chart_sales"></div>
                        <div data-element="customersChart" class="dashboard__chart_customers"></div>
                    </div>
                
                    <h3 class="block-title">Лидеры продаж</h3>
            
                    <div data-element="sortableTable">
                        <!-- sortable-table component -->
                    </div>
                </div>
            `);
    }

    render() {
        this.initPage();
        return this.element;
    }

    createElement(template) {
        const element = document.createElement("div");
        element.innerHTML = template;
        return element.firstElementChild;
    }

    createRangePickerElement() {
        const parentElement = this.element.querySelector('[class="content__top-panel"]');
        parentElement.append(this.rangePicker.element);
    }

    createColumnChartElements() {
        const parentElement = this.element.querySelector('[data-element="ordersChart"]');
        if (parentElement) {
            const columnChartElement = parentElement.querySelector('[class="column-chart"]');
            if (columnChartElement) {
                columnChartElement.remove();
            }
        }
        // for (const child of parentElement.children) {
        //     child.removeChild();
        //   }
            
        // const childElement = parentElement.querySelector('[class="column-chart column-chart_loading"]');        
        // if (childElement) {
        //     parentElement.removeChild();
        // }
        parentElement.append(this.ordersChartElement);
    }
    
    createEventListeners() {
        document.addEventListener('date-select', this.handleRangePickerDateSelect)
    }

    destroyEventListeners() {
        document.removeEventListener('date-select', this.handleRangePickerDateSelect)
    }

    handleRangePickerDateSelect = (e) => {
        this.ordersChart.range = e.detail;
        this.ordersChart.url = new URL(this.ordersChartUrl, BACKEND_URL);
        for (const [componentName, componentInstance] of Object.entries(this.componentMap)) {
            componentInstance.update(e.detail.from, e.detail.to);
            this.ordersChart = componentInstance;
            this.ordersChartElement = this.ordersChart.element;
        }

        // this.ordersChart = new ColumnChart({
        //     label: '111',
        //     link: 'sales',
        //     data: [ 30, 40, 20, 80, 35, 15 ],
        //     url: this.ordersChartUrl,
        //     range: e.detail
        //   }    
        // );
        
        this.createColumnChartElements();
    }

    destroy() {
        // for (const component of Object.values(this.componentMap)) {
        //     component.destroy();
        // }

        this.element.remove();
    }

    // Dashboard Закзы: https://course-js.javascript.ru/api/dashboard/orders?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z
    // Dashboard Продажи:  https://course-js.javascript.ru/api/dashboard/sales?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z
    // Dashboard Клиенты: https://course-js.javascript.ru/api/dashboard/customers?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z
    // Dashboard Betseller: https://course-js.javascript.ru/api/dashboard/bestsellers?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z&_sort=title&_order=asc&_start=0&_end=30
    // Товары: https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30
    // Категории: https://course-js.javascript.ru/api/rest/categories?_sort=weight&_refs=subcategory
    // Продажи: https://course-js.javascript.ru/api/rest/orders?createdAt_gte=2024-09-10T12%3A52%3A59.468Z&createdAt_lte=2024-10-10T12%3A52%3A59.468Z&_sort=createdAt&_order=desc&_start=0&_end=30

}
