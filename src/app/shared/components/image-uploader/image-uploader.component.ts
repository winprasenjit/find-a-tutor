import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
    @Input() data: any;

    constructor(private http: Http, private el: ElementRef) {
        this.data = this.data || {};
    }

    ngOnInit() {
    }

    upload() {
        const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        const fileCount: number = inputEl.files.length;
        const formData = new FormData();
        if (fileCount > 0) { // a file was selected
            formData.append('photo', inputEl.files.item(0));
            formData.append('target', this.data.folder);
            this.http
                .post(this.data.url, formData)
                .map((res: Response) => res.json())
                .subscribe(
                    (response) => {
                        console.dir(response.filePath);
                    },
                    (error) => console.log(error))
        }
    }
}