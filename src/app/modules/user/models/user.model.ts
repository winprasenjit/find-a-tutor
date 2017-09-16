const enum rating {
    communication = 5,
    attitude = 5,
    sense = 5
}

export interface IUsers {
    _id?: string;
    email: string;
    mobile: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    sex?: { 'Male', 'Female' };
    rating?: any;
    confirmPassword?: any;
}

export class User {
    _id?: string;
    name: string;
    email: string;
    mobile: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    sex?: { 'Male', 'Female' };
    rating?: rating;
    confirmPassword?: any;

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
}
