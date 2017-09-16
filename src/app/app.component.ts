import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

declare var $: any; // JQuery

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'This is the main component';
    rowData = [];

    constructor() {}
    
    ngOnInit(){} 
}
