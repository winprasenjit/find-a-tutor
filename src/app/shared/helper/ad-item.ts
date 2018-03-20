import { Type } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { ListTaskComponent } from '../../list-task/list-task.component';
import { ImageUploaderComponent } from '../components/image-uploader/image-uploader.component';

export class AddItem {
    classes = {
        AddTaskComponent : AddTaskComponent,
        ListTaskComponent : ListTaskComponent,
        ImageUploaderComponent : ImageUploaderComponent
    };

    constructor(public component: Type<any>, public data:any) {
        if(typeof component === 'string'){
            this.component = this.getComponentClass(component);
        }
    }

    getComponentClass(className:string) {
        return this.classes[className];
    }
}
