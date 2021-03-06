import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

    @Input('group')
    contactForm?: FormGroup;

    constructor() {
        this.contactForm = this.contactForm || new FormGroup({
            email: new FormControl(),
            mobile : new FormControl(),
            aboutu : new FormControl()
         });
    }

    ngOnInit() {
    }
}
