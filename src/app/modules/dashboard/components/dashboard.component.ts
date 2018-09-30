import { Component, OnInit, ViewChildren, ViewContainerRef, QueryList, ComponentFactoryResolver } from '@angular/core';

import { SharedService } from '../../../shared/services/shared.service';
import { AddItem } from '../../../shared/helper/ad-item';
import { IComponent } from '../../../shared/interfaces/iComponent';
import { map } from 'rxjs/operators';

declare var jQuery: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    @ViewChildren('item', { read: ViewContainerRef }) itemContainer: QueryList<ViewContainerRef>

    panels;
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private sharedService: SharedService) { }

    ngOnInit() {
        var options = {
            cellHeight: 80,
            verticalMargin: 10
        };

        this.sharedService
            .get('/assets/json/dashboard.json')
            .pipe(map(response => response))
            .subscribe(data => {
                this.panels = data;
                setTimeout(() => {
                    jQuery('.grid-stack').gridstack(options);

                    for (let i = 0; i < this.itemContainer.toArray().length; i++) {
                        const viewContainerRef = this.itemContainer.toArray()[i];
                        const addItem = new AddItem(this.panels[i].component, this.panels[i].data);

                        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(addItem.component);
                        viewContainerRef.clear();

                        let componentRef = viewContainerRef.createComponent(componentFactory);
                        (<IComponent>componentRef.instance).data = addItem.data;
                    }
                });
            })
    }
}
