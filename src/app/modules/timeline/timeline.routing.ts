import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimelineComponent } from './components/timeline.component';

const routes: Routes = [
    { path: '', component:  TimelineComponent}
];

export const TimelineRouting = RouterModule.forChild(routes);
