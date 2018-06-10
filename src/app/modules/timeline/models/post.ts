import { IPost } from './iPost';
import { IContact } from '../../../shared/interfaces/iContact';
export class Post implements IPost {
    constructor(
        public _id,
        public title,
        public description,
        public category,
        public price,
        public image,
        public createdBy,
        public editable,
        public contact: Array<IContact>,
        public time) { }
}
