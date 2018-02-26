import { IContact } from './iContact';

export interface IUsers {
    _id?: string,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    contact : IContact[],
    subject?: Array<string>,
    sex?: { 'Male', 'Female' },
    rating?: {
        communication: 5,
        attitude: 5,
        sense: 5
    },
    confirmPassword?: any
}