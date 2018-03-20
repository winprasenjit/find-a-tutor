import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppstate } from '../shared/helper/store';
import { GlobalConstant } from '../shared/constants/global.constant';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    @Input() data: any;

    taskname: string;
    taskList: string[] = [];

    constructor(private ngRedux: NgRedux<IAppstate>) { }

    ngOnInit() {
        this.ngRedux
            .subscribe(() => {
                this.taskList = this.ngRedux.getState().taskList;
            });
    }

    addTask(): void {
        if (this.taskname) {
            this.ngRedux.dispatch({ type: GlobalConstant.ADD_TASK, taskname: this.taskname });
            this.taskname = '';
        }
    }

    removeTask(taskname: string): void {
        let index = this.taskList.indexOf(taskname);
        this.taskList.splice(index, 1);
        this.ngRedux.dispatch({ type: GlobalConstant.REMOVE_TASK, taskname: taskname });
    }
}
