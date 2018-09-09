import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TimelineComponent} from './components/timeline.component';
import {TimelineRouting} from './timeline.routing';
import {AddpostComponent} from './components/addpost/addpost.component';
import {SharedModule} from '../../shared/shared.module';
import {PostService} from './services/post.service';
import {ContactModule} from '../contact/contact.module';
import {ContactFormComponent} from '../contact/components/contact-form/contact-form.component';
import {PostComponent} from './components/post/post.component';
import {ListPostComponent} from './components/list-post/list-post.component';
import {ViewPostComponent} from './components/view-post/view-post.component';
import {ReplyPostComponent} from './components/reply-post/reply-post.component';
import {ReplyPostService} from "./services/reply-post.service";
import {BidsComponent} from './components/bids/bids.component';
import { DisplayBidsComponent } from './components/display-bids/display-bids.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ContactModule,
        TimelineRouting
    ],
    declarations: [
        TimelineComponent,
        AddpostComponent,
        PostComponent,
        ListPostComponent,
        ViewPostComponent,
        ReplyPostComponent,
        BidsComponent,
        DisplayBidsComponent
    ],
    exports: [
        TimelineComponent
    ],
    bootstrap: [
        TimelineComponent
    ],
    entryComponents: [
        ReplyPostComponent
    ],
    providers: [
        PostService,
        ReplyPostService
    ]
})
export class TimelineModule {
}
