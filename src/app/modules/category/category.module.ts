import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './components/category.component';
import { CategoryService } from './services/category.service';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
      CategoryComponent,
      CategoryFormComponent
  ],
  exports: [CategoryComponent],
  providers : [CategoryService],
  entryComponents : [CategoryFormComponent]
})
export class CategoryModule { }
