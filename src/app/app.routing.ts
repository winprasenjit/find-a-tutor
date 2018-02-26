import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/components/login.component';
import { AuthGuard } from './shared/helper/auth.guard';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import { CategoryComponent } from './modules/category/components/category.component';

const routes: Routes = [
    { path: '', loadChildren : './modules/timeline/timeline.module#TimelineModule' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user', loadChildren: './modules/user/user.module#UserModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'category', component: CategoryComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(routes);
