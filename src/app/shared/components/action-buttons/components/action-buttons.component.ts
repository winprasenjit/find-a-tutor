import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {

    isSelected: any;

    @Output('create') create = new EventEmitter();
    @Output('update') update = new EventEmitter();
    @Output('delete') delete = new EventEmitter();

    constructor() { }

    @Input()
    set disabledWhen(value: any){
        this.isSelected = value;
    }

    ngOnInit() {
    }

    createFn(): void {
        this.create.emit();
    }

    updateFn(): void {
        this.update.emit();
    }

    deleteFn(): void {
        this.delete.emit();
    }
}
