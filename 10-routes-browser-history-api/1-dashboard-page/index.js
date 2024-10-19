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
    salesChart;
    salesChartElement;
    salesChartUrl = 'api/dashboard/sales';
    customersChart;
    customersChartElement;
    customersChartUrl = 'api/dashboard/customers';
    bestseller;
    bestsellerElement;
    bestsellerUrl = 'api/dashboard/bestsellers';
    
    initPage() {
        this.datefrom = this.getDateFrom();
        this.rangePicker = new RangePicker({
            from: this.datefrom            
        });

        this.ordersChart = new ColumnChart({
            label: '111',
            link: '/orders',
            data: this.getChartData(this.ordersChartUrl),
            url: this.ordersChartUrl,
            range: {
              from: this.getDateFrom(),
              to: new Date(),
            }
          }    
        );
        this.ordersChartElement = this.ordersChart.element;

        this.salesChart = new ColumnChart({
            label: '111',
            link: '/sales',
            data: this.getChartData(this.salesChartUrl),
            url: this.ordersChartUrl,
            range: {
              from: this.getDateFrom(),
              to: new Date(),
            }
          }    
        );
        this.salesChartElement = this.salesChart.element;
        
        this.customersChart = new ColumnChart({
            label: '111',
            link: '/customers',
            data: this.getChartData(this.customersChartUrl),
            url: this.customersChartUrl,
            range: {
              from: this.getDateFrom(),
              to: new Date(),
            }
          }    
        );
        this.customersChartElement = this.customersChart.element;
        
        this.bestseller = new SortableTable(
            header, 
            {
                url: this.bestsellerUrl
            }
        );
        this.bestseller.data = this.getTableData(this.bestsellerUrl);
        // this.bestseller.render();
        this.bestsellerElement = this.bestseller.element;

        this.element = this.createElement(this.createTemplate());
        this.createRangePickerElement();
        this.createColumnChartElements();
        this.createBestsellerElement();

        this.createEventListeners();
    }

    getDateFrom() {
        const dateFrom = new Date();
        dateFrom.setMonth(dateFrom.getMonth() - 1); 
        return dateFrom;
    }

    async getChartData(chartUrl) {
        const url = new URL(chartUrl, BACKEND_URL);
        url.searchParams.set('from', this.getDateFrom().toISOString());
        url.searchParams.set('to', new Date().toISOString());
        
        return await fetchJson(url);
    }

    async getTableData(tabletUrl) {
        const url = new URL(tabletUrl, BACKEND_URL);
        url.searchParams.set('from', this.getDateFrom().toISOString());
        url.searchParams.set('to', new Date().toISOString());
        url.searchParams.set('_sort', header.find(item => item.sortable).id);
        url.searchParams.set('_order', 'asc');
        url.searchParams.set('_start', 1);
        url.searchParams.set('_end', 21);
            
        return await fetchJson(url.toString());
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
                        <div data-element="ordersChart" class="dashboard__chart_orders"></div>
                        <div data-element="salesChart" class="dashboard__chart_sales"></div>
                        <div data-element="customersChart" class="dashboard__chart_customers"></div>
                    </div>
                
                    <h3 class="block-title">Лидеры продаж</h3>
            
                    <div data-element="sortableTable">
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
        this.createChartElement('orders', this.ordersChartElement);
        this.createChartElement('sales', this.salesChartElement);
        this.createChartElement('customers', this.customersChartElement);
        
        // const parentElement = this.element.querySelector('[data-element="ordersChart"]');
        // if (parentElement) {
        //     const columnChartElement = parentElement.querySelector('[class="column-chart"]');
        //     if (columnChartElement) {
        //         columnChartElement.remove();
        //     }
        // }
        // parentElement.append(this.ordersChartElement);
    }
    
    createChartElement(type, element) {
        const parentElement = this.element.querySelector(`[data-element="${type}Chart"]`);
        if (parentElement) {
            const columnChartElement = parentElement.querySelector('[class="column-chart"]');
            if (columnChartElement) {
                columnChartElement.remove();
            }
        }
        parentElement.append(element);
    }

    createBestsellerElement() {
        const parentElement = this.element.querySelector('[data-element="sortableTable"]');
        parentElement.append(this.bestseller.element);
    }

    createEventListeners() {
        document.addEventListener('date-select', this.handleRangePickerDateSelect)
    }

    destroyEventListeners() {
        document.removeEventListener('date-select', this.handleRangePickerDateSelect)
    }

    handleRangePickerDateSelect = (e) => {
        this.refreshColumnChart(this.ordersChart, e.detail, this.ordersChartUrl, this.ordersChartElement);
        this.refreshColumnChart(this.salesChart, e.detail, this.salesChartUrl, this.salesChartElement);
        this.refreshColumnChart(this.customersChart, e.detail, this.customersChartUrl, this.customersChartElement);
        
        this.createColumnChartElements();
    }

    refreshColumnChart(coumnChart, range, url, element) {
        coumnChart.range = range;
        coumnChart.url = new URL(url, BACKEND_URL);
        coumnChart.update(range.from, range.to);
        element = coumnChart.element;
    }

    remove() {
        this.element.remove();
      }

    destroy() {
        this.element.remove();
        this.destroyEventListeners();
    }

    // Dashboard Закзы: https://course-js.javascript.ru/api/dashboard/orders?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z
    // Dashboard Продажи:  https://course-js.javascript.ru/api/dashboard/sales?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z
    // Dashboard Клиенты: https://course-js.javascript.ru/api/dashboard/customers?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z
    // Dashboard Betseller: https://course-js.javascript.ru/api/dashboard/bestsellers?from=2024-09-10T12%3A53%3A30.819Z&to=2024-10-10T12%3A53%3A30.819Z&_sort=title&_order=asc&_start=0&_end=30
    // Товары: https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30
    // Категории: https://course-js.javascript.ru/api/rest/categories?_sort=weight&_refs=subcategory
    // Продажи: https://course-js.javascript.ru/api/rest/orders?createdAt_gte=2024-09-10T12%3A52%3A59.468Z&createdAt_lte=2024-10-10T12%3A52%3A59.468Z&_sort=createdAt&_order=desc&_start=0&_end=30

}
