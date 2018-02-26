import { IContact } from '../../../shared/interfaces/iContact';
export interface IPost {
    title : string;
    description : string;
    price : string;
    image? : string;
    contact: IContact;
}
