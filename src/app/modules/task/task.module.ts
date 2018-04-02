import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
      AddTaskComponent,
      ListTaskComponent
  ],
  exports: [AddTaskComponent, ListTaskComponent],
  entryComponents : [AddTaskComponent, ListTaskComponent]
})
export class TaskModule { }
