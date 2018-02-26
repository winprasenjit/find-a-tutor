import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './components/timeline.component';
import { TimelineRouting } from './timeline.routing';
import { AddpostComponent } from './components/addpost/addpost.component';
import { SharedModule } from '../../shared/shared.module';
import { PostService } from './services/post.service';
import { ContactModule } from '../contact/contact.module';
import { ContactFormComponent } from '../contact/components/contact-form/contact-form.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ContactModule,
        TimelineRouting
    ],
    declarations: [
        TimelineComponent,
        AddpostComponent
    ],
    exports: [
        TimelineComponent
    ],
    bootstrap: [
        TimelineComponent
    ],
    entryComponents : [
        AddpostComponent
    ],
    providers : [
        PostService
    ]
})
export class TimelineModule { }
