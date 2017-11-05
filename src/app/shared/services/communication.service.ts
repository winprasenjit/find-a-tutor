import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationService {
    private loggedIn = new Subject<boolean>();

    setLoginType(type: boolean) {
        this.loggedIn.next(type);
    }

    clearLoginType() {
        this.loggedIn.next();
    }

    getLoginType(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }
}
