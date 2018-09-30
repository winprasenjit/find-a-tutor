import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

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
