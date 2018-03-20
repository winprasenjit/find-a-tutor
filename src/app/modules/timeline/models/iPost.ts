import { IContact } from '../../../shared/interfaces/iContact';
import { Category } from '../../category/models/category';
export interface IPost {
    title : string;
    description : string;
    category : Category
    price : string;
    image? : string;
    time : string;
    contact: IContact;
}
