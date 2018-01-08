import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { UserRouting } from './user.routing';
import { UserComponent } from './components/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';

@NgModule({
    declarations: [
        UserComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule,
        UserRouting,
        SharedModule
    ],
    entryComponents : [UserFormComponent],
    bootstrap: [UserFormComponent],
    exports: [UserComponent],
    providers: [UserService]
})
export class UserModule { }
