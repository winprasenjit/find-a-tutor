import { IContact } from '../../../shared/interfaces/iContact';
import { Category } from '../../category/models/category';
export interface IPost {
    _id : string;
    title : string;
    description : string;
    category : Category[]
    price : string;
    image? : string;
    time : string;
    createdBy:string,
    editable:boolean,
    contact: IContact[];
}
