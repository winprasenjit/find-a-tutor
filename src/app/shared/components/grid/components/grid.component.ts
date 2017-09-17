import { SortPipe } from '../../../pipes/order-by';
import { Column } from '../../../models/column.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

import * as _ from 'lodash';

@Component({
    selector: 'custom-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    userLoaded = false;
    columns: Column[];
    dataList: Array<any>;
    data: Array<any> = [];
    sortOrder: string;
    orderBy = 'asc';
    selectedRow: number;
    gridEventObj: any = {};
    pageLength: number;
    page = 0;
    pagerRows = 10;
    pagedItems: any = [];
    pageSizeOptions = [5, 10, 25, 100];
    pageEvent: any;

    @Output()
    private gridEvent: any = new EventEmitter();

    constructor() { }

    @Input('column-list')
    set columnList(value) {
        if (value) {
            this.columns = value;
        }
    }

    @Input('data-set')
    set dataSet(value) {
        if (value) {
            this.dataList = value;
            this.createDataOutput()
        }
    }

    /* get page(): number {
        return this._page;
    }

    set page(page) {
        this._page = page;
        if (this.data && this.data.length > 0) {
            this.setPage(page);
        }
    } */

    ngOnInit(): void { }

    createDataOutput(): void {
        for (let i = 0; i < this.dataList.length; i++) {
            const dataObj = this.createCellTemplate(this.dataList[i]);
            this.data.push(dataObj);
        }
        this.pageLength = this.data.length
        this.pageEvent = {
            pageIndex: this.page,
            pageSize: this.pagerRows,
            length: this.pageLength
        };
        this.setPage(this.pageEvent);
    }

    createCellTemplate(dataObj: any): any {
        dataObj.guid = (dataObj.hasOwnProperty('guid')) ? dataObj.guid : this.createGuid();
        for (let j = 0; j < this.columns.length; j++) {
            const key = this.columns[j].field;
            dataObj[key] = (this.columns[j].hasOwnProperty('callBack'))
                ? this.columns[j]['callBack'](dataObj) : dataObj[key];
        }

        return dataObj;
    }

    createGuid(): number {
        const guid = (this.data.length > 0) ? (this.data[this.data.length - 1]['guid'] + 1) : 1;
        return guid;
    }

    setPage($event: any): void {
        this.page = $event.pageIndex;
        this.pagerRows = $event.pageSize;
        this.pageEvent = $event;

        if (this.page < 0 || this.page > this.pageLength) {
            return;
        }

        // get current page of items
        this.pagedItems = this.data.slice((this.page * this.pagerRows), ((this.page + 1) * this.pagerRows));
        this.gridEventObj = {};
    }

    sortBy(header: string, dataType: string, orderType: string): void {
        const sortPipe = new SortPipe();
        dataType = (dataType) ? dataType : 'string';
        this.orderBy = (orderType === 'asc') ? 'desc' : 'asc';
        this.sortOrder = header + '-' + this.orderBy + '-' + dataType;
        sortPipe.transform(this.data, this.sortOrder);
        this.setPage(this.pageEvent);
    }

    selectRow(index: number, row): void {
        const items = _.find(this.dataList, ['guid', row.guid]);
        this.gridEventObj.selection = {
            selected: true,
            selectedRow: index,
            selectedIndex: index + (this.page  * this.pagerRows),
            items: items
        };

        this.gridEvent.emit(this.gridEventObj);
    }

    addRow(row, index?: number): void {
        const dataObj = this.createCellTemplate(row);
        this.data.push(dataObj);
        this.dataList.push(dataObj);
        this.setPage(this.pageEvent);
    }

    updateRow(row: any, index: number): void {
        let dataObj;
        row.guid = this.data[index].guid;
        dataObj = this.createCellTemplate(row);
        this.data[index] = dataObj;
        index = _.findIndex(this.dataList, function (obj) { return obj.guid === dataObj.guid });
        this.dataList[index] = dataObj;
        this.setPage(this.pageEvent);
    }

    removeRow(index: number): void {
        _.remove(this.dataList, ['guid', this.data[index].guid]);
        this.data.splice(index, 1);
        this.setPage(this.pageEvent);
    }
}
