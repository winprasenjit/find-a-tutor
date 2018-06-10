/**
 * Created by prasenjit on 6/9/2018.
 */
import {
    Directive, ElementRef, HostListener, Output, EventEmitter, HostBinding, AfterViewInit
} from '@angular/core';

@Directive({
    selector: '[set-auto-height]'
})
export class SetAutoHeightDirective implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        this.el.nativeElement.style.height
            = this.el.nativeElement.parentElement.offsetHeight + 'px';
        console.dir('set');
    }
}
