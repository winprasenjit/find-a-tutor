import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/components/dashboard.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'user', loadChildren: './modules/user/user.module#UserModule' },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(routes);
