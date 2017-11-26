import { UserComponent } from './components/user.component';

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: UserComponent }
];

export const UserRouting = RouterModule.forChild(routes);
