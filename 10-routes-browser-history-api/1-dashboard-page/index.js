import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
    
    subElements = {};

    selectSubElements() {
      this.element.querySelectorAll("[data-element]").forEach((element) => {
        this.subElements[element.dataset.element] = element;
      });
    }
      
    datefrom;
    rangePicker;
    ordersChart;
    ordersChartUrl = 'api/dashboard/orders';
    salesChart;
    salesChartUrl = 'api/dashboard/sales';
    customersChart;
    customersChartUrl = 'api/dashboard/customers';
    bestseller;
    bestsellerUrl = 'api/dashboard/bestsellers';

    initPage() {
        this.element = this.createElement(this.createTemplate());
        this.selectSubElements(); 

        this.datefrom = this.getDateFrom();
        this.rangePicker = new RangePicker({
            from: this.datefrom            
        });

        this.ordersChart = new ColumnChart({
            label: '111',
            link: '/orders',
            url: this.ordersChartUrl,
            range: {
              from: this.getDateFrom(),
              to: new Date(),
            }
          }    
        );

        this.salesChart = new ColumnChart({
            label: '111',
            link: '/sales',
            url: this.ordersChartUrl,
            range: {
              from: this.getDateFrom(),
              to: new Date(),
            }
          }    
        );
        
        this.customersChart = new ColumnChart({
            label: '111',
            link: '/customers',
            url: this.customersChartUrl,
            range: {
              from: this.getDateFrom(),
              to: new Date(),
            }
          }    
        );
        
        this.bestseller = new SortableTable(
            header, 
            {
                url: this.bestsellerUrl
            }
        );
        this.bestseller.data = this.getTableData(this.getDateFrom().toISOString(), new Date().toISOString());
        
        this.subElements.rangePicker.append(this.rangePicker.element);
        this.subElements.ordersChart.append(this.ordersChart.element);
        this.subElements.salesChart.append(this.salesChart.element);
        this.subElements.customersChart.append(this.customersChart.element);
        this.subElements.sortableTable.append(this.bestseller.element); 

        this.createEventListeners();
    }

    getDateFrom() {
        const dateFrom = new Date();
        dateFrom.setMonth(dateFrom.getMonth() - 1); 
        return dateFrom;
    }

    async getTableData(from, to) {
        const url = new URL(this.bestsellerUrl, BACKEND_URL);
        url.searchParams.set('from', from);
        url.searchParams.set('to', to);
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
                        <div data-element="rangePicker"></div>
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

    createEventListeners() {
        document.addEventListener('date-select', this.handleRangePickerDateSelect)
    }

    destroyEventListeners() {
        document.removeEventListener('date-select', this.handleRangePickerDateSelect)
    }

    handleRangePickerDateSelect = (e) => {
        this.refreshColumnChart(this.ordersChart, e.detail, this.ordersChartUrl);
        this.refreshColumnChart(this.salesChart, e.detail, this.salesChartUrl);
        this.refreshColumnChart(this.customersChart, e.detail, this.customersChartUrl);
        this.refreshBestseller(e.detail);
    }

    refreshColumnChart(coumnChart, range, url) {
        coumnChart.range = range;
        coumnChart.url = new URL(url, BACKEND_URL);
        coumnChart.update(range.from, range.to);
    }

    async refreshBestseller(range) {
        this.bestseller.data = this.getTableData(range.from.toISOString(), range.to.toISOString());
    }

    remove() {
        this.element.remove();
      }

    destroy() {
        this.element.remove();
        this.destroyEventListeners();
        this.subElements = {};
    }
}
