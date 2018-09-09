import {IUsers} from '../../../shared/interfaces/iUser';
import {IContact} from '../../../shared/interfaces/iContact';
const enum rating {
    communication = 5,
    attitude = 5,
    sense = 5
}

export class User {
    _id?: string;
    name: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    contact: IContact[];
    subject?: Array<string>;
    sex?: { 'Male', 'Female' };
    rating?: {
        communication: 5,
        attitude: 5,
        sense: 5
    };
    avgRating?: number;
    confirmPassword?: any;
    email ?: string;
    mobile?: string;

    constructor(userObj: IUsers) {
        // Check enum
        if (typeof userObj.rating !== 'object') {
            userObj.rating = {
                communication: 5,
                attitude: 5,
                sense: 5
            };
        }
        Object.assign(this, userObj);
        this.confirmPassword = this.password;
    }

    createFullName(): void {
        this.name = `${this.firstname} ${this.lastname}`;
    }

    createRating() {
        const count = Object.keys(this.rating).length;
        let totalRating = 0;
        for (const i in this.rating) {
            if (this.rating.hasOwnProperty(i)) {
                totalRating += this.rating[i];
            }
        }
        this.avgRating = Math.round(totalRating / count);
    }
}
