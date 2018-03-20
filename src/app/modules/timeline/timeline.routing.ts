import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimelineComponent } from './components/timeline.component';
import { AddpostComponent } from './components/addpost/addpost.component';
import { ListPostComponent } from './components/list-post/list-post.component';

const routes: Routes = [
    { path: '', component:  TimelineComponent},
    { path: 'create', component:  AddpostComponent},
    { path: 'lists', component:  ListPostComponent}
];

export const TimelineRouting = RouterModule.forChild(routes);
