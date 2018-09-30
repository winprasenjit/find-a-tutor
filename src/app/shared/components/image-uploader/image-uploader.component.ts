import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgRedux, select } from "@angular-redux/store";
import { IImagestate } from './helpers/image-store';
import { GlobalConstant } from '../../constants/global.constant';
import { map } from 'rxjs/operators';

@Component({
    selector: 'image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
    @Input() data: any;

    constructor(private http: Http, private el: ElementRef, private ngRedux : NgRedux<IImagestate>) {
        this.data = this.data || {};
    }

    ngOnInit() {
    }

    upload() {
        const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        const fileCount: number = inputEl.files.length;
        const formData = new FormData();
        if (fileCount > 0) { // a file was selected
            formData.append('target', this.data.folder);
            formData.append('photo', inputEl.files.item(0));
            this.http
                .post(this.data.url, formData)
                .pipe(map((res: Response) => res.json()))
                .subscribe(
                    (response) => {
                        this.ngRedux.dispatch({
                            type : GlobalConstant.ADD_IMAGE,
                            imageUrl : response.filePath
                        })
                    },
                    (error) => console.log(error))
        }
    }
}